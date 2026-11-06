import React from 'react'

const AdminLogo: React.FC = () => (
  <div style={{ maxWidth: 220, textAlign: 'center' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      alt="Lubliner Art"
      height={220}
      src="/media/lubliner/lubliner-art-logo.png"
      style={{ display: 'block', height: 220, margin: '0 auto', width: 'auto' }}
      width={165}
    />
    <p style={{ fontSize: '0.75rem', lineHeight: 1.4, margin: '0.75rem 0 0' }}>
      Jean-Paul Lubliner est un art concepteur. Son refuge est situé au 8 passage des abbesses,
      75018, PARIS FRANCE
    </p>
  </div>
)

export default AdminLogo
