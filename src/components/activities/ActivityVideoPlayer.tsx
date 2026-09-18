'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';

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
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
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
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
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
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800/80 group select-none"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
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
        </div>
      )}

      {/* TOP STREAMING BADGE */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold tracking-wide border border-white/10 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Real Session Video</span>
        </span>
      </div>

      {/* BOTTOM CONTROLS BAR */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar Timeline */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:h-2 transition-all"
            style={{ accentColor }}
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
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 hover:text-pink-400 transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            <span className="font-medium text-slate-300 tabular-nums text-xs">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFullscreen}
              className="p-1.5 hover:text-pink-400 transition"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
