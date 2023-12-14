/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "s2.googleusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "amazonaws.com",
      "datocms-assets.com"
    ],
    unoptimized: true,
    minimumCacheTTL: 60,
  },
  async redirects() {
    return [
      {
        source: "/book",
        destination: "https://cal.com/adam-durrant-z9wzhk/15min",
        permanent: true,
      },
      {
        source: "/blog/webflow-vs-seo",
        destination: "/blog/webflow-for-seo",
        permanent: true,
      },
      {
        source: "/blog/bookmarklets",
        destination: "/blog/bookmarklets-for-seo",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/how-to-use-github",
        destination: "/blog/using-git-and-github",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;