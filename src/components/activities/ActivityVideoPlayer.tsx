'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, Settings, Gauge } from 'lucide-react';

interface ActivityVideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  accentColor?: string;
  autoPlay?: boolean;
}

export function ActivityVideoPlayer({
  src,
  poster,
  title,
  accentColor = '#FF4D8D',
  autoPlay = false,
}: ActivityVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '0:00';
    const minutes = Math.floor(timeInSec / 60);
    const seconds = Math.floor(timeInSec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isEnded) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsEnded(false);
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    updateBuffered();
  };

  const updateBuffered = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const v = videoRef.current;
    if (v.buffered.length > 0) {
      try {
        const end = v.buffered.end(v.buffered.length - 1);
        setBufferedPercent(Math.min(100, (end / v.duration) * 100));
      } catch (_) {}
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    updateBuffered();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTo = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = (speed: number) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 2800);
    }
  };

  // YouTube Keyboard Shortcuts: Space/K = Play/Pause, ArrowLeft/Right = Seek, M = Mute, F = Fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process when container or video is in focus or fullscreen
      if (!containerRef.current) return;
      const isFocused = containerRef.current.contains(document.activeElement) || document.fullscreenElement === containerRef.current;
      if (!isFocused && !isPlaying) return;

      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime = Math.min(duration || 0, videoRef.current.currentTime + 5);
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f') {
        e.preventDefault();
        handleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, duration, isMuted]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800/80 group select-none outline-none focus:ring-2 focus:ring-pink-500/50"
    >
      {/* Native video with YouTube chunked Range streaming: preload="none" saves 100% bandwidth until clicked */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onProgress={updateBuffered}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setIsEnded(true);
          setShowControls(true);
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* BIG CENTER PLAY BUTTON OVERLAY */}
      {(!isPlaying || isEnded) && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-all duration-300 z-10"
        >
          <button
            type="button"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform transform hover:scale-110 active:scale-95 text-white"
            style={{ backgroundColor: accentColor }}
            aria-label="Play video"
          >
            {isEnded ? (
              <RotateCcw className="w-8 h-8 animate-spin-once" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
          {title && (
            <p className="mt-3 text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-md px-4 text-center max-w-md">
              {title}
            </p>
          )}
          <span className="mt-1 text-[11px] font-semibold text-white/70 tracking-wider">
            Click to Stream (1080p HD Native)
          </span>
        </div>
      )}

      {/* TOP STREAMING BADGE */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold tracking-wide border border-white/10 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Real Session Video</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase text-emerald-400 tracking-wider border border-white/10">
          HD 1080p
        </span>
      </div>

      {/* BOTTOM YOUTUBE-STYLE CONTROLS BAR */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Layered Progress Bar Timeline (YouTube Style with Buffer & Played Lines) */}
        <div className="relative w-full h-3 flex items-center group/scrubber cursor-pointer">
          {/* Base Track */}
          <div className="absolute inset-x-0 h-1 group-hover/scrubber:h-1.5 bg-white/20 rounded-full transition-all" />
          {/* Buffer Progress Bar (Light Gray / Translucent) */}
          <div
            className="absolute left-0 h-1 group-hover/scrubber:h-1.5 bg-white/40 rounded-full transition-all pointer-events-none"
            style={{ width: `${bufferedPercent}%` }}
          />
          {/* Played Progress Bar (Accent Red/Pink) */}
          <div
            className="absolute left-0 h-1 group-hover/scrubber:h-1.5 rounded-full pointer-events-none"
            style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
          />
          {/* Hidden Seek Range Input Overlay */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label="Seek video timeline"
          />
        </div>

        {/* Buttons & Time Row */}
        <div className="flex items-center justify-between text-white text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 hover:text-pink-400 transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 hover:text-pink-400 transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <span className="font-medium text-slate-300 tabular-nums text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* Speed Control Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSpeedMenu((prev) => !prev)}
                className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md text-[11px] font-bold text-slate-200 flex items-center gap-1 transition"
                title="Playback Speed"
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}</span>
              </button>

              {/* Speed Popover Menu */}
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-slate-900 border border-slate-700 rounded-xl p-1 shadow-2xl flex flex-col gap-0.5 z-30 min-w-[80px]">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-3 py-1 text-[11px] font-bold rounded-lg text-left transition ${
                        playbackSpeed === spd
                          ? 'bg-pink-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {spd === 1 ? '1x (Normal)' : `${spd}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="p-1.5 hover:text-pink-400 transition"
              title="Fullscreen (F)"
            >
              <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
