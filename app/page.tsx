import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1
            className={cn(
              "text-4xl md:text-6xl font-bold text-gray-900 mb-6",
              "bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent",
            )}
          >
            Welcome to DateCraft
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with amazing people and create memorable experiences in South Africa
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Deployment Successful!</h2>
              <p className="text-gray-600">DateCraft is now live and ready for development.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
