export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to DateCraft</h1>
        <p className="text-center text-lg text-gray-600 mb-8">Your premium dating platform for South Africa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Find Your Match</h2>
            <p className="text-gray-600">Connect with like-minded people in your area</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Safe & Secure</h2>
            <p className="text-gray-600">Your privacy and safety are our top priority</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Local Focus</h2>
            <p className="text-gray-600">Built specifically for South African singles</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </main>
  )
}
