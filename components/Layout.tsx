
import React, { useState, useRef, useEffect } from 'react';

const SECTIONS = ['intro', 'projects', 'experience', 'skills', 'contact'];

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showNav?: boolean;
  activeId?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, showNav = true, activeId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (index: number) => {
    const targetId = SECTIONS[index];
    const container = scrollContainerRef.current;
    const element = container?.querySelector(`#${targetId}`);
    
    if (container && element instanceof HTMLElement) {
      container.scrollTo({
        top: element.offsetTop - 24, // Slight padding for header
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    if (onBack) {
      onBack();
      return;
    }
    const nextIndex = activeIndex > 0 ? activeIndex - 1 : SECTIONS.length - 1;
    scrollToSection(nextIndex);
  };

  const handleNext = () => {
    if (onBack) return;
    const nextIndex = activeIndex < SECTIONS.length - 1 ? activeIndex + 1 : 0;
    scrollToSection(nextIndex);
  };

  // Sync active index based on scroll position
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !showNav) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + 150;
      SECTIONS.forEach((id, idx) => {
        const el = container.querySelector(`#${id}`);
        if (el instanceof HTMLElement) {
          if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            setActiveIndex(idx);
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [showNav]);

  // Stickers removed: no pointer handlers required

  // Stickers removed: no sticker state or refs

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

      {/* Main Focus Card Container */}
      <div className="card-stack w-full max-w-[600px] h-[85vh] relative z-30">
        <div className="w-full h-full bg-slate-950/95 border border-slate-700 rounded-[32px] overflow-hidden flex flex-col shadow-2xl">
          
          {/* Internal Card Header (Fixed) */}
          <div className="p-6 flex justify-between items-center border-b border-white/10 shrink-0 bg-[#111] z-50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <button 
                onClick={handlePrev}
                className="text-white/40 hover:text-white transition-colors px-2 font-bold"
              >
                {onBack ? 'HOME' : 'PREV'}
              </button>
              <span className="bg-white/10 px-4 py-1.5 rounded-full text-white font-bold tracking-tighter">
                {onBack ? activeId?.toUpperCase() : `${activeIndex + 1} / ${SECTIONS.length}`}
              </span>
              <button 
                onClick={handleNext}
                disabled={!!onBack}
                className={`transition-colors px-2 font-bold ${onBack ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'}`}
              >
                NEXT
              </button>
            </div>
          </div>

          {/* Scrollable Center Content */}
          <div 
            ref={scrollContainerRef}
            className="flex-grow overflow-y-auto no-scrollbar scroll-smooth p-8 md:p-12 relative"
          >
            {children}
            
            <footer className="mt-20 pt-10 border-t border-white/10 text-center">
              <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">Aakash Singh // Data Engineering Portfolio // v2.2</p>
            </footer>
          </div>
        </div>
      </div>

      {/* Grid Overlay for background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.16),transparent_20%)] bg-[size:24px_24px]"></div>
    </div>
  );
};

export default Layout;
