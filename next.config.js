/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "s2.googleusercontent.com",
      "s3.us-west-2.amazonaws.com",
      "amazonaws.com",
    ],
  },

  async redirects() {
    return [
      {
        source: "/book",
        destination: "https://cal.com/adam-durrant-z9wzhk/15min",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
