import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData:
      '@use "@/styles/variables" as *;\n@use "@/styles/mixins" as *;',
  },
};

export default nextConfig;
