import { useState } from "react";
import Layout from "./Layout";
import { Settings, Play, LogIn } from "lucide-react";

const StreamPage = () => {
  const [activeTab, setActiveTab] = useState<"host" | "join" | "settings">(
	"host",
  );

  const renderContent = () => {
	switch (activeTab) {
	  case "host":
		return (
		  <div className="flex flex-col items-center justify-center space-y-4 w-full">
			<h2 className="text-xl font-semibold mb-4 text-gradient">Host a Stream</h2>
			<button
			  className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 w-64 justify-center 
			  hover:from-emerald-600 hover:to-green-700 transition-all duration-300 ease-in-out 
			  transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl"
			  onClick={() => {
				/* Add host stream logic */
			  }}
			>
			  <Play className="mr-2" />
			  Start Hosting
			</button>
			<p className="text-sm text-gray-400 text-center">
			  Create a new stream and invite others to join
			</p>
		  </div>
		);
	  case "join":
		return (
		  <div className="flex flex-col items-center justify-center space-y-4 w-full">
			<h2 className="text-xl font-semibold mb-4 text-gradient">Join a Stream</h2>
			<input
			  type="text"
			  placeholder="Enter Stream Code"
			  className="w-64 px-4 py-2 rounded-lg 
			  bg-slate-800 border border-slate-700 
			  text-white focus:outline-none 
			  focus:ring-2 focus:ring-indigo-500 
			  transition-all duration-300"
			/>
			<button
			  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg 
			  flex items-center space-x-2 w-64 justify-center 
			  hover:from-indigo-600 hover:to-purple-700 
			  transition-all duration-300 ease-in-out 
			  transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl"
			  onClick={() => {
				/* Add join stream logic */
			  }}
			>
			  <LogIn className="mr-2" />
			  Join Stream
			</button>
		  </div>
		);
	  case "settings":
		return (
		  <div className="flex flex-col items-center justify-center space-y-4 w-full">
			<h2 className="text-xl font-semibold mb-4 text-gradient">Settings</h2>
			<div className="w-64 space-y-4">
			  <div className="flex justify-between items-center bg-slate-800 px-4 py-3 rounded-lg">
				<span className="text-gray-200">Notifications</span>
				<label className="relative inline-flex items-center cursor-pointer">
				  <input type="checkbox" className="sr-only peer" />
				  <div className="w-11 h-6 bg-gray-700 rounded-full peer 
					peer-checked:after:translate-x-full peer-checked:after:border-white 
					after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
					after:bg-white after:border-gray-300 after:border after:rounded-full 
					after:h-5 after:w-5 after:transition-all 
					peer-checked:bg-indigo-600"></div>
				</label>
			  </div>
			  <div className="flex justify-between items-center bg-slate-800 px-4 py-3 rounded-lg">
				<span className="text-gray-200">Dark Mode</span>
				<label className="relative inline-flex items-center cursor-pointer">
				  <input type="checkbox" className="sr-only peer" />
				  <div className="w-11 h-6 bg-gray-700 rounded-full peer 
					peer-checked:after:translate-x-full peer-checked:after:border-white 
					after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
					after:bg-white after:border-gray-300 after:border after:rounded-full 
					after:h-5 after:w-5 after:transition-all 
					peer-checked:bg-indigo-600"></div>
				</label>
			  </div>
			</div>
		  </div>
		);
	}
  };

  return (
	<Layout>
	  <div className="w-full h-full flex flex-col">
		{/* Navigation */}
		<div className="flex justify-around border-b border-slate-700 py-4 bg-slate-900">
		  <button
			className={`flex items-center transition-all duration-300 
			${activeTab === "host" 
			  ? "text-emerald-400 scale-110" 
			  : "text-gray-500 hover:text-gray-300"}`}
			onClick={() => setActiveTab("host")}
		  >
			<Play className="mr-2" size={20} />
			Host
		  </button>
		  <button
			className={`flex items-center transition-all duration-300 
			${activeTab === "join" 
			  ? "text-indigo-400 scale-110" 
			  : "text-gray-500 hover:text-gray-300"}`}
			onClick={() => setActiveTab("join")}
		  >
			<LogIn className="mr-2" size={20} />
			Join
		  </button>
		  <button
			className={`flex items-center transition-all duration-300 
			${activeTab === "settings" 
			  ? "text-purple-400 scale-110" 
			  : "text-gray-500 hover:text-gray-300"}`}
			onClick={() => setActiveTab("settings")}
		  >
			<Settings className="mr-2" size={20} />
			Settings
		  </button>
		</div>

		{/* Content Area */}
		<div className="flex-grow flex items-center justify-center p-6">
		  {renderContent()}
		</div>
	  </div>
	</Layout>
  );
};

export default StreamPage;
