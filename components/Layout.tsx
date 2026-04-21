
import React, { useState, useRef, useEffect } from 'react';

const SECTIONS = ['intro', 'projects', 'experience', 'skills', 'contact'];

const GROUND_STICKERS = [
  { id: 1, label: 'A.I.', left: '7%', bottom: '3.5%', size: '4.5rem', rotate: '-14deg' },
  { id: 2, label: 'DATA', left: '18%', bottom: '2.5%', size: '3.75rem', rotate: '10deg' },
  { id: 3, label: 'SQL', left: '31%', bottom: '4.5%', size: '4rem', rotate: '-7deg' },
  { id: 4, label: 'ML', left: '72%', bottom: '3%', size: '3.5rem', rotate: '13deg' },
  { id: 5, label: 'RAG', left: '85%', bottom: '4%', size: '4.25rem', rotate: '-11deg' },
] as const;

type StickerConfig = (typeof GROUND_STICKERS)[number];

type StickerState = StickerConfig & {
  offsetX: number;
  offsetY: number;
};

type DragState = {
  id: number;
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
} | null;

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showNav?: boolean;
  activeId?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack, showNav = true, activeId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSticker, setActiveSticker] = useState<number | null>(null);
  const [stickerState, setStickerState] = useState<StickerState[]>(() =>
    GROUND_STICKERS.map((sticker) => ({
      ...sticker,
      offsetX: 0,
      offsetY: 0,
    }))
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState>(null);

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

  useEffect(() => {
    if (activeSticker === null) return;

    const timer = window.setTimeout(() => setActiveSticker(null), 1200);
    return () => window.clearTimeout(timer);
  }, [activeSticker]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;

      if (!dragState) return;

      setStickerState((currentState) =>
        currentState.map((sticker) =>
          sticker.id === dragState.id
            ? {
                ...sticker,
                offsetX: dragState.originX + (event.clientX - dragState.startX),
                offsetY: dragState.originY + (event.clientY - dragState.startY),
              }
            : sticker
        )
      );
    };

    const handlePointerUp = () => {
      dragStateRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  const handleStickerPointerDown = (event: React.PointerEvent<HTMLButtonElement>, sticker: StickerState) => {
    event.preventDefault();
    event.stopPropagation();

    dragStateRef.current = {
      id: sticker.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: sticker.offsetX,
      originY: sticker.offsetY,
    };

    setActiveSticker(sticker.id);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#010205]">

      {/* Main Focus Card Container */}
      <div className="card-stack w-full max-w-[600px] h-[85vh] relative z-30">
        <div className="w-full h-full bg-[#0b0b0b] border border-white/8 rounded-[32px] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
          
          {/* Internal Card Header (Fixed) */}
          <div className="p-6 flex justify-between items-center border-b border-white/10 shrink-0 bg-[#0f0f0f] z-50">
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
            className="flex-grow overflow-y-auto no-scrollbar scroll-smooth p-8 md:p-12 relative bg-gradient-to-b from-white/[0.015] to-transparent"
          >
            {children}
            
            <footer className="mt-20 pt-10 border-t border-white/10 text-center">
              <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest">Aakash Singh // Data Engineering Portfolio // v2.2</p>
            </footer>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stickerFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--sticker-rotate)); }
          50% { transform: translateY(-8px) rotate(var(--sticker-rotate)); }
        }
      `}</style>

      {/* Space background with white grid lines */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#010205]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.10),transparent_18%),radial-gradient(circle_at_52%_74%,rgba(255,255,255,0.05),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.008)_55%,rgba(255,255,255,0.07)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(to_top,rgba(0,0,0,0.96),rgba(16,16,16,0.64),rgba(40,40,40,0.08))]" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-white/18" />
        <div className="absolute inset-0 opacity-28 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:78px_78px] [mask-image:radial-gradient(circle_at_center,black_52%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-18 bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:150px_150px] bg-[position:0_0]" />
      </div>

      {/* Draggable stickers layer */}
      <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
        {stickerState.map((sticker) => {
          const isActive = activeSticker === sticker.id;

          return (
            <button
              key={sticker.id}
              type="button"
              onPointerDown={(event) => handleStickerPointerDown(event, sticker)}
              className={`absolute flex items-center justify-center rounded-[26%] border border-white/25 bg-gradient-to-b from-white/18 to-white/6 text-white shadow-[0_20px_45px_rgba(0,0,0,0.55)] backdrop-blur-sm pointer-events-auto touch-none select-none transition-[transform,box-shadow,opacity] duration-300 ease-out ${isActive ? 'scale-110 shadow-[0_28px_60px_rgba(0,0,0,0.7)]' : 'hover:scale-105 hover:-translate-y-1'}`}
              style={{
                left: sticker.left,
                bottom: sticker.bottom,
                width: sticker.size,
                height: sticker.size,
                transform: `translate(${sticker.offsetX}px, ${sticker.offsetY}px) rotate(${sticker.rotate})`,
                zIndex: isActive ? 60 : 20,
                animation: dragStateRef.current?.id === sticker.id ? 'none' : `stickerFloat ${6 + sticker.id}s ease-in-out infinite`,
                animationDelay: `${sticker.id * 0.4}s`,
                '--sticker-rotate': sticker.rotate,
              } as React.CSSProperties}
              aria-label={`${sticker.label} sticker`}
            >
              <span className="absolute inset-0 rounded-[26%] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))]" />
              <span className="relative z-10 text-[0.72rem] font-black tracking-[0.28em] text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {sticker.label}
              </span>
              {isActive && (
                <span className="absolute -top-3 right-2 text-[10px] font-bold tracking-[0.3em] text-white/70 uppercase animate-pulse">
                  pop
                </span>
              )}
              <span className={`absolute -bottom-3 left-1/2 h-3 w-[140%] -translate-x-1/2 rounded-full bg-black/60 blur-md transition-opacity duration-300 ${isActive ? 'opacity-70' : 'opacity-45'}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
