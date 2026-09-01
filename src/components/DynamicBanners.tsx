'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sparkles, ArrowRight, X } from 'lucide-react'

export interface BannerItem {
  id: string
  title: string
  subtitle?: string
  description?: string
  cta_text?: string
  cta_url?: string
  target_link_open?: 'Same Tab' | 'New Tab'
  banner_type: string
  aspect_ratio: string
  image_url: string
  mobile_image_url?: string
  display_position: string
  priority: number
  status: string
  start_date?: string
  end_date?: string
  device_target?: string
  impressions?: number
  clicks?: number
}

interface DynamicBannersProps {
  position: 'Hero Section' | 'Header Top' | 'Top Announcement Bar' | 'Sidebar' | 'Pre-Footer' | 'Footer' | 'Popup Banner'
  className?: string
}

export default function DynamicBanners({ position, className = '' }: DynamicBannersProps) {
  const [banners, setBanners] = useState<BannerItem[]>([])
  const [closedPopupIds, setClosedPopupIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchBanners()
  }, [position])

  const fetchBanners = async () => {
    let activeList: BannerItem[] = []
    const todayStr = new Date().toISOString().split('T')[0]

    // 1. Fetch live directly from Supabase DB (100% direct connection)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('status', 'active')
        .eq('display_position', position)
        .order('priority', { ascending: true })

      if (!error && data && data.length > 0) {
        activeList = data.filter(b => {
          if (b.start_date && b.start_date > todayStr) return false
          if (b.end_date && b.end_date < todayStr) return false
          return true
        })
      }
    } catch (err) {}

    // 2. Fallback to local persistent cache if network unavailable
    if (activeList.length === 0) {
      try {
        const saved = localStorage.getItem('phulwari_banners')
        if (saved) {
          const parsed = JSON.parse(saved)
          activeList = parsed.filter((b: any) => {
            if (b.status !== 'active') return false
            if (b.display_position !== position) return false
            if (b.start_date && b.start_date > todayStr) return false
            if (b.end_date && b.end_date < todayStr) return false
            return true
          }).sort((a: any, b: any) => (a.priority || 0) - (b.priority || 0))
        }
      } catch (e) {}
    }

    setBanners(activeList)

    // Increment impressions counter in Supabase
    if (activeList.length > 0) {
      try {
        const supabase = createClient()
        activeList.forEach(b => {
          supabase.from('banners').update({ impressions: (b.impressions || 0) + 1 }).eq('id', b.id).then(() => {})
        })
      } catch (e) {}
    }
  }

  const handleBannerClick = async (banner: BannerItem) => {
    try {
      const supabase = createClient()
      await supabase.from('banners').update({ clicks: (banner.clicks || 0) + 1 }).eq('id', banner.id)
    } catch (e) {}

    if (banner.cta_url) {
      if (banner.target_link_open === 'New Tab') {
        window.open(banner.cta_url, '_blank')
      } else {
        window.location.href = banner.cta_url
      }
    }
  }

  if (banners.length === 0) return null

  // Top Announcement Bar Style
  if (position === 'Top Announcement Bar') {
    const topBanner = banners[0]
    return (
      <div className={`w-full bg-gradient-to-r from-pink-600 via-rose-600 to-purple-700 text-white py-2 px-4 text-xs font-bold shadow-md flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center justify-center gap-2 max-w-6xl mx-auto truncate text-center">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
          <span className="truncate">{topBanner.title} {topBanner.subtitle && `— ${topBanner.subtitle}`}</span>
        </div>
        {topBanner.cta_url && (
          <button
            onClick={() => handleBannerClick(topBanner)}
            className="px-3 py-1 bg-white text-pink-700 hover:bg-amber-100 rounded-full text-[11px] font-black uppercase tracking-wider transition shrink-0 cursor-pointer shadow-xs"
          >
            {topBanner.cta_text || 'View Details'}
          </button>
        )}
      </div>
    )
  }

  // Popup Banner Style
  if (position === 'Popup Banner') {
    const popupBanner = banners.find(b => !closedPopupIds.has(b.id))
    if (!popupBanner) return null

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-pink-500/30">
          <button
            onClick={() => setClosedPopupIds(prev => new Set(prev).add(popupBanner.id))}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold hover:bg-black transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {popupBanner.image_url && (
            <div className="aspect-[16/9] w-full bg-slate-950">
              <img src={popupBanner.image_url} alt={popupBanner.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 space-y-3 text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-100 text-pink-700 font-mono">
              {popupBanner.banner_type}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">{popupBanner.title}</h3>
            {popupBanner.subtitle && (
              <p className="text-xs font-bold text-pink-600 dark:text-pink-400">{popupBanner.subtitle}</p>
            )}
            {popupBanner.description && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{popupBanner.description}</p>
            )}

            {popupBanner.cta_url && (
              <div className="pt-2">
                <button
                  onClick={() => handleBannerClick(popupBanner)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold rounded-2xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 text-sm transition cursor-pointer"
                >
                  <span>{popupBanner.cta_text || 'Explore Offer'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Standard Hero / Section / Sidebar Banner Card List
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {banners.map(banner => (
        <div
          key={banner.id}
          onClick={() => handleBannerClick(banner)}
          className="relative rounded-3xl overflow-hidden shadow-lg border border-pink-100 dark:border-slate-800 transition transform hover:-translate-y-1 cursor-pointer group bg-slate-950"
        >
          <div className="aspect-[16/9] w-full relative">
            <img
              src={banner.image_url}
              alt={banner.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 flex flex-col justify-end text-white space-y-2">
              {banner.banner_type && (
                <span className="w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-600/90 text-white backdrop-blur-sm border border-pink-400/30">
                  {banner.banner_type}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-black drop-shadow-md leading-tight">{banner.title}</h3>
              {banner.subtitle && (
                <p className="text-xs sm:text-sm font-extrabold text-amber-300 drop-shadow-xs">{banner.subtitle}</p>
              )}
              {banner.cta_url && (
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-2xl text-xs font-black hover:bg-pink-50 transition shadow-md">
                    <span>{banner.cta_text || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-600" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
