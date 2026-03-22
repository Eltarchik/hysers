import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "zupimages.net",
          }, // todo remove
          {
              protocol: "https",
              hostname: "d1elhbmy4ij4xv.cloudfront.net",
          }, // todo remove
      ]
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
