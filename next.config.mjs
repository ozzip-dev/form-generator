/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects() {
    return [
      {
        source: '/forms',
        destination: '/forms/list',
        permanent: true,
      },
      {
        source: '/protocols',
        destination: '/protocols/add',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;
