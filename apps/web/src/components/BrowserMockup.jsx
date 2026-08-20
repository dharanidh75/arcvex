import { forwardRef } from 'react';

// PLACEHOLDER MEDIA - Swap these out when the real Lilviaa assets are ready.
// You can use .png, .jpg, or .mp4 files.
export const PRIMARY_MEDIA = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop";
export const SECONDARY_MEDIA = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop";

// Helper to determine if a URL is a video
const isVideo = (url) => typeof url === 'string' && url.match(/\.(mp4|webm|ogg)$/i);

const MediaElement = ({ src, className, alt }) => {
  if (isVideo(src)) {
    return (
      <video 
        src={src} 
        className={className} 
        autoPlay 
        muted 
        loop 
        playsInline 
      />
    );
  }
  return <img src={src} alt={alt} className={className} />;
};

const BrowserMockup = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="relative w-full max-w-[650px] mx-auto perspective-[1200px]" style={{ transformStyle: 'preserve-3d' }}>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full transform-gpu -translate-z-10 pointer-events-none" />

      {/* Secondary Window (Depth Layer) */}
      <div className="absolute top-10 -right-12 bottom-[-2.5rem] left-12 opacity-30 rounded-xl border border-white/10 bg-black/80 overflow-hidden transform-gpu -translate-z-20 blur-[1px] pointer-events-none">
        <div className="flex items-center px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="w-full h-full bg-zinc-950 relative">
          <MediaElement src={SECONDARY_MEDIA} alt="Lilviaa Secondary" className="w-full h-full object-cover opacity-40 grayscale" />
        </div>
      </div>

      {/* Primary Window */}
      <div className="relative rounded-xl border border-white/20 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transform-gpu z-10">
        
        {/* Browser Chrome */}
        <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5 relative">
          {/* Traffic Lights - Monochrome */}
          <div className="flex gap-1.5 absolute left-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3f3f46]" />
          </div>
          
          {/* Address Bar */}
          <div className="mx-auto px-6 py-1 rounded bg-black/40 text-[10px] text-white/40 font-mono tracking-wider flex items-center gap-2">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            lilviaa.com
          </div>
        </div>

        {/* Primary Image Slot */}
        <div className="aspect-[16/10] bg-zinc-900 w-full relative">
          <MediaElement src={PRIMARY_MEDIA} alt="Lilviaa Platform" className="w-full h-full object-cover" />
          {/* Subtle inner shadow for screen depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>
      </div>
    </div>
  );
});

BrowserMockup.displayName = 'BrowserMockup';
export default BrowserMockup;
