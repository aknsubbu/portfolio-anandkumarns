/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
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
