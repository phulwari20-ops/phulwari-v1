'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Send, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'

export default function PingButton() {
  const [loading, setLoading] = useState(false)
  const [log, setLog] = useState<{ time: string; status: string; detail: string } | null>(null)

  const handlePing = async () => {
    setLoading(true)
    const supabase = createClient()
    const startTime = Date.now()

    try {
      // Send live request to Supabase API
      const { data, error } = await supabase.from('test_connections').select('*').limit(1)
      const elapsed = Date.now() - startTime

      if (error) {
        setLog({
          time: new Date().toLocaleTimeString(),
          status: `HTTP Response Received (${elapsed}ms)`,
          detail: `Supabase PostgREST Engine Code: ${error.code || 'N/A'} - ${error.message}`,
        })
      } else {
        setLog({
          time: new Date().toLocaleTimeString(),
          status: `Success (${elapsed}ms)`,
          detail: `Data returned: ${JSON.stringify(data)}`,
        })
      }
    } catch (err: any) {
      setLog({
        time: new Date().toLocaleTimeString(),
        status: 'Error',
        detail: err.message || 'Failed to ping Supabase',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Interactive API Ping Test</h3>
          <p className="text-xs text-slate-400">Click below to send a live API call directly to your Supabase project.</p>
        </div>
        <button
          onClick={handlePing}
          disabled={loading}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span>{loading ? 'Sending Request...' : 'Send Live API Ping'}</span>
        </button>
      </div>

      {log && (
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1 font-mono">
          <div className="flex items-center justify-between text-emerald-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {log.status}
            </span>
            <span className="text-[10px] text-slate-500">{log.time}</span>
          </div>
          <p className="text-slate-300 text-[11px] break-all">{log.detail}</p>
        </div>
      )}
    </div>
  )
}
