import { useState, useEffect } from 'react';
import DesktopHomePage from './DesktopHomePage';
import MobileHomePage from './MobileHomePage';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient && !navigator.userAgent.includes("ReactSnap")) {
    return <div className="min-h-screen bg-black" />; 
  }

  return isMobile ? <MobileHomePage /> : <DesktopHomePage />;
}
