export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-xl font-bold text-blue-600">
                tie.ceo
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center">
            <a href="/updates" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Updates
            </a>
            <a href="/revenue" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Revenue
            </a>
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