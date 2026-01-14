/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    MAX_OPTIONS_PER_INPUT: '20',
    MAX_INPUTS_PER_FORM: '20'
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
