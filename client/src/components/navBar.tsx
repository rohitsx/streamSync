import { Wallet, LayoutGrid, Zap, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();

    const navItems = [
        { icon: LayoutGrid, label: 'Home', page: '/' },
        { icon: Zap, label: 'Go Live', page: '/host' },
        { icon: Users, label: 'Join Stream', page: '/join' },
        { icon: Wallet, label: 'Wallet', page: '/wallet' },
    ];

    return (
        <nav className="bg-gray-800 p-1 sticky bottom-0 border-t border-gray-700 relative">
            {/* White line at the top */}
            {/* <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div> */}
            
            <div className="flex justify-between max-w-screen-xl mx-auto">
                {navItems.map((item, index) => (
                    <Link key={index} to={item.page} className="flex-1">
                        <button
                            className={`w-full flex flex-col items-center p-1 transition-colors duration-300
                                ${location.pathname === item.page
                                    ? 'text-purple-400'
                                    : 'text-gray-400 hover:text-purple-300'
                                }`}
                        >
                            <item.icon size={20} className="mb-1" />
                            <span className="text-xs mt-1">{item.label}</span>
                        </button>
                    </Link>
                ))}
            </div>
        </nav>
    );
}