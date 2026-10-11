'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Video, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ActivityVideo } from '@/lib/activitiesFallback';
import { ActivityVideoPlayer } from './ActivityVideoPlayer';

interface ActivityVideoGalleryProps {
  videos?: ActivityVideo[];
  title: string;
  category?: string;
  accentColor?: string;
  accentBg?: string;
}

export function ActivityVideoGallery({
  videos: initialVideos,
  title,
  category,
  accentColor = '#FF4D8D',
  accentBg = '#FFE6EF',
}: ActivityVideoGalleryProps) {
  const [videoList, setVideoList] = useState<ActivityVideo[]>(initialVideos || []);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [playlistPage, setPlaylistPage] = useState(1);
  const pageSize = 3;

  // If initialVideos is empty, fetch dynamically from backend API /api/videos
  useEffect(() => {
    if (!initialVideos || initialVideos.length === 0) {
      const url = category ? `/api/videos?category=${encodeURIComponent(category)}&limit=8` : '/api/videos?limit=8';
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setVideoList(json.data);
          }
        })
        .catch((err) => console.error('Failed to load videos from backend:', err));
    } else {
      setVideoList(initialVideos);
    }
  }, [initialVideos, category]);

  if (!videoList || videoList.length === 0) return null;

  const currentVideo = videoList[selectedIdx] || videoList[0];

  // Video Playlist Pagination (YouTube Architecture)
  const totalPlaylistPages = Math.max(1, Math.ceil(videoList.length / pageSize));
  const pagedVideos = videoList.slice((playlistPage - 1) * pageSize, playlistPage * pageSize);

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

      {/* Paginated Video Playlist Strip (YouTube Style) */}
      {videoList.length > 1 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                Video Playlist ({videoList.length} Sessions)
              </h4>
            </div>

            {totalPlaylistPages > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500">
                  Page {playlistPage} of {totalPlaylistPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={playlistPage === 1}
                    onClick={() => setPlaylistPage((p) => Math.max(1, p - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
                    aria-label="Previous video page"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-700" />
                  </button>
                  <button
                    type="button"
                    disabled={playlistPage === totalPlaylistPages}
                    onClick={() => setPlaylistPage((p) => Math.min(totalPlaylistPages, p + 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
                    aria-label="Next video page"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pagedVideos.map((vid, idx) => {
              const actualIdx = (playlistPage - 1) * pageSize + idx;
              const isSelected = selectedIdx === actualIdx;
              return (
                <div
                  key={vid.id || actualIdx}
                  onClick={() => setSelectedIdx(actualIdx)}
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
                        sizes="96px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
                        <Video className="w-6 h-6" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow"
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
                    <h5 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-pink-600 transition">
                      {vid.title}
                    </h5>
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
        </div>
      )}
    </div>
  );
}
