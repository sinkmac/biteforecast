import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/scotland/skye",
        destination: "/scotland/isle-of-skye-midges",
        permanent: true,
      },
      {
        source: "/scotland/skye-midges",
        destination: "/scotland/isle-of-skye-midges",
        permanent: true,
      },
      {
        source: "/scotland/glencoe",
        destination: "/scotland/glencoe-midges",
        permanent: true,
      },
      {
        source: "/scotland/fort-william",
        destination: "/scotland/fort-william-midges",
        permanent: true,
      },
      {
        source: "/scotland/loch-lomond",
        destination: "/scotland/loch-lomond-midges",
        permanent: true,
      },
      {
        source: "/scotland/aviemore",
        destination: "/scotland/aviemore-midges",
        permanent: true,
      },
      {
        source: "/scotland/mull",
        destination: "/scotland/mull-midges",
        permanent: true,
      },
      {
        source: "/scotland/torridon",
        destination: "/scotland/torridon-midges",
        permanent: true,
      },
      {
        source: "/scotland/cairngorms",
        destination: "/scotland/cairngorms-midges",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
