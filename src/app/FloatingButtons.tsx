'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/motherandchildactivitycentre/';
const FACEBOOK_URL = 'https://www.facebook.com/share/1DWjMMRAjT/';
const WHATSAPP_URL = `https://wa.me/916207368839?text=${encodeURIComponent('Hello Phulwari! I need support.')}`;
const CALL_URL = 'tel:+916207368839';

export default function FloatingButton() {
  const [hovered, setHovered] = useState<'call' | 'whatsapp' | 'instagram' | 'facebook' | null>(null);

  return (
    <div style={styles.wrapper}>
      
      {/* Call Now */}
      <a
        href={CALL_URL}
        aria-label="Call Us Now"
        onMouseEnter={() => setHovered('call')}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...styles.button,
          background: hovered === 'call' ? '#007bbf' : '#009688',
          transform: hovered === 'call' ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <Phone size={22} color="white" />
      </a>

      {/* WhatsApp Now */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        onMouseEnter={() => setHovered('whatsapp')}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...styles.button,
          background: hovered === 'whatsapp' ? '#20ba5a' : '#25D366',
          transform: hovered === 'whatsapp' ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <MessageCircle size={22} color="white" />
      </a>

      {/* Instagram */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Instagram"
        onMouseEnter={() => setHovered('instagram')}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...styles.button,
          background:
            hovered === 'instagram'
              ? 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
              : 'linear-gradient(45deg, #f09433cc, #dc2743cc, #bc1888cc)',
          transform: hovered === 'instagram' ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Facebook"
        onMouseEnter={() => setHovered('facebook')}
        onMouseLeave={() => setHovered(null)}
        style={{
          ...styles.button,
          background: hovered === 'facebook' ? '#1877f2' : '#1877f2cc',
          transform: hovered === 'facebook' ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'fixed',
    bottom: '24px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 9999,
  },
  button: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};