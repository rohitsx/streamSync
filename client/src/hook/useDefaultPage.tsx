import { useState, useEffect } from 'react';
import LandingPage from '../LandingPages/LandingPage';
import Home from '../LandingPages/home';
import HostView from '../streamPages/view/hostView';
import AudienceView from '../streamPages/view/audienceView';

export default function useDefaultPage(): [(newPage: string) => void, JSX.Element | null] {
    const [defaultPage, setDefaultPage] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setDefaultPage(<LandingPage />);
            return;
        }

        const storedDefaultPage = localStorage.getItem('defaultPage');
        updateDefaultPage(storedDefaultPage || 'home');
    }, []);

    const updateDefaultPage = (newPage: string) => {
        localStorage.setItem('defaultPage', newPage);

        switch (newPage) {
            case 'home':
                setDefaultPage(<Home />);
                break;
            case 'host':
                setDefaultPage(<HostView />);
                break;
            case 'audience':
                setDefaultPage(<AudienceView />);
                break;
            default:
                setDefaultPage(<Home />);
        }


    };

    return [updateDefaultPage, defaultPage];
}