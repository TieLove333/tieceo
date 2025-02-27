export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Building a $1B SaaS Company
            <span className="block text-blue-600">with AI as a Solo Founder</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow my journey building in public. Live revenue, daily updates, and complete transparency
            as I leverage AI to scale from $0 to $1B.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#updates"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              View Progress
            </a>
            <a href="#revenue" className="text-sm font-semibold leading-6 text-gray-900">
              Live Revenue <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Cards */}
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Updates</h3>
            <p className="mt-2 text-gray-600">
              Follow my builder journey with daily logs and technical deep-dives.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Revenue</h3>
            <p className="mt-2 text-gray-600">
              Watch the revenue grow in real-time with Stripe integration.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered</h3>
            <p className="mt-2 text-gray-600">
              See how I&apos;m using AI to build and scale faster than ever.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 