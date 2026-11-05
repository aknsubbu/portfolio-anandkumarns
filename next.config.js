/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const accept = [{ type: "header", key: "accept", value: ".*text/markdown.*" }];

    return {
      beforeFiles: [
        { source: "/", has: accept, destination: "/api/md" },
        { source: "/:path(projects|about-me|contact)", has: accept, destination: "/api/md/:path" },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</sitemap.xml>; rel="sitemap"; type="application/xml", <https://github.com/aknsubbu>; rel="me"',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
