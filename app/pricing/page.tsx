export default function PricingPage() {
  return (
    <main style={{maxWidth:'640px',margin:'0 auto',padding:'60px 24px',fontFamily:'system-ui',color:'#111'}}>
      <h1 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Koven Pricing</h1>
      <p style={{color:'#555',marginBottom:'48px'}}>One-time payment. No subscription. No fluff.</p>

      <div style={{border:'1px solid #e5e7eb',borderRadius:'12px',padding:'32px',marginBottom:'24px'}}>
        <h2 style={{fontSize:'20px',fontWeight:'600'}}>Early Access</h2>
        <p style={{fontSize:'40px',fontWeight:'700',margin:'16px 0'}}>$7</p>
        <p style={{color:'#555',marginBottom:'24px'}}>One-time payment</p>
        <ul style={{listStyle:'none',padding:0,color:'#333'}}>
          <li style={{marginBottom:'12px'}}>✓ 1 fully designed case study page</li>
          <li style={{marginBottom:'12px'}}>✓ Shareable public URL</li>
          <li style={{marginBottom:'12px'}}>✓ PDF export</li>
          <li style={{marginBottom:'12px'}}>✓ Built from your real GitHub + build posts</li>
        </ul>
      </div>

      <div style={{border:'1px solid #e5e7eb',borderRadius:'12px',padding:'32px'}}>
        <h2 style={{fontSize:'20px',fontWeight:'600'}}>Builder Pack</h2>
        <p style={{fontSize:'40px',fontWeight:'700',margin:'16px 0'}}>$19</p>
        <p style={{color:'#555',marginBottom:'24px'}}>One-time payment</p>
        <ul style={{listStyle:'none',padding:0,color:'#333'}}>
          <li style={{marginBottom:'12px'}}>✓ 5 case studies</li>
          <li style={{marginBottom:'12px'}}>✓ Custom subdomain</li>
          <li style={{marginBottom:'12px'}}>✓ Priority generation</li>
          <li style={{marginBottom:'12px'}}>✓ Everything in Early Access</li>
        </ul>
      </div>

      <p style={{marginTop:'32px',fontSize:'14px',color:'#888'}}>
        Price increases to $9 / $29 after early access period ends.
      </p>
    </main>
  )
}
