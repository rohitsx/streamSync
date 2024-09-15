import React, { useState } from 'react';
import { Link as LinkIcon, Mic, DollarSign, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NavBar from '@/components/navBar';
import Header from '@/components/header';

const GoLivePage = () => {
    const [videoLink, setVideoLink] = useState('');
    const [selectedMic, setSelectedMic] = useState('');
    const [allowDonations, setAllowDonations] = useState(false);

    const handleGoLive = () => {
        if (videoLink && selectedMic) {
            console.log('Going live with video link:', videoLink);
            console.log('Selected microphone:', selectedMic);
            console.log('Allow donations:', allowDonations);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-[23rem] bg-gray-900 text-white">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                <section className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 ease-in-out">
                    <div className="flex items-center space-x-3 mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Go Live</h2>
                            <p className="text-xs text-gray-400">Set up your stream</p>
                        </div>
                    </div>
                    <Alert className="bg-purple-900/50 border-purple-700 text-purple-100 mb-4">
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                            Enter your video link and configure your stream settings below.
                        </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="video-link" className="text-sm font-medium text-gray-300">Video Link</label>
                            <div className="relative">
                                <Input
                                    id="video-link"
                                    type="text"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    placeholder='Enter your video link'
                                    className="bg-gray-700 text-white border-gray-600 pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 placeholder-opacity-12"
                                />
                                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="micSelect" className="text-sm font-medium text-gray-300">Select Microphone</label>
                            <div className="relative">
                                <select
                                    id="micSelect"
                                    value={selectedMic}
                                    onChange={(e) => setSelectedMic(e.target.value)}
                                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                                >
                                    <option value="" disabled className="text-gray-500 opacity-30">Choose a microphone</option>
                                    <option value="mic1">Microphone 1</option>
                                    <option value="mic2">Microphone 2</option>
                                    <option value="mic3">Microphone 3</option>
                                </select>
                                <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <DollarSign size={20} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-300">Allow Donations</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={allowDonations}
                                    onChange={() => setAllowDonations(!allowDonations)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>
                </section>

                <Button
                    onClick={handleGoLive}
                    disabled={!videoLink || !selectedMic}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                >
                    Go Live
                </Button>
            </main>

            <NavBar />
        </div>
    );
};

export default GoLivePage;