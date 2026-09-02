'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  User,
  Calendar,
  CreditCard,
  Bell,
  CheckCircle2,
  LogOut,
  Sparkles,
  BookOpen,
  Download,
  Printer,
  X,
  FileCheck,
  ArrowRight
} from 'lucide-react'

export default function StudentDashboardPage() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [attendance, setAttendance] = useState<any[]>([])
  const [fees, setFees] = useState<any[]>([])
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'attendance' | 'fees' | 'notices'>('profile')

  // Printable Fee Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)
  const [isBatchModalOpen, setIsBatchModalOpen] = useState<boolean>(false)
  const [isDueAlertOpen, setIsDueAlertOpen] = useState<boolean>(false)

  useEffect(() => {
    const checkAuth = () => {
      const sessionStr = localStorage.getItem('phulwari_student')
      if (!sessionStr) {
        router.replace('/portal/login')
        return
      }

      try {
        const studentData = JSON.parse(sessionStr)
        if (!studentData || (!studentData.id && !studentData.admission_id)) {
          localStorage.removeItem('phulwari_student')
          router.replace('/portal/login')
          return
        }
        setStudent(studentData)
        fetchDashboardData(studentData)
      } catch {
        localStorage.removeItem('phulwari_student')
        router.replace('/portal/login')
      }
    }

    checkAuth()

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted || !localStorage.getItem('phulwari_student')) {
        checkAuth()
      }
    }
    window.addEventListener('pageshow', handlePageShow)

    const intervalId = setInterval(() => {
      const sessionStr = localStorage.getItem('phulwari_student')
      if (sessionStr) {
        try {
          const sObj = JSON.parse(sessionStr)
          if (sObj) fetchDashboardData(sObj)
        } catch(e){}
      }
    }, 3000)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      clearInterval(intervalId)
    }
  }, [router])

  const fetchDashboardData = async (currentStudentObj: any) => {
    const studentId = currentStudentObj?.id || currentStudentObj?.admission_id || ''
    const admissionId = currentStudentObj?.admission_id || ''
    if (!studentId) return

    let localFees: any[] = []
    let localNotices: any[] = []
    try {
      const savedFees = localStorage.getItem('phulwari_admin_fees')
      if (savedFees) {
        const parsed = JSON.parse(savedFees)
        localFees = parsed.filter((f: any) => 
          f.student_id === studentId || 
          f.students?.admission_id === admissionId ||
          f.admission_id === admissionId
        )
      }

      const savedNotices = localStorage.getItem('phulwari_announcements') || localStorage.getItem('phulwari_notices')
      if (savedNotices) {
        localNotices = JSON.parse(savedNotices)
      }
    } catch (e) {}

    if (localFees.length > 0) setFees(localFees)
    setAttendance([])
    setLoading(false)

    try {
      const supabase = createClient()
      const studentNameStr = currentStudentObj?.full_name || ''

      const toNativePromise = (builder: any) => {
        return new Promise((resolve) => {
          try {
            if (builder && typeof builder.then === 'function') {
              builder.then(
                (res: any) => resolve(res || { data: null }),
                () => resolve({ data: null })
              )
            } else {
              resolve({ data: null })
            }
          } catch (e) {
            resolve({ data: null })
          }
        })
      }

      // Safe individual queries wrapped in real native promises
      const [studentRes, attRes, feeRes, annRes, ledgerRes]: any[] = await Promise.all([
        toNativePromise(supabase.from('students').select('*, batches(*)').eq('id', studentId).single()),
        toNativePromise(supabase.from('attendance').select('*').or(`student_id.eq.${studentId},admission_id.eq.${admissionId}`).order('date', { ascending: false })),
        toNativePromise(supabase.from('fees').select('*').or(`student_id.eq.${studentId},admission_id.eq.${admissionId}`).order('created_at', { ascending: false })),
        toNativePromise(supabase.from('announcements').select('*').order('created_at', { ascending: false })),
        toNativePromise(supabase.from('financial_ledger').select('*').eq('linked_student_id', studentId).order('date', { ascending: false }))
      ])

      if (studentRes?.data) {
        setStudent((prev: any) => ({ ...prev, ...studentRes.data }))
      }

      const attData = attRes?.data || []
      const feeData = feeRes?.data || []
      const annData = annRes?.data || []
      const ledgerData = ledgerRes?.data || []

      if (attData && attData.length > 0) setAttendance(attData)

      // Normalize financial ledger entries into fee records format
      const ledgerAsFees = ledgerData.map((lg: any) => ({
        id: lg.id,
        fee_head: lg.fee_head || lg.category_name || 'Monthly Fee',
        title: lg.fee_head || lg.category_name || 'Monthly Fee',
        month: lg.date ? new Date(lg.date).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'One Time',
        collected_for: lg.date ? new Date(lg.date).toLocaleString('default', { month: 'long', year: 'numeric' }) : 'One Time',
        amount: lg.amount || 0,
        discount: 0,
        amount_paid: lg.amount || 0,
        net_amount: lg.amount || 0,
        pending_amount: 0,
        status: (lg.status || 'Completed').toLowerCase() === 'completed' ? 'paid' : 'pending',
        mode_of_payment: lg.payment_mode || 'Cash',
        payment_method: lg.payment_mode || 'Cash',
        receipt_no: lg.receipt_no || `RCPT-${lg.id ? lg.id.slice(0, 6) : '2026'}`,
        created_at: lg.created_at || lg.date,
        paid_date: lg.date
      }))

      const mergedFees = [...feeData, ...ledgerAsFees, ...localFees]
      const uniqueFees = mergedFees.filter((f, idx, self) => 
        idx === self.findIndex(t => (t.id && t.id === f.id) || (t.month === f.month && t.fee_head === f.fee_head && t.amount === f.amount))
      )
      if (uniqueFees.length > 0) setFees(uniqueFees)

      if (annData && annData.length > 0) {
        setAnnouncements(annData)
        try { localStorage.setItem('phulwari_announcements', JSON.stringify(annData)) } catch (e) {}
      }
      
      const pendingAmount = uniqueFees.filter(f => f.status === 'due' || f.status === 'pending' || f.status === 'partial')
                                      .reduce((sum, f) => sum + Number(f.pending_amount || f.amount || 0), 0)
      if (pendingAmount > 0) {
        const lastAlertDate = localStorage.getItem('phulwari_due_alert_date')
        const todayStr = new Date().toISOString().split('T')[0]
        if (lastAlertDate !== todayStr) {
          setIsDueAlertOpen(true)
          localStorage.setItem('phulwari_due_alert_date', todayStr)
        }
      }

    } catch (err) {
      console.error('Dashboard data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePayFee = (item: any) => {
    const receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const paidObj = {
      id: `fee-${Date.now()}`,
      student_id: student.id || student.admission_id,
      title: item.title,
      amount: item.defaultAmount || 3500,
      discount: 0,
      net_amount: item.defaultAmount || 3500,
      due_date: item.due_date,
      status: 'paid',
      payment_method: 'UPI / Online',
      paid_date: new Date().toISOString().split('T')[0],
      receipt_no: receiptNo,
      month: item.month,
      students: {
        full_name: student.full_name,
        admission_id: student.admission_id,
        class_name: student.class_name,
        section_name: student.section_name
      }
    }

    const updated = [paidObj, ...fees]
    setFees(updated)

    try {
      const existingAdminFeesStr = localStorage.getItem('phulwari_admin_fees')
      const existingAdminFees = existingAdminFeesStr ? JSON.parse(existingAdminFeesStr) : []
      localStorage.setItem('phulwari_admin_fees', JSON.stringify([paidObj, ...existingAdminFees]))
    } catch (e) {}

    setSelectedReceipt(paidObj)
  }

  const handleDownloadReceiptFile = (receiptObj: any) => {
    if (!receiptObj) return

    const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <title>Phulwari_Fee_Receipt_${receiptObj.receipt_no || 'REC-2026'}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
      body { font-family: 'Poppins', sans-serif; margin: 0; padding: 2rem; background: #ffffff; color: #0F172A; }
      .receipt-card { max-width: 600px; margin: 0 auto; border: 2px solid #E2E8F0; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      .header { background: linear-gradient(135deg, #FF4D8D 0%, #E11D48 100%); color: #ffffff; padding: 2rem; text-align: center; position: relative; }
      .header h1 { margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
      .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
      .badge { display: inline-block; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.4); padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-top: 10px; }
      .body { padding: 2rem; }
      .info-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
      .info-table td { padding: 10px 14px; font-size: 13px; border-bottom: 1px solid #F1F5F9; }
      .info-table td.label { color: #64748B; font-weight: 600; width: 40%; }
      .info-table td.value { font-weight: 700; color: #0F172A; }
      .total-box { background: #ECFDF5; border: 1.5px dashed #10B981; border-radius: 16px; padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
      .total-title { font-size: 14px; font-weight: 800; color: #065F46; }
      .total-amount { font-size: 24px; font-weight: 900; color: #059669; font-family: monospace; }
      .paid-stamp { position: absolute; right: 20px; top: 20px; border: 2.5px solid #ffffff; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-weight: 900; font-size: 13px; text-transform: uppercase; transform: rotate(-6deg); }
      .footer { text-align: center; padding: 1.25rem; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B; }
      @media print {
        body { padding: 0; }
        .receipt-card { border: none; box-shadow: none; max-width: 100%; }
      }
    </style>
  </head>
  <body>
    <div class="receipt-card">
      <div class="header">
        <div class="paid-stamp">OFFICIAL PAID</div>
        <h1>PHULWARI MOTHER & CHILD CENTRE</h1>
        <p>Kidwaipuri, Boring Road, Patna, Bihar | Ph: +91 6207368839</p>
        <div class="badge">Official Fee Payment Receipt Voucher</div>
      </div>
      <div class="body">
        <table class="info-table">
          <tr>
            <td class="label">Receipt Number</td>
            <td class="value" style="color: #E11D48; font-family: monospace;">${receiptObj.receipt_no || 'REC-2026-0891'}</td>
          </tr>
          <tr>
            <td class="label">Payment Date</td>
            <td class="value">${receiptObj.paid_date || new Date().toISOString().split('T')[0]}</td>
          </tr>
          <tr>
            <td class="label">Student Name</td>
            <td class="value">${student?.full_name || 'Student'}</td>
          </tr>
          <tr>
            <td class="label">Admission ID</td>
            <td class="value" style="font-family: monospace;">${student?.admission_id || 'N/A'}</td>
          </tr>
          <tr>
            <td class="label">Class & Section</td>
            <td class="value">${student?.class_name || 'Nursery'} - ${student?.section_name || 'A'}</td>
          </tr>
          <tr>
            <td class="label">Fee Description</td>
            <td class="value">${receiptObj.title || 'Monthly Fee'}</td>
          </tr>
          <tr>
            <td class="label">Payment Method</td>
            <td class="value" style="color: #059669;">${receiptObj.payment_method || 'UPI / Online'}</td>
          </tr>
        </table>

        <div class="total-box">
          <div class="total-title">TOTAL AMOUNT RECEIVED</div>
          <div class="total-amount">₹${receiptObj.amount || 3500}</div>
        </div>
      </div>
      <div class="footer">
        <p style="margin:0 0 4px 0; font-weight:700;">Thank you for choosing Phulwari Centre!</p>
        <p style="margin:0;">This is a computer-generated official receipt voucher. No signature required.</p>
      </div>
    </div>
    <script>
      window.onload = function() {
        window.print();
      };
    </script>
  </body>
</html>`

    const printWin = window.open('', '_blank', 'width=700,height=800')
    if (printWin) {
      printWin.document.write(htmlContent)
      printWin.document.close()
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('phulwari_student')
    try { sessionStorage.clear() } catch (e) {}
    router.replace('/portal/login')
  }

  if (loading || !student) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', border: '3px solid #FF4D8D', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#475569' }}>Loading Parent Portal...</span>
        </div>
      </div>
    )
  }
  const getBatchTimingString = (st: any) => {
    if (!st) return '10:30 AM - 11:30 AM'
    if (st.batches?.batch_time) return st.batches.batch_time
    if (st.batches?.start_time && st.batches?.end_time) return `${st.batches.start_time} - ${st.batches.end_time}`
    if (st.preferred_time_slot && st.preferred_time_slot !== 'N/A') return st.preferred_time_slot
    if (st.batch_time) return st.batch_time
    if (st.batch_timing) return st.batch_timing
    if (st.start_time && st.end_time) return `${st.start_time} - ${st.end_time}`
    return '10:30 AM - 11:30 AM'
  }

  const presentCount = attendance.filter((a: any) => {
    const st = String(a.status || '').toLowerCase()
    return st === 'present' || st === 'late' || st === 'p'
  }).length

  const calculatedAttendanceRate = attendance.length > 0 
    ? Math.round((presentCount / attendance.length) * 100) 
    : 100

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #FFF0F5 0%, #F8FAFC 100%)', fontFamily: "'Poppins', sans-serif", paddingBottom: '3rem' }}>
      {/* Top Header Banner */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #FFE4E6', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2A6D 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#ffffff',
              fontSize: '18px',
              boxShadow: '0 8px 20px rgba(255,77,141,0.25)',
              flexShrink: 0
            }}>
              {student.full_name?.charAt(0) || 'P'}
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{student.full_name}</span>
                <span style={{ fontSize: '11px', padding: '3px 10px', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: '20px', fontFamily: 'monospace', fontWeight: 700 }}>
                  ACTIVE
                </span>
              </h1>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0, fontFamily: 'monospace' }}>
                Admission ID: <strong style={{ color: '#FF4D8D' }}>{student.admission_id}</strong> | Batch: <strong>{student.batches?.batch_name || student.batch_name || 'N/A'}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsNotificationOpen(prev => !prev)}
                style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '14px', background: '#F1F5F9', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#334155' }}
                title="Fee & Center Notifications"
              >
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '4px', right: '4px', width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', border: '2px solid #ffffff' }} />
              </button>

              {/* Notification Popover Dropdown */}
              {isNotificationOpen && (
                <div style={{ position: 'absolute', right: 0, top: '50px', width: '320px', background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', zIndex: 50 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Bell size={16} color="#FF4D8D" /> Notifications
                    </h4>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', background: '#FEE2E2', color: '#DC2626', borderRadius: '10px' }}>
                      Fee Renewal Due
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: '14px', padding: '10px 12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800, color: '#9F1239', margin: '0 0 2px 0' }}>
                        ⏰ Monthly Fee Renewal Notification
                      </p>
                      <p style={{ fontSize: '11px', color: '#BE123C', margin: 0, lineHeight: 1.4 }}>
                        Dear Parent, August 2026 Activity Fee (₹3,500) renewal is due. Please pay via UPI or ERP portal.
                      </p>
                    </div>

                    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '10px 12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 800, color: '#1E293B', margin: '0 0 2px 0' }}>
                        🎉 Upcoming Center Event
                      </p>
                      <p style={{ fontSize: '11px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                        Special toddler fitness & craft workshop scheduled for this Saturday!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              style={{ fontSize: '13px', fontWeight: 700, padding: '10px 18px', borderRadius: '14px', background: '#FFF1F2', color: '#E11D48', border: '1px solid #FECDD3', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
        {/* Quick Summary Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div 
            onClick={() => setIsBatchModalOpen(true)}
            style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Batch Assigned</span>
              <BookOpen size={18} color="#FF4D8D" />
            </div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {student.batches?.name || student.batches?.batch_name || student.batch_name || student.program_interested || 'Not Assigned'}
            </p>
            <p style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', margin: '4px 0 0 0' }}>
              {getBatchTimingString(student)}
            </p>
            <div style={{ fontSize: '10px', color: '#FF4D8D', fontWeight: 700, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Click to view details <ArrowRight size={12} />
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Attendance Rate</span>
              <Calendar size={18} color="#10B981" />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 900, color: '#10B981', margin: 0 }}>{calculatedAttendanceRate}%</p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>
              {attendance.length > 0 ? `${presentCount} of ${attendance.length} sessions attended` : 'Regular attendance record'}
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Fee Pending/Due</span>
              <CreditCard size={18} color="#D97706" />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 900, color: '#D97706', margin: 0 }}>
              ₹{fees.filter(f => f.status === 'pending' || f.status === 'due' || f.status === 'partial').reduce((sum, f) => sum + Number(f.pending_amount || f.amount || 0), 0).toLocaleString('en-IN')}
            </p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>{fees.filter(f => f.status === 'pending' || f.status === 'due' || f.status === 'partial').length} invoice(s) pending</p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Notices & Events</span>
              <Bell size={18} color="#9333EA" />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 900, color: '#9333EA', margin: 0 }}>{announcements.length}</p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>Active notices for parents</p>
          </div>
        </div>

        {/* Tab Navigation Container with Top Clearance so Active Outlines are Never Clipped */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingTop: '8px',
          paddingBottom: '14px',
          marginBottom: '1.5rem',
          borderBottom: '2px solid #F1F5F9'
        }}>
          {[
            { id: 'profile', label: 'Child Profile', icon: User },
            { id: 'attendance', label: 'Attendance Logs', icon: Calendar },
            { id: 'fees', label: 'Fee Payments', icon: CreditCard },
            { id: 'notices', label: 'Notices & Circulars', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '18px',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  background: active ? 'linear-gradient(135deg, #FF4D8D 0%, #FF2A6D 100%)' : '#ffffff',
                  color: active ? '#ffffff' : '#475569',
                  border: active ? '1.5px solid #FF4D8D' : '1.5px solid #E2E8F0',
                  boxShadow: active ? '0 10px 25px rgba(255, 77, 141, 0.3)' : 'none'
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div style={{ background: '#ffffff', border: '1px solid #F1F5F9', borderRadius: '28px', padding: '2rem', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={22} color="#FF4D8D" /> Child Registration & Consent Profile
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* 1. CHILD DETAILS */}
              <div style={{ background: '#FFF5F7', padding: '1.5rem', borderRadius: '20px', border: '1px solid #FFE4E8' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#E11D48', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🌸</span> Child Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Full Name:</strong> {student.full_name}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Admission ID:</strong> {student.admission_id}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Date of Birth:</strong> {student.dob || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Gender:</strong> {student.gender || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Blood Group:</strong> {student.blood_group || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>City/State:</strong> {student.city || 'Patna'}, {student.state || 'Bihar'} {student.pin_code && `(${student.pin_code})`}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Address:</strong> {student.address || 'N/A'}</p>
                </div>
              </div>

              {/* 2. PARENT DETAILS */}
              <div style={{ background: '#FAF5FF', padding: '1.5rem', borderRadius: '20px', border: '1px solid #F3E8FF' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#6B21A8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🍇</span> Parent Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Parent/Guardian:</strong> {student.parent_name}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Relationship:</strong> {student.parent_relationship || 'Father'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Occupation:</strong> {student.parent_occupation || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Contact Phone:</strong> {student.parent_phone}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Alternate Phone:</strong> {student.parent_alt_phone || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Email:</strong> {student.parent_email || 'N/A'}</p>
                </div>
              </div>

              {/* 3. EMERGENCY CONTACT */}
              <div style={{ background: '#F0FDF4', padding: '1.5rem', borderRadius: '20px', border: '1px solid #DCFCE7' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🌿</span> Emergency Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Contact Name:</strong> {student.emergency_contact_name || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Relationship:</strong> {student.emergency_relationship || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Phone No.:</strong> {student.emergency_phone || 'N/A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Alternate Phone:</strong> {student.emergency_alt_phone || 'N/A'}</p>
                </div>
              </div>

              {/* 4. PROGRAM & BATCH DETAILS */}
              <div style={{ background: '#FFF7ED', padding: '1.5rem', borderRadius: '20px', border: '1px solid #FFEDD5' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🎯</span> Program & Batch
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Batch Name:</strong> {student.batch_name || 'Nursery - Afternoon'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Programs Active:</strong> {student.program_interested || 'General Activity'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Time Slot:</strong> {student.preferred_time_slot || 'Morning'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>End Date:</strong> {student.validity_end_date || 'N/A'}</p>
                </div>
              </div>

              {/* 5. MEDICAL DETAILS */}
              <div style={{ background: '#F0F9FF', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E0F2FE' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🩺</span> Medical Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Condition:</strong> {student.has_medical_condition ? (student.medical_condition_details || 'Yes') : 'None'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Regular Medication:</strong> {student.regular_medication || 'None'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Doctor:</strong> {student.doctor_name || 'N/A'} {student.doctor_phone && `(${student.doctor_phone})`}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Hospital:</strong> {student.hospital_preference || 'N/A'}</p>
                </div>
              </div>

              {/* 6. CONSENT STATUS */}
              <div style={{ background: '#FFF1F2', padding: '1.5rem', borderRadius: '20px', border: '1px solid #FFE4E6' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#DB2777', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📜</span> Legal & Consent
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Terms Agreed:</strong> {student.consent_accepted ? '✓ Yes, Agreed' : 'Pending Verification'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Status:</strong> <span style={{ color: student.status === 'active' ? '#16A34A' : '#DC2626', fontWeight: 'bold' }}>{student.status?.toUpperCase() || 'ACTIVE'}</span></p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Joined On:</strong> {student.created_at ? new Date(student.created_at).toLocaleDateString('en-GB') : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div style={{ background: '#ffffff', border: '1px solid #F1F5F9', borderRadius: '28px', padding: '2rem', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={22} color="#10B981" /> Daily Attendance Logs
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B', textAlign: 'left', background: '#F8FAFC' }}>
                    <th style={{ padding: '14px 16px' }}>Date</th>
                    <th style={{ padding: '14px 16px' }}>Activity</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'monospace' }}>
                  {attendance.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#64748B' }}>
                        No attendance records found.
                      </td>
                    </tr>
                  ) : (
                    attendance.map((record, i) => {
                      const stat = record.status?.toLowerCase() || 'unmarked'
                      const isPresent = stat === 'present'
                      const isAbsent = stat === 'absent'
                      const isHalfday = stat === 'halfday'
                      const isLeave = stat === 'leave'
                      const isHoliday = stat === 'holiday'

                      const bg = isPresent ? '#ECFDF5' : isAbsent ? '#FEF2F2' : isHalfday ? '#FFFBEB' : isLeave ? '#EFF6FF' : '#F3E8FF'
                      const textCol = isPresent ? '#059669' : isAbsent ? '#DC2626' : isHalfday ? '#D97706' : isLeave ? '#2563EB' : '#7E22CE'
                      const borderCol = isPresent ? '#A7F3D0' : isAbsent ? '#FCA5A5' : isHalfday ? '#FDE68A' : isLeave ? '#BFDBFE' : '#E9D5FF'

                      return (
                        <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', fontWeight: 600, color: '#0F172A' }}>{record.date}</td>
                          <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', fontWeight: 700, color: '#4F46E5' }}>{record.class_name || 'General Activity'}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 800,
                              background: bg,
                              color: textCol,
                              border: `1px solid ${borderCol}`,
                              fontFamily: 'sans-serif',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <CheckCircle2 size={14} />
                              {record.status?.toUpperCase() || 'MARKED'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', color: '#64748B' }}>{record.remarks || 'Standard day'}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Fee Payments */}
        {activeTab === 'fees' && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ background: '#ffffff', border: '1px solid #FDE68A', borderRadius: '24px', padding: '2rem', boxShadow: '0 15px 35px rgba(0,0,0,0.03)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#FEF3C7', padding: '12px', borderRadius: '16px', color: '#D97706' }}>
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Fee History & Ledger</h2>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Complete record of all fee collections and dues</p>
                  </div>
                </div>
              </div>

              {fees.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0' }}>
                  <CreditCard size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem auto' }} />
                  <p style={{ color: '#64748B', fontWeight: 600 }}>No fee records found.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Fee Head</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Month/Year</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'right' }}>Total Fee</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'right' }}>Discount</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'right' }}>Paid</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700, textAlign: 'right' }}>Due</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Status</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Pay. Mode</th>
                        <th style={{ padding: '1rem', color: '#475569', fontWeight: 700 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((f, i) => (
                        <tr key={f.id || i} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? '#ffffff' : '#F8FAFC' }}>
                          <td style={{ padding: '1rem', fontWeight: 700, color: '#0F172A' }}>{f.fee_head || f.title || 'Fee Payment'}</td>
                          <td style={{ padding: '1rem', color: '#64748B' }}>{f.collected_for || f.month || 'One Time'}</td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>₹{Number(f.amount || 0).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'monospace', color: '#D97706' }}>₹{Number(f.discount || 0).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 900, color: '#10B981' }}>₹{Number(f.amount_paid || f.net_amount || 0).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontFamily: 'monospace', fontWeight: 900, color: '#EF4444' }}>
                            ₹{Number(f.pending_amount || (f.status==='pending'?f.amount:0)).toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            {f.status === 'paid' ? (
                              <span style={{ padding: '4px 10px', background: '#D1FAE5', color: '#059669', borderRadius: '12px', fontSize: '10px', fontWeight: 800 }}>PAID</span>
                            ) : f.status === 'partial' ? (
                              <span style={{ padding: '4px 10px', background: '#FEF3C7', color: '#D97706', borderRadius: '12px', fontSize: '10px', fontWeight: 800 }}>PARTIAL</span>
                            ) : (
                              <span style={{ padding: '4px 10px', background: '#FEE2E2', color: '#DC2626', borderRadius: '12px', fontSize: '10px', fontWeight: 800 }}>DUE</span>
                            )}
                          </td>
                          <td style={{ padding: '1rem', color: '#64748B' }}>{f.mode_of_payment || f.payment_method || '—'}</td>
                          <td style={{ padding: '1rem' }}>
                            {f.status === 'paid' ? (
                              <button onClick={() => handleDownloadReceiptFile(f)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F1F5F9', color: '#475569', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                                <Download size={14} /> Receipt
                              </button>
                            ) : (
                              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF4D8D', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
                                Pay Now
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div style={{ background: '#ffffff', border: '1px solid #F1F5F9', borderRadius: '28px', padding: '2rem', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={22} color="#9333EA" /> Announcements & Circulars
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {announcements.map((ann, i) => (
                <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', padding: '4px 12px', background: '#F3E8FF', color: '#7E22CE', border: '1px solid #E9D5FF', borderRadius: '20px' }}>
                      {ann.category || 'General Notice'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace' }}>{ann.date || 'August 2026'}</span>
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>{ann.title}</h3>
                  <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', margin: 0 }}>{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRINTABLE FEE RECEIPT MODAL */}
      {selectedReceipt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 9999
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '28px',
            padding: '2rem',
            maxWidth: '560px',
            width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
            fontFamily: "'Poppins', sans-serif"
          }}>
            {/* Receipt Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #F1F5F9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', background: '#ECFDF5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={22} color="#059669" />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Phulwari Fee Payment Receipt</h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>Official Computer Generated Voucher</p>
                </div>
              </div>

              <button onClick={() => setSelectedReceipt(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <X size={20} color="#64748B" />
              </button>
            </div>

            {/* Receipt Content Body */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '1.5rem', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Receipt No:</span>
                <strong style={{ fontFamily: 'monospace', color: '#FF4D8D' }}>{selectedReceipt.receipt_no || 'REC-2026-0891'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Student Name:</span>
                <strong style={{ color: '#0F172A' }}>{student.full_name}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Admission ID:</span>
                <strong style={{ fontFamily: 'monospace', color: '#0F172A' }}>{student.admission_id}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Batch Assigned:</span>
                <strong style={{ color: '#0F172A' }}>{student.batches?.name || student.batches?.batch_name || student.batch_name || 'N/A'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Fee Title:</span>
                <strong style={{ color: '#0F172A' }}>{selectedReceipt.title}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                <span style={{ color: '#64748B', fontWeight: 600 }}>Payment Method:</span>
                <strong style={{ color: '#059669' }}>{selectedReceipt.payment_method || 'UPI / Online'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>Total Paid Amount:</span>
                <strong style={{ fontSize: '20px', fontFamily: 'monospace', color: '#059669' }}>₹{selectedReceipt.amount}</strong>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedReceipt(null)}
                style={{ padding: '10px 18px', background: '#F1F5F9', color: '#475569', borderRadius: '14px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >
                Close
              </button>

              <button
                onClick={() => handleDownloadReceiptFile(selectedReceipt)}
                style={{
                  padding: '10px 18px',
                  background: '#ECFDF5',
                  color: '#059669',
                  border: '1px solid #A7F3D0',
                  borderRadius: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={16} />
                <span>Download Voucher File</span>
              </button>

              <button
                onClick={() => window.print()}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: '#ffffff',
                  borderRadius: '14px',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
                }}
              >
                <Printer size={16} />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
