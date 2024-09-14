import { Wallet, LayoutGrid, Zap, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();

    return (
        <>
            {/* Navigation */}
            <nav className="bg-gray-800 p-2 sticky bottom-0 border-t border-gray-700">
                <div className="flex justify-between">
                    {[
                        { icon: LayoutGrid, label: 'Home', page: '/' },
                        { icon: Zap, label: 'Go Live', page: '/host' },
                        { icon: Users, label: 'Join Stream', page: '/join' },
                        { icon: Wallet, label: 'Wallet', page: '/wallet' },
                    ].map((item, index) => (
                        <Link key={index} to={item.page}>
                            <button
                                className={`flex flex-col items-center p-1 transition-colors  
                                    ${location.pathname === item.page
                                        ? 'text-purple-400'
                                        : 'text-gray-400 hover:text-purple-300'}`}>
                                <item.icon size={20} />
                                <span className="text-xs mt-1">{item.label}</span>
                            </button>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
