// Portfolio Content CRM — local-only server, zero dependencies (Node built-ins
// only). Reads/writes config/projects.json and config/site.json, and saves
// uploaded project images to public/. Run with `npm run crm`.
// Binds to localhost only; no auth.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 4321;
const HOST = "127.0.0.1";
const BODY_LIMIT = 16 * 1024 * 1024; // 16 MB (covers base64-encoded 8 MB image)

const ROOT = path.resolve(__dirname, "..");
const UI_DIR = path.join(__dirname, "ui");
const CONFIG_DIR = path.join(ROOT, "config");
const PUBLIC_DIR = path.join(ROOT, "public");
const PROJECTS_FILE = path.join(CONFIG_DIR, "projects.json");
const SITE_FILE = path.join(CONFIG_DIR, "site.json");

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Atomic write with a one-deep backup: copy current -> .bak, write to .tmp,
// then rename .tmp over the target so a crash never leaves a half-written file.
function writeJsonSafe(file, data) {
  const json = JSON.stringify(data, null, 2) + "\n";
  const tmp = `${file}.tmp`;

  if (fs.existsSync(file)) {
    fs.copyFileSync(file, `${file}.bak`);
  }
  fs.writeFileSync(tmp, json, "utf8");
  fs.renameSync(tmp, file);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// Validates and normalizes a projects payload. Throws Error(message) on bad
// input. Re-sequences rank to 1..N by array order.
function normalizeProjects(payload) {
  if (!Array.isArray(payload)) {
    throw new Error("Projects payload must be an array.");
  }

  return payload.map((p, i) => {
    const label = `Project #${i + 1}`;

    if (!isNonEmptyString(p.title)) {
      throw new Error(`${label}: title is required.`);
    }
    if (!isNonEmptyString(p.description)) {
      throw new Error(`${label}: description is required.`);
    }
    if (!isNonEmptyString(p.image)) {
      throw new Error(`${label}: image is required.`);
    }
    if (
      !Array.isArray(p.technologies) ||
      p.technologies.length === 0 ||
      !p.technologies.every((t) => typeof t === "string")
    ) {
      throw new Error(`${label}: technologies must be a non-empty list.`);
    }

    const project = {
      title: p.title,
      description: p.description,
      image: p.image,
      rank: i + 1,
      technologies: p.technologies,
    };

    // Optional links — only persisted when present and non-empty.
    if (isNonEmptyString(p.github)) project.github = p.github;
    if (isNonEmptyString(p.link)) project.link = p.link;

    return project;
  });
}

// Merges editable site fields (name, description, links) onto the existing
// site.json, preserving structural keys like navItems we don't expose.
function mergeSite(existing, payload) {
  const next = { ...existing };

  if (payload.name !== undefined) {
    if (!isNonEmptyString(payload.name)) {
      throw new Error("Site name must be a non-empty string.");
    }
    next.name = payload.name;
  }

  if (payload.description !== undefined) {
    if (typeof payload.description !== "string") {
      throw new Error("Site description must be a string.");
    }
    next.description = payload.description;
  }

  if (payload.links !== undefined) {
    if (
      typeof payload.links !== "object" ||
      payload.links === null ||
      Array.isArray(payload.links)
    ) {
      throw new Error("Site links must be an object of label -> url.");
    }
    const links = {};

    for (const [key, value] of Object.entries(payload.links)) {
      if (!isNonEmptyString(key)) {
        throw new Error("Link labels must be non-empty.");
      }
      if (typeof value !== "string") {
        throw new Error(`Link "${key}" must have a string URL.`);
      }
      links[key.trim()] = value.trim();
    }
    next.links = links;
  }

  return next;
}

// ---------------------------------------------------------------------------
// Image upload (base64 JSON -> public/)
// ---------------------------------------------------------------------------

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"]);

function sanitizeFilename(name) {
  const base = path.basename(String(name)).replace(/[^a-zA-Z0-9._-]/g, "_");

  return base || "upload";
}

// payload: { filename, data } where data is a base64 string or data URL.
function saveUpload(payload) {
  if (!payload || typeof payload.data !== "string") {
    throw new Error("Upload requires a base64 data field.");
  }

  // Accept "data:image/png;base64,xxxx" or a bare base64 string.
  let b64 = payload.data;
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.*)$/s.exec(b64);

  if (match) {
    b64 = match[2];
  }

  let name = sanitizeFilename(payload.filename || "upload.png");
  let ext = path.extname(name).toLowerCase();

  if (!IMAGE_EXTS.has(ext)) {
    throw new Error("Only image files are allowed (png, jpg, gif, webp, svg).");
  }

  const buffer = Buffer.from(b64, "base64");

  if (buffer.length === 0) {
    throw new Error("Uploaded image is empty.");
  }
  if (buffer.length > 8 * 1024 * 1024) {
    throw new Error("Image exceeds the 8 MB limit.");
  }

  // Avoid clobbering an existing public asset.
  if (fs.existsSync(path.join(PUBLIC_DIR, name))) {
    const stem = name.slice(0, name.length - ext.length);

    name = `${stem}-${Date.now()}${ext}`;
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, name), buffer);

  return `/${name}`;
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);

  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(new Error("Payload too large."));
        req.destroy();

        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});

        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (err) {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Serve a static file from the UI dir, falling back to the site's public/ dir
// (so project images preview by their real path). Guards against traversal.
function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === "/") urlPath = "/index.html";

  for (const dir of [UI_DIR, PUBLIC_DIR]) {
    const resolved = path.join(dir, urlPath);

    if (!resolved.startsWith(dir + path.sep) && resolved !== dir) {
      continue; // path traversal attempt
    }
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(resolved).toLowerCase()] || "application/octet-stream",
      });
      fs.createReadStream(resolved).pipe(res);

      return;
    }
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not found");
}

async function handleApi(req, res, url) {
  if (url === "/api/projects" && req.method === "GET") {
    return sendJson(res, 200, readJson(PROJECTS_FILE));
  }

  if (url === "/api/projects" && req.method === "PUT") {
    const body = await readBody(req);
    let normalized;

    try {
      normalized = normalizeProjects(body);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
    writeJsonSafe(PROJECTS_FILE, normalized);

    return sendJson(res, 200, normalized);
  }

  if (url === "/api/site" && req.method === "GET") {
    return sendJson(res, 200, readJson(SITE_FILE));
  }

  if (url === "/api/site" && req.method === "PUT") {
    const body = await readBody(req);
    let merged;

    try {
      merged = mergeSite(readJson(SITE_FILE), body);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
    writeJsonSafe(SITE_FILE, merged);

    return sendJson(res, 200, merged);
  }

  if (url === "/api/upload" && req.method === "POST") {
    const body = await readBody(req);
    let savedPath;

    try {
      savedPath = saveUpload(body);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }

    return sendJson(res, 200, { path: savedPath });
  }

  if (url === "/api/images" && req.method === "GET") {
    const entries = fs.readdirSync(PUBLIC_DIR)
      .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()))
      .map((name) => {
        const stat = fs.statSync(path.join(PUBLIC_DIR, name));
        return { name, path: `/${name}`, size: stat.size };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    // Annotate each image with which projects reference it.
    let projects = [];
    try { projects = readJson(PROJECTS_FILE); } catch (_) {}
    const used = new Set(projects.map((p) => p.image));

    return sendJson(res, 200, entries.map((e) => ({ ...e, inUse: used.has(e.path) })));
  }

  if (url === "/api/images" && req.method === "DELETE") {
    const body = await readBody(req);
    const name = sanitizeFilename(body.name || "");

    if (!name || name === "upload") {
      return sendJson(res, 400, { error: "A valid filename is required." });
    }

    const target = path.join(PUBLIC_DIR, name);

    if (!target.startsWith(PUBLIC_DIR + path.sep)) {
      return sendJson(res, 400, { error: "Invalid filename." });
    }
    if (!fs.existsSync(target)) {
      return sendJson(res, 404, { error: "File not found." });
    }

    // Refuse to delete images that are actively referenced by a project.
    let projects = [];
    try { projects = readJson(PROJECTS_FILE); } catch (_) {}
    const usedBy = projects.filter((p) => p.image === `/${name}`).map((p) => p.title);

    if (usedBy.length > 0) {
      return sendJson(res, 409, {
        error: `Image is used by: ${usedBy.join(", ")}. Remove it from those projects first.`,
      });
    }

    fs.unlinkSync(target);

    return sendJson(res, 200, { deleted: name });
  }

  return sendJson(res, 404, { error: "Unknown endpoint." });
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url.startsWith("/api/")) {
    handleApi(req, res, url).catch((err) =>
      sendJson(res, 500, { error: err.message })
    );

    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);

    return;
  }

  sendJson(res, 405, { error: "Method not allowed." });
});

server.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`\n  Portfolio CRM running at http://${HOST}:${PORT}\n`);
});
