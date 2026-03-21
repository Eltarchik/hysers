import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: "https",
              hostname: "media.discordapp.net",
          }
      ]
  }
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
