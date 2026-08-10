'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { UserCheck, Lock, ArrowRight, ShieldAlert, Sparkles, KeyRound } from 'lucide-react'

export default function StudentLoginPage() {
  const router = useRouter()
  const [admissionId, setAdmissionId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const targetUrl = `https://ftnbzukwjvgxdnkrvuer.supabase.co/rest/v1/students?admission_id=eq.${admissionId.trim()}`
    console.log(`📡 [SUPABASE API HIT - POST/GET LOGIN]: ${targetUrl}`)

    try {
      const supabase = createClient()
      
      const { data, error: fetchErr } = await supabase
        .from('students')
        .select('*, batches(*)')
        .eq('admission_id', admissionId.trim())
        .eq('password', password.trim())
        .maybeSingle()

      if (fetchErr) {
        throw new Error(fetchErr.message)
      }

      if (!data) {
        if (admissionId.trim() === 'PH-2026-001' && password.trim() === 'parent123') {
          const demoStudent = {
            id: '33333333-3333-3333-3333-333333333333',
            admission_id: 'PH-2026-001',
            full_name: 'Aarav Sharma',
            parent_name: 'Rajesh Sharma',
            parent_phone: '+91 98765 43210',
            class_name: 'Nursery',
            section_name: 'A',
            batches: { batch_name: 'Little Explorers (Morning)', start_time: '09:00 AM', end_time: '11:30 AM', days: 'Mon - Fri' }
          }
          localStorage.setItem('phulwari_student', JSON.stringify(demoStudent))
          router.push('/portal/dashboard')
          return
        }
        setError('Invalid Admission ID or Password. Please check your credentials.')
        setLoading(false)
        return
      }

      localStorage.setItem('phulwari_student', JSON.stringify(data))
      router.push('/portal/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '80vh',
      background: 'linear-gradient(180deg, #FFF0F5 0%, #FAF5FF 50%, #F8FAFC 100%)',
      fontFamily: "'Poppins', 'Quicksand', -apple-system, sans-serif",
      padding: '1.5rem 0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '92%',
        maxWidth: '440px',
        background: '#ffffff',
        borderRadius: '24px',
        border: '1.5px solid #FFE4E6',
        boxShadow: '0 20px 45px rgba(255, 77, 141, 0.12)',
        padding: '1.75rem 1.25rem',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '12px',
            background: '#FFF0F5',
            color: '#FF4D8D',
            borderRadius: '18px',
            border: '1px solid #FFE4E6',
            marginBottom: '8px'
          }}>
            <UserCheck size={28} />
          </div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#0F172A',
            margin: '6px 0 4px 0',
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            Parent & Student Portal <Sparkles size={18} color="#F59E0B" />
          </h1>
          <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4', margin: 0 }}>
            Sign in with your Admission ID & Password assigned by Phulwari Office
          </p>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            background: '#FFF1F2',
            border: '1px solid #FECDD3',
            borderRadius: '14px',
            color: '#E11D48',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '1rem'
          }}>
            <ShieldAlert size={16} color="#E11D48" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E293B',
              marginBottom: '4px'
            }}>
              <span>Admission ID</span>
              <span style={{ fontSize: '10px', color: '#FF4D8D', fontFamily: 'monospace' }}>Required</span>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. PH-2026-001"
              value={admissionId}
              onChange={(e) => setAdmissionId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0F172A',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: '#1E293B',
              marginBottom: '4px'
            }}>
              <span>Password</span>
              <span style={{ fontSize: '10px', color: '#FF4D8D', fontFamily: 'monospace' }}>Assigned by Office</span>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 14px',
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '14px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', right: '14px', top: '14px', pointerEvents: 'none' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2A6D 100%)',
              color: '#ffffff',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(255, 77, 141, 0.35)',
              marginTop: '0.25rem'
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
          <div style={{
            padding: '10px 12px',
            background: '#FFF0F5',
            border: '1px solid #FFE4E6',
            borderRadius: '14px',
            fontSize: '11px',
            color: '#475569',
            marginBottom: '10px'
          }}>
            <p style={{ fontWeight: 700, color: '#1E293B', marginBottom: '2px' }}>
              💡 Demo Parent Login Credentials:
            </p>
            <p style={{ fontFamily: 'monospace', margin: 0 }}>
              Admission ID: <strong style={{ color: '#FF4D8D' }}>PH-2026-001</strong> | Password: <strong style={{ color: '#FF4D8D' }}>parent123</strong>
            </p>
          </div>

          <Link href="/" style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textDecoration: 'none' }}>
            ← Return to Phulwari Main Website
          </Link>
        </div>
      </div>
    </main>
  )
}
