import { Wallet, LayoutGrid, ArrowLeftRight, Zap, Settings, Radio, Users } from 'lucide-react';
import './styles/home.css'

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white h-[600px] w-96 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 flex justify-center items-center py-1">
        <div className="flex items-center space-x-3">
          <svg className="w-10 h-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            <path d="M20 80 Q50 20, 80 80" stroke="url(#gradient)" strokeWidth="8" fill="none" />
            <circle cx="30" cy="70" r="10" fill="#60A5FA" />
            <circle cx="70" cy="70" r="10" fill="#8B5CF6" />
          </svg>
          <h1 className="text-xl font-bold">StreamSync</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {/* Wallet section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full"></div>
              <span className="font-semibold">Solana Wallet</span>
            </div>
            <button className="text-gray-400 hover:text-white">
              <ArrowLeftRight size={20} />
            </button>
          </div>
          <div className="text-2xl font-bold mb-2">10.50 SOL</div>
          <div className="text-sm text-gray-400 flex items-center space-x-2">
            <span>Public Key</span>
            <span className="bg-gray-700 px-2 py-1 rounded">7fUA...vSbp</span>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Start Streaming section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Start Streaming</h2>
          <div className="space-y-2">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Radio className="mr-2 h-5 w-5" /> Host Stream
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" /> Join Stream
            </button>
          </div>
        </div>

        {/* Active Streams section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Active Streams</h2>
          <ul className="space-y-3">
            {[
              { name: 'Tech Talk with Alice', viewers: 156 },
              { name: 'Bob\'s Gaming Hour', viewers: 892 },
              { name: 'Cooking with Charlie', viewers: 423 },
              { name: 'Daily News Roundup', viewers: 1204 },
              { name: 'Music Mix by DJ Dave', viewers: 738 }
            ].map((stream, index) => (
              <li key={index} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{stream.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {stream.viewers} viewers
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded">
                    Join
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 p-2 sticky bottom-0">
        <nav className="flex justify-between">
          <button className="text-gray-400 hover:text-white p-2">
            <LayoutGrid size={24} />
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <ArrowLeftRight size={24} />
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <Wallet size={24} />
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <Zap size={24} />
          </button>
          <button className="text-gray-400 hover:text-white p-2">
            <Settings size={24} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;