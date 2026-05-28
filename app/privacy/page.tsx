export default function PrivacyPage() {
  return (
    <main style={{maxWidth:'640px',margin:'0 auto',padding:'60px 24px',fontFamily:'system-ui',color:'#111'}}>
      <h1 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Privacy Policy</h1>
      <p style={{color:'#888',marginBottom:'40px'}}>Last updated: {new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>What we collect</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>We collect your email address (for account access), GitHub URL, X handle, and product URL that you submit. We also collect standard usage analytics (page views, no personal data).</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>How we use it</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Your submitted data is used solely to generate your case study. We do not sell, share, or use your data for advertising.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Third parties</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>We use Paddle for payment processing (they handle payment data — we never see your card details), Supabase for database, and Vercel for hosting.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Data retention</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Your generated case studies are stored as long as your account is active. You can request deletion at any time by emailing hi@getkoven.io.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Contact</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>hi@getkoven.io</p>
    </main>
  )
}
