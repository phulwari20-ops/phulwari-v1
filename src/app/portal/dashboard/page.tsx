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
  FileCheck
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

  useEffect(() => {
    const sessionStr = localStorage.getItem('phulwari_student')
    if (!sessionStr) {
      router.push('/portal/login')
      return
    }

    try {
      const studentData = JSON.parse(sessionStr)
      setStudent(studentData)
      fetchDashboardData(studentData.id || studentData.admission_id)
    } catch {
      router.push('/portal/login')
    }
  }, [router])

  const fetchDashboardData = async (studentId: string) => {
    console.log(`📡 [SUPABASE API HIT - FETCH DASHBOARD DATA]: https://ftnbzukwjvgxdnkrvuer.supabase.co/rest/v1/students?id=eq.${studentId}`)
    
    // 1. Fetch real-time fees and notices from persistent storage
    let localFees: any[] = []
    let localNotices: any[] = []
    try {
      const savedFees = localStorage.getItem('phulwari_admin_fees')
      if (savedFees) {
        const parsed = JSON.parse(savedFees)
        localFees = parsed.filter((f: any) => 
          f.student_id === studentId || 
          f.students?.admission_id === student?.admission_id ||
          f.students?.admission_id === studentId
        )
      }

      const savedNotices = localStorage.getItem('phulwari_notices')
      if (savedNotices) {
        localNotices = JSON.parse(savedNotices)
      }
    } catch (e) {}

    try {
      const supabase = createClient()

      const [{ data: attData }, { data: feeData }, { data: annData }] = await Promise.all([
        supabase.from('attendance').select('*').eq('student_id', studentId).order('date', { ascending: false }),
        supabase.from('fees').select('*').eq('student_id', studentId).order('due_date', { ascending: false }),
        supabase.from('announcements').select('*').order('created_at', { ascending: false })
      ])

      if (attData && attData.length > 0) setAttendance(attData)
      else setAttendance([
        { date: '2026-08-01', status: 'present', remarks: 'Active participant' },
        { date: '2026-08-02', status: 'present', remarks: 'Great energy' },
        { date: '2026-08-03', status: 'present', remarks: 'On time' }
      ])

      // Combine DB fees and local admin fees
      const mergedFees = [...(feeData || []), ...localFees]
      const uniqueFees = mergedFees.filter((f, idx, self) => 
        idx === self.findIndex(t => t.id === f.id || (t.month === f.month && t.status === f.status))
      )

      if (uniqueFees.length > 0) setFees(uniqueFees)
      else setFees([
        { id: 'f1', title: 'Monthly Activity Fee (August 2026)', amount: 3500, due_date: '2026-08-10', status: 'paid', payment_method: 'UPI / Online', receipt_no: 'REC-2026-0891', paid_date: '2026-08-01', month: 'August 2026' },
        { id: 'f2', title: 'Annual Activity Material Charges', amount: 1500, due_date: '2026-08-15', status: 'pending', payment_method: null, receipt_no: null, paid_date: null, month: 'August 2026' }
      ])

      // Combine DB announcements and local admin notices
      const mergedNotices = [...(annData || []), ...localNotices]
      if (mergedNotices.length > 0) setAnnouncements(mergedNotices)
      else setAnnouncements([
        { title: 'Welcome to New Term', content: 'We are thrilled to welcome all children and parents to the upcoming session!', category: 'Notice', date: '2026-08-01' },
        { title: 'Independence Day Celebration', content: 'Special flag hoisting & fancy dress competition on 15th August at 10:00 AM.', category: 'Event', date: '2026-08-05' }
      ])
    } catch (err) {
      console.error('Error loading student dashboard data', err)
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

  const handleLogout = () => {
    localStorage.removeItem('phulwari_student')
    router.push('/portal/login')
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
                Admission ID: <strong style={{ color: '#FF4D8D' }}>{student.admission_id}</strong> | Class: <strong>{student.class_name || 'Nursery'}-{student.section_name || 'A'}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
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
          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Batch Assigned</span>
              <BookOpen size={18} color="#FF4D8D" />
            </div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              {student.batches?.batch_name || 'Little Explorers'}
            </p>
            <p style={{ fontSize: '11px', color: '#64748B', fontFamily: 'monospace', margin: '4px 0 0 0' }}>
              {student.batches?.start_time || '09:00 AM'} - {student.batches?.end_time || '11:30 AM'}
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Attendance Rate</span>
              <Calendar size={18} color="#10B981" />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 900, color: '#10B981', margin: 0 }}>95%</p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>Regular attendance record</p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #FFE4E6', borderRadius: '24px', padding: '1.25rem 1.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '4px' }}>
              <span>Fee Pending/Due</span>
              <CreditCard size={18} color="#D97706" />
            </div>
            <p style={{ fontSize: '24px', fontWeight: 900, color: '#D97706', margin: 0 }}>
              ₹{fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + Number(f.amount), 0)}
            </p>
            <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>1 invoice pending</p>
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
              <User size={22} color="#FF4D8D" /> Child & Parent Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>Child Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Full Name:</strong> {student.full_name}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Admission ID:</strong> {student.admission_id}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Class & Section:</strong> {student.class_name || 'Nursery'} - {student.section_name || 'A'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Date of Birth:</strong> {student.dob || '14 May 2021'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Gender:</strong> {student.gender || 'Boy'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Blood Group:</strong> {student.blood_group || 'B+'}</p>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>Parent Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#1E293B' }}>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Parent/Guardian:</strong> {student.parent_name}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Contact Phone:</strong> {student.parent_phone}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Email:</strong> {student.parent_email || 'parent@example.com'}</p>
                  <p style={{ margin: 0 }}><strong style={{ color: '#64748B', fontWeight: 600 }}>Address:</strong> {student.address || 'Sector 15, Vasundhara'}</p>
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
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: 'monospace' }}>
                  {attendance.map((record, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', fontWeight: 600, color: '#0F172A' }}>{record.date}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 800,
                          background: '#ECFDF5',
                          color: '#059669',
                          border: '1px solid #A7F3D0',
                          fontFamily: 'sans-serif',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <CheckCircle2 size={14} />
                          {record.status?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'sans-serif', color: '#64748B' }}>{record.remarks || 'Standard day'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div style={{ background: '#ffffff', border: '1px solid #F1F5F9', borderRadius: '28px', padding: '2rem', boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={22} color="#D97706" /> Complete Monthly Fee Payment Ledger
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0 0' }}>2026-2027 Academic Session Ledger & Payment History</p>
              </div>

              <div style={{ padding: '6px 14px', background: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
                Monthly Fee: ₹3,500
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { title: 'April 2026 Monthly Activity Fee', month: 'April 2026', due_date: '2026-04-10', defaultAmount: 3500 },
                { title: 'May 2026 Monthly Activity Fee', month: 'May 2026', due_date: '2026-05-10', defaultAmount: 3500 },
                { title: 'June 2026 Monthly Activity Fee', month: 'June 2026', due_date: '2026-06-10', defaultAmount: 3500 },
                { title: 'July 2026 Monthly Activity Fee', month: 'July 2026', due_date: '2026-07-10', defaultAmount: 3500 },
                { title: 'August 2026 Monthly Activity Fee', month: 'August 2026', due_date: '2026-08-10', defaultAmount: 3500 },
                { title: 'September 2026 Monthly Activity Fee', month: 'September 2026', due_date: '2026-09-10', defaultAmount: 3500 },
                { title: 'October 2026 Monthly Activity Fee', month: 'October 2026', due_date: '2026-10-10', defaultAmount: 3500 },
                { title: 'November 2026 Monthly Activity Fee', month: 'November 2026', due_date: '2026-11-10', defaultAmount: 3500 },
                { title: 'December 2026 Monthly Activity Fee', month: 'December 2026', due_date: '2026-12-10', defaultAmount: 3500 },
                { title: 'January 2027 Monthly Activity Fee', month: 'January 2027', due_date: '2027-01-10', defaultAmount: 3500 },
                { title: 'February 2027 Monthly Activity Fee', month: 'February 2027', due_date: '2027-02-10', defaultAmount: 3500 },
                { title: 'March 2027 Monthly Activity Fee', month: 'March 2027', due_date: '2027-03-10', defaultAmount: 3500 }
              ].map((item, idx) => {
                const recorded = fees.find(f => 
                  f.title?.toLowerCase().includes(item.month.toLowerCase()) || 
                  (f.month && f.month.toLowerCase() === item.month.toLowerCase())
                )
                const isPaid = recorded?.status === 'paid'
                const displayFee = recorded || item

                return (
                  <div
                    key={idx}
                    style={{
                      background: isPaid ? '#F0FDF4' : '#FFFBEB',
                      border: isPaid ? '1.5px solid #BBF7D0' : '1.5px solid #FDE68A',
                      borderRadius: '20px',
                      padding: '1.25rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>{item.title}</h3>
                      <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                        Due Date: <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1E293B' }}>{item.due_date}</span>
                      </p>
                      {isPaid && recorded?.receipt_no && (
                        <p style={{ fontSize: '12px', fontFamily: 'monospace', color: '#059669', fontWeight: 700, margin: '4px 0 0 0' }}>Receipt No: {recorded.receipt_no}</p>
                      )}
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div>
                        <p style={{ fontSize: '18px', fontWeight: 900, fontFamily: 'monospace', color: '#0F172A', margin: '0 0 4px 0' }}>₹{recorded?.amount || item.defaultAmount}</p>
                        <span style={
                          isPaid
                            ? { padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }
                            : { padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', background: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' }
                        }>
                          {isPaid ? 'PAID' : 'PENDING'}
                        </span>
                      </div>

                      {isPaid ? (
                        <button
                          onClick={() => setSelectedReceipt(recorded)}
                          style={{
                            padding: '10px 16px',
                            background: '#ECFDF5',
                            color: '#059669',
                            border: '1px solid #A7F3D0',
                            borderRadius: '14px',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.15)'
                          }}
                        >
                          <Download size={15} />
                          <span>Download Receipt</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePayFee(item)}
                          style={{
                            padding: '10px 18px',
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '13px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 6px 16px rgba(16, 185, 129, 0.25)'
                          }}
                        >
                          <CreditCard size={15} />
                          <span>Mark Paid & Collect</span>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
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
                <span style={{ color: '#64748B', fontWeight: 600 }}>Class & Section:</span>
                <strong style={{ color: '#0F172A' }}>{student.class_name || 'Nursery'} - {student.section_name || 'A'}</strong>
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
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1.5rem' }}>
              <button
                onClick={() => setSelectedReceipt(null)}
                style={{ padding: '10px 18px', background: '#F1F5F9', color: '#475569', borderRadius: '14px', border: 'none', fontWeight: 700, cursor: 'pointer' }}
              >
                Close
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
                <span>Print / Save PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
