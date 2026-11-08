import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface AudioPlayerProps {
  autoStart?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [track, setTrack] = useState<'santoor' | 'sitar' | 'bells'>('santoor');
  const [showMenu, setShowMenu] = useState(false);

  const toggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioSynth.startMusic(track);
    }
  };

  const changeTrack = (newTrack: 'santoor' | 'sitar' | 'bells') => {
    setTrack(newTrack);
    if (!isMuted) {
      audioSynth.startMusic(newTrack);
    }
    setShowMenu(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {/* Audio Preset Dropdown Menu */}
      {showMenu && (
        <div className="bg-[#1a0f2e]/90 backdrop-blur-md border border-amber-500/40 rounded-xl p-2 shadow-xl flex flex-col gap-1 text-xs font-cinzel text-amber-200 animate-in fade-in zoom-in duration-200">
          <span className="px-2 py-1 text-[10px] text-amber-400/70 font-semibold tracking-wider uppercase border-b border-amber-500/20">
            Festive Raga Music
          </span>
          <button
            onClick={() => changeTrack('santoor')}
            className={`px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 text-left transition-colors ${
              track === 'santoor' ? 'bg-amber-500/30 text-amber-100 font-bold' : 'hover:bg-amber-500/10'
            }`}
          >
            <span>🪕 Royal Santoor</span>
            {track === 'santoor' && <Sparkles className="w-3 h-3 text-amber-300" />}
          </button>
          <button
            onClick={() => changeTrack('sitar')}
            className={`px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 text-left transition-colors ${
              track === 'sitar' ? 'bg-amber-500/30 text-amber-100 font-bold' : 'hover:bg-amber-500/10'
            }`}
          >
            <span>🪘 Festive Sitar & Tanpura</span>
            {track === 'sitar' && <Sparkles className="w-3 h-3 text-amber-300" />}
          </button>
          <button
            onClick={() => changeTrack('bells')}
            className={`px-3 py-1.5 rounded-lg flex items-center justify-between gap-2 text-left transition-colors ${
              track === 'bells' ? 'bg-amber-500/30 text-amber-100 font-bold' : 'hover:bg-amber-500/10'
            }`}
          >
            <span>🔔 Temple Bells & Chimes</span>
            {track === 'bells' && <Sparkles className="w-3 h-3 text-amber-300" />}
          </button>
        </div>
      )}

      {/* Track Selector Trigger Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2.5 rounded-full bg-[#1a0f2e]/80 border border-amber-500/40 text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 backdrop-blur-md shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
        title="Select Festive Music Track"
      >
        <Music className="w-4 h-4" />
      </button>

      {/* Main Mute / Unmute Button */}
      <button
        onClick={toggleMute}
        className="px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 border border-amber-300 text-amber-950 font-semibold text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:brightness-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-amber-950" />
            <span className="hidden sm:inline">Unmute Music</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-amber-950 animate-pulse" />
            <span className="hidden sm:inline">Festive Music</span>
          </>
        )}
      </button>
    </div>
  );
};
