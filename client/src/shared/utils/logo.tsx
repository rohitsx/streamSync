import React from 'react';

const Logo: React.FC = () => {

    return (
        <>
            <svg className="w-24 h-24 mb-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                </defs>
                <path d="M20 80 Q50 20, 80 80" stroke="url(#gradient)" strokeWidth="8" fill="none" />
                <circle cx="30" cy="70" r="10" fill="#60A5FA" />
                <circle cx="70" cy="70" r="10" fill="#8B5CF6" />
            </svg>
        </>
    )
};

export default Logo;
