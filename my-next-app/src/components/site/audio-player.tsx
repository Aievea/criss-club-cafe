"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import music from "@/src/assets/music/Bogdan DLP - Te Pup _ Official Video.mp3";
import { useLanguage } from "@/src/i18n/language-context";

const STORAGE_KEY = "crd-audio-interacted";

// Background music + mute button temporarily disabled — flip to true to restore.
const AUDIO_ENABLED = false;

type AudioCtx = { playing: boolean; toggle: () => void };
const Ctx = createContext<AudioCtx>({ playing: true, toggle: () => {} });

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!AUDIO_ENABLED) return;
    const el = new Audio(music);
    el.loop = true;
    el.volume = 0.06;
    audioRef.current = el;

    const hasInteracted = localStorage.getItem(STORAGE_KEY) === "1";

    const tryPlay = () => {
      el.muted = false;
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    if (hasInteracted) {
      // Returning visitor — Chrome allows autoplay, just play
      tryPlay();
    } else {
      // First visit — start muted (always allowed), then wait for any interaction to unmute
      el.muted = true;
      el.play().catch(() => {});

      const unlock = (e: Event) => {
        if ((e.target as HTMLElement)?.closest("[data-mute-btn]")) return;
        localStorage.setItem(STORAGE_KEY, "1");
        el.muted = false;
        el.play().catch(() => {});
        setPlaying(true);
        document.removeEventListener("click", unlock);
        document.removeEventListener("touchstart", unlock);
      };
      document.addEventListener("click", unlock);
      document.addEventListener("touchstart", unlock);
    }

    return () => { el.pause(); el.src = ""; };
  }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <Ctx.Provider value={{ playing, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export function MuteButton() {
  const { playing, toggle } = useContext(Ctx);
  const { t } = useLanguage();

  if (!AUDIO_ENABLED) return null;

  return (
    <button
      data-mute-btn
      onClick={toggle}
      aria-label={playing ? "Oprește muzica" : "Pornește muzica"}
      className="group fixed bottom-6 left-6 z-[80] inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f5f0e8]/55 backdrop-blur-md transition-all duration-300 hover:border-[#c9a86a]/50 hover:text-[#c9a86a]"
    >
      {playing
        ? <Volume2 className="h-4 w-4" strokeWidth={1.5} />
        : <VolumeX className="h-4 w-4" strokeWidth={1.5} />
      }
      <span>{playing ? t.audio.on : t.audio.off}</span>
    </button>
  );
}
