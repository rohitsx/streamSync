import { Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-gray-800 p-2 flex justify-between items-center border-b border-gray-700 w-[23rem]">
            <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9333EA" />
                            <stop offset="100%" stopColor="#4F46E5" />
                        </linearGradient>
                    </defs>
                    <path d="M20 80 Q50 20, 80 80" stroke="url(#gradient)" strokeWidth="8" fill="none">
                        <animate attributeName="d" dur="4s" repeatCount="indefinite"
                            values="M20 80 Q50 20, 80 80;
                                    M20 80 Q50 10, 80 80;
                                    M20 80 Q50 20, 80 80" />
                    </path>
                    <circle cx="30" cy="70" r="10" fill="#4F46E5">
                        <animate attributeName="cy" dur="4s" repeatCount="indefinite"
                            values="70; 65; 70" />
                    </circle>
                    <circle cx="70" cy="70" r="10" fill="#9333EA">
                        <animate attributeName="cy" dur="4s" repeatCount="indefinite"
                            values="70; 75; 70" />
                    </circle>
                </svg>
                <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">StreamSync</h1>
            </div>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
                <Menu size={20} />
            </button>
        </header>
    );
}