/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Vercelでは最適化された画像を使用
    unoptimized: false,
    domains: [],
    remotePatterns: [],
  },
  // 本番環境でのパフォーマンス最適化
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
