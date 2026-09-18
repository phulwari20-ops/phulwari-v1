'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Sparkles, Video, Clock } from 'lucide-react';
import { ActivityVideo } from '@/lib/activitiesFallback';
import { ActivityVideoPlayer } from './ActivityVideoPlayer';

interface ActivityVideoGalleryProps {
  videos: ActivityVideo[];
  title: string;
  accentColor?: string;
  accentBg?: string;
}

export function ActivityVideoGallery({
  videos,
  title,
  accentColor = '#FF4D8D',
  accentBg = '#FFE6EF',
}: ActivityVideoGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!videos || videos.length === 0) return null;

  const currentVideo = videos[selectedIdx] || videos[0];

  return (
    <div className="w-full space-y-6">
      {/* Active Featured Video Player */}
      <div className="w-full">
        <ActivityVideoPlayer
          key={currentVideo.url}
          src={currentVideo.url}
          poster={currentVideo.poster}
          title={currentVideo.title}
          accentColor={accentColor}
        />
        {currentVideo.description && (
          <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
            {currentVideo.description}
          </p>
        )}
      </div>

      {/* Video Playlist Strip (when more than 1 video is available) */}
      {videos.length > 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {videos.map((vid, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={vid.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex gap-3 items-center ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/60 shadow-md ring-2 ring-pink-400/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-sm'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  {vid.poster ? (
                    <Image
                      src={vid.poster}
                      alt={vid.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                      <Video className="w-6 h-6" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: isSelected ? accentColor : 'rgba(0,0,0,0.6)' }}
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-bold text-white px-1.5 py-0.5 rounded">
                      {vid.duration}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-pink-600 transition">
                    {vid.title}
                  </h4>
                  {vid.description && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {vid.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
