import { AlertCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function RecentTransaction() {
    const transactions: any[] = [
        // { type: 'Received', amount: '+2.5 SOL', from: 'Alice', date: '2024-09-10' },
        // { type: 'Sent', amount: '-1.0 SOL', to: 'Bob', date: '2024-09-09' },
        // { type: 'Received', amount: '+5.0 SOL', from: 'Charlie', date: '2024-09-08' },
        // { type: 'Sent', amount: '-0.5 SOL', to: 'David', date: '2024-09-07' },
        // { type: 'Received', amount: '+1.5 SOL', from: 'Eve', date: '2024-09-06' },
    ];

    return (
        <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-purple-300">Recent Transactions</h2>
            </div>
            {transactions.length > 0 ? (
                <ul className="space-y-4">
                    {transactions.map((tx, index) => (
                        <li key={index} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-all duration-300 ease-in-out">
                            <div className="p-3 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500`}>
                                        {tx.type === 'Received' ? (
                                            <ArrowDownLeft size={16} className="text-gray-200" />
                                        ) : (
                                            <ArrowUpRight size={16} className="text-gray-200" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-purple-300">{tx.type}</h3>
                                        <p className="text-xs text-gray-400">
                                            {tx.from ? `From: ${tx.from}` : `To: ${tx.to}`}
                                        </p>
                                    </div>
                                </div>
                                <span className={`font-bold text-lg ${tx.type === 'Received' ? 'text-purple-400' : 'text-indigo-400'}`}>
                                    {tx.amount}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="bg-gray-700 rounded-lg p-4 text-center ">
                    <div className="inline-block bg-gray-600 rounded-full p-3 mb-1 ">
                        <AlertCircle className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-purple-300 font-bold text-lg mb-3">No Recent Transactions</h3>
                    {/* <p className="text-gray-400 text-sm mb-4">Your transaction history will appear here once you start using your wallet.</p> */}
                </div>
            )}
        </section>
    );
}