export default function RefundPage() {
  return (
    <main style={{maxWidth:'640px',margin:'0 auto',padding:'60px 24px',fontFamily:'system-ui',color:'#111'}}>
      <h1 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Refund Policy</h1>
      <p style={{color:'#888',marginBottom:'40px'}}>Last updated: {new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Our guarantee</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>If Koven does not deliver a case study that meets your expectations, we will refund you in full — no questions asked — within 48 hours of your purchase.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>How to request a refund</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Email hi@getkoven.io with your order ID and reason. We process all refund requests within 24 hours.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Eligibility</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Refund requests must be made within 48 hours of purchase. After 48 hours, refunds are considered on a case-by-case basis.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Processing time</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Approved refunds are processed within 5–10 business days depending on your payment method.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>Contact</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>hi@getkoven.io</p>
    </main>
  )
}
