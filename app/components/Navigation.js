import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                tie.ceo
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center">
            <Link href="/updates" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Updates
            </Link>
            <Link href="/revenue" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Revenue
            </Link>
            <a 
              href="https://twitter.com/your_handle" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-4 px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 