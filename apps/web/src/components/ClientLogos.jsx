import { cn } from '../lib/utils';

export default function ClientLogos({ logos }) {
  const displayLogos = logos || [
    "ACME CORP", "GLOBAL DYNAMICS", "SOYLENT", 
    "INTERSOLAR", "MASSIVE DYNAMIC", "UMBRELLA"
  ];

  return (
    <section className="py-24 border-y border-white/5 bg-black/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h3 className="text-sm font-semibold tracking-widest text-white/50 uppercase">
          Trusted by innovative teams worldwide
        </h3>
      </div>
      
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10"></div>

      <div className="flex gap-8 group">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-16 min-w-full shrink-0 justify-around",
              "animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            )}
          >
            {displayLogos.map((logo, idx) => (
              <div key={idx} className="text-2xl font-bold text-white/30 whitespace-nowrap opacity-50 grayscale hover:opacity-100 hover:text-white transition-smooth">
                {logo}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
