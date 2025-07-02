import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flower.elevateegy.com",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
  redirects: () => {
    return [
      {
        source: "/:lang(en|ar)/allorders",
        destination: "/orders",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
