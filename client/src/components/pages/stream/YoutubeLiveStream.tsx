import React from 'react';
import {  PlayCircleIcon } from 'lucide-react';

interface YoutubeLiveStreamProps {
  streamData?: {
    snippet: {
      title: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        standard?: { url: string };
      };
    };
    status: {
      lifeCycleStatus: string;
    };
  };
}

const YoutubeLiveStream: React.FC<YoutubeLiveStreamProps> = ({ streamData }) => {
  if (!streamData) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-white">
        <div className="animate-pulse bg-slate-700 w-full h-48 rounded-lg"></div>
        <div className="animate-pulse bg-slate-700 w-full h-8 rounded"></div>
      </div>
    );
  }

  const { snippet, status } = streamData;
  const thumbnailUrl = 
    snippet.thumbnails.high?.url || 
    snippet.thumbnails.medium?.url || 
    snippet.thumbnails.standard?.url;

  const isLive = status.lifeCycleStatus === 'live';

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        {thumbnailUrl && (
          <img 
            src={thumbnailUrl} 
            alt={snippet.title} 
            className="w-full rounded-lg shadow-lg"
          />
        )}
        {isLive && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full flex items-center space-x-1">
            <span className="text-xs font-bold">LIVE</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <PlayCircleIcon 
          className={`${isLive ? 'text-green-500' : 'text-gray-500'}`} 
        />
        <h2 className="text-white text-lg font-semibold truncate">
          {snippet.title}
        </h2>
      </div>
    </div>
  );
};

export default YoutubeLiveStream;
