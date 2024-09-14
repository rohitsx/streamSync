import { useState, useEffect } from 'react';
import { Wallet, ExternalLink, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SolanaWalletConnected = ({ publicKey }: { publicKey: string }) => {
    const location = useLocation();

    return (
        <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Wallet size={20} />
                    </div>
                    <div>
                        <span className="font-semibold text-lg text-purple-300">Solana Wallet</span>
                        <p className="text-xs text-gray-400">Connected</p>
                    </div>
                </div>
                {location.pathname === '/' && (
                    <Link to={'wallet'}>
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                            <ExternalLink className="h-5 w-5" />
                        </button>
                    </Link>
                )}
            </div>
            <div className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">10.50 SOL</div>
            <div className="text-xs text-gray-400 flex items-center space-x-2">
                <span>Public Key</span>
                {publicKey && <span className="bg-gray-700 px-2 py-1 rounded-full">{publicKey.slice(0, 4)}...{publicKey.slice(-4)}</span>}
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

const SolanaWalletDisconnected = () => {
    return (
        <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Lock size={20} className="text-gray-400" />
                    </div>
                    <div>
                        <span className="font-semibold text-lg text-gray-400">Wallet Locked</span>
                        <p className="text-xs text-gray-500">Secure Your Assets</p>
                    </div>
                </div>
            </div>
            <div className="mb-2 text-center">
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-1">
                    Unlock the Power of Solana
                </div>
                <p className="text-sm text-gray-400">Connect your wallet to access your assets</p>
            </div>
            <div className="flex justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-colors duration-300 flex items-center space-x-2 shadow-lg">
                    <Wallet size={16} />
                    <span>Connect Wallet</span>
                </button>
            </div>
        </section>
    );
};

export default function SolanaWallet() {
    const [publicKey, setPublicKey] = useState<string | null>(null);

    useEffect(() => {
        const storedPublicKey = localStorage.getItem('publicKey');
        if (storedPublicKey) {
            setPublicKey(storedPublicKey);
        }
    }, []);

    if (publicKey) {
        return <SolanaWalletConnected publicKey={publicKey} />;
    } else {
        return <SolanaWalletDisconnected />;
    }
}