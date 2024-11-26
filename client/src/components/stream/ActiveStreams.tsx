import { Tv, Users, AlertCircle } from "lucide-react";

interface Stream {
  name: string;
  viewers: number;
}

export default function ActiveStreams() {
  const streams: Stream[] = [];

  return (
    <section className="bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <Tv size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-purple-300">
              Active Streams
            </h2>
          </div>
        </div>
      </div>
      {streams.length > 0 ? (
        <ul className="space-y-3">
          {streams.map((stream, index) => (
            <li
              key={index}
              className="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-all duration-300 ease-in-out"
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-purple-200">
                    {stream.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Users size={12} className="text-gray-400" />
                    <p className="text-xs text-gray-400">
                      {stream.viewers.toLocaleString()} viewers
                    </p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-semibold py-1 px-3 rounded-md transition duration-300 ease-in-out">
                  Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-700 rounded-lg p-4 space-y-2  text-center">
          <div className="inline-block bg-gray-600 rounded-full p-3 mb-1">
            <AlertCircle className="text-purple-400" size={20} />
          </div>
          <h3 className="text-purple-300 font-bold text-lg ">
            No Active Streams
          </h3>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center mx-auto">
            <Tv size={18} className="mr-2" />
            Start Streaming
          </button>
        </div>
      )}
    </section>
  );
}
