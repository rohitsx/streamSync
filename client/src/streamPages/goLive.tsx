import { useState } from 'react';
import { Play, Link as LinkIcon, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NavBar from '@/components/navBar';
import Header from '@/components/header';

const GoLivePage = () => {
    const [videoLink, setVideoLink] = useState('');
    const [selectedMic, setSelectedMic] = useState('');

    const handleGoLive = () => {
        if (videoLink && selectedMic) {
            console.log('Going live with video link:', videoLink);
            console.log('Selected microphone:', selectedMic);
        }
    };

    return (
        <div className="flex flex-col h-[600px] w-96 bg-gray-900 text-white">
            <Header />

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-start p-6 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800 overflow-y-auto">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Go Live</h2>

                <Alert className="bg-purple-900/50 border-purple-700 text-purple-100">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                        Enter your video link and configure your stream settings below.
                    </AlertDescription>
                </Alert>

                <div className="w-full max-w-md space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="video-link" className="text-sm font-medium text-gray-300">Video Link</label>
                        <div className="relative">
                            <Input
                                id="video-link"
                                type="text"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                placeholder='Enter your video link'
                                className="bg-gray-800 text-white border-gray-700 pl-10"
                            />
                            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="micSelect" className="text-sm font-medium text-gray-300">Select Microphone</label>
                        <Select onValueChange={setSelectedMic}>
                            <SelectTrigger id="micSelect" className="w-full bg-gray-800 text-white border-2 border-gray-700">
                                <SelectValue placeholder="Choose a microphone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mic1">Microphone 1</SelectItem>
                                <SelectItem value="mic2">Microphone 2</SelectItem>
                                <SelectItem value="mic3">Microphone 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Allow Donations</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>
                    <Button
                        onClick={handleGoLive}
                        disabled={!videoLink || !selectedMic} className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        <Play className="mr-2" size={20} />
                        <span>Go Live</span>
                    </Button>
                </div>
            </main>

            <NavBar />
        </div>
    );
};

export default GoLivePage;