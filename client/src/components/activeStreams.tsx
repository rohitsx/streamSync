export default function ActiveStreams() {
    return (<>
        {/* Active Streams section */}
        <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-purple-300">Active Streams</h2>
                <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm">View All</button>
            </div>
            <ul className="space-y-3">
                {[
                    { name: 'Tech Talk with Alice', viewers: 156, trend: 'up' },
                    { name: 'Bob\'s Gaming Hour', viewers: 892, trend: 'down' },
                    { name: 'Cooking with Charlie', viewers: 423, trend: 'up' },
                ].map((stream, index) => (
                    <li key={index} className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors duration-300">
                        <div className="p-3 flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-sm text-purple-200">{stream.name}</h3>
                                <div className="flex items-center space-x-2 mt-1">
                                    <p className="text-xs text-gray-400">
                                        {stream.viewers} viewers
                                    </p>
                                </div>
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1 px-3 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1">
                                Join
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    </>);
}