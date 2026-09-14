import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, PlayCircle } from "lucide-react";

const YOUTUBE_ID = "Nw5YIq5i3KY";
const YOUTUBE_URL = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`;
const POSTER_URL = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const FALLBACK_POSTER = `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const YT_WATCH_URL = "https://youtu.be/Nw5YIq5i3KY";

type VideoState = "closed" | "open";

export const HeroVideoDemo = () => {
  const [videoState, setVideoState] = useState<VideoState>("closed");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // --- Stop playback by destroying the iframe src ---
  const stopPlayback = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
    setIframeLoaded(false);
    setIframeError(false);
  }, []);

  const handleOpen = useCallback(() => {
    setVideoState("open");
    // Focus close button after opening for a11y
    setTimeout(() => closeBtnRef.current?.focus(), 100);
  }, []);

  const handleClose = useCallback(() => {
    stopPlayback();
    setVideoState("closed");
    // Return focus to the open button
    setTimeout(() => openBtnRef.current?.focus(), 100);
  }, [stopPlayback]);

  // ESC to close
  useEffect(() => {
    if (videoState !== "open") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoState, handleClose]);

  // Stop playback on unmount / page navigation
  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] };

  const playerVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
  };

  const closedVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Section label — only shown in closed state */}
      {videoState === "closed" && (
        <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500 text-center mb-4 select-none">
          WATCH THE LBES PRODUCT
        </p>
      )}

      <AnimatePresence mode="wait">
        {/* ── OPEN STATE: full embedded player ── */}
        {videoState === "open" && (
          <motion.div
            key="player"
            variants={playerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="relative w-full"
          >
            {/* Card container matching existing LBES card style */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              {/* 16:9 aspect-ratio wrapper */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {/* Loading poster — shown while iframe initialises */}
                {!iframeLoaded && !iframeError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]">
                    <img
                      src={posterError ? FALLBACK_POSTER : POSTER_URL}
                      alt="LBES product demo thumbnail"
                      onError={() => setPosterError(true)}
                      className="w-full h-full object-cover opacity-30"
                      draggable={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center animate-pulse">
                        <Play size={18} className="text-white/60 ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}

                {/* YouTube failure fallback */}
                {iframeError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 bg-[#0A0A0A]">
                    <p className="text-gray-400 text-sm text-center">
                      Couldn't load the player.
                    </p>
                    <a
                      href={YT_WATCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-medium border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                    >
                      Watch the LBES product demo on YouTube ↗
                    </a>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    className="absolute inset-0 w-full h-full"
                    src={YOUTUBE_URL}
                    title="LBES product demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setIframeLoaded(true)}
                    onError={() => setIframeError(true)}
                  />
                )}
              </div>
            </div>

            {/* Close button — centred below the player */}
            <div className="flex justify-center mt-4">
              <button
                ref={closeBtnRef}
                onClick={handleClose}
                aria-label="Close LBES product demo"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-[#0A0A0A] hover:bg-white/5 text-gray-400 hover:text-white text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X size={12} strokeWidth={2.5} />
                Close
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CLOSED STATE: compact play / reopen control ── */}
        {videoState === "closed" && (
          <motion.div
            key="closed"
            variants={closedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            className="flex justify-center"
          >
            <button
              ref={openBtnRef}
              onClick={handleOpen}
              aria-label="Play LBES product demo"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-[#0A0A0A] hover:border-white/25 hover:bg-white/[0.03] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {/* Small play icon badge */}
              <span className="w-7 h-7 rounded-full bg-white/[0.07] border border-white/15 flex items-center justify-center group-hover:bg-white/[0.12] transition-colors flex-shrink-0">
                <PlayCircle size={14} className="text-white/60 group-hover:text-white/90 transition-colors" />
              </span>
              <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">
                Watch demo
              </span>
              <span className="text-gray-600 text-xs font-mono">
                · 2 min
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
