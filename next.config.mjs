/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    maxOptionsPerInput: 20,
    maxInputsPerForm: 20,
  },
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
