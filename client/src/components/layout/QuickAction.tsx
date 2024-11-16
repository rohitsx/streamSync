import { Radio, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickAction() {
    return (<>
        <section className="bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300">
            <h2 className="text-lg font-semibold mb-3 text-purple-300">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
                <Link to={'host'} className="bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-lg flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <button className='flex flex-col items-center justify-center '>
                        <Radio className="mb-2 h-6 w-6" />
                        <span className="text-sm">Host Stream</span>
                    </button>
                </Link>
                <Link to={'join'} className="bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-3 px-4 rounded-lg flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <button className='flex flex-col items-center justify-center '>
                        <Users className="mb-2 h-6 w-6" />
                        <span className="text-sm">Join Stream</span>
                    </button>
                </Link>
            </div>
        </section>
    </>);
}