export default function TermsPage() {
  return (
    <main style={{maxWidth:'640px',margin:'0 auto',padding:'60px 24px',fontFamily:'system-ui',color:'#111'}}>
      <h1 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Terms of Service</h1>
      <p style={{color:'#888',marginBottom:'40px'}}>Last updated: {new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>1. Service</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Koven ("we", "us") provides a web-based tool that generates case study pages from your GitHub repositories, X posts, and product URLs. Access is provided upon successful payment.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>2. Payment</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>All payments are one-time and processed securely via Paddle. No subscription or recurring charges. Prices are in USD.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>3. Refunds</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>Refunds are available within 48 hours of purchase. Email hi@getkoven.io with your order details.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>4. Your Content</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>You retain full ownership of all content you submit. We only use your GitHub, X, and product data to generate your case study. We do not sell your data.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>5. Acceptable Use</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>You may only use Koven for your own projects. Do not submit data you do not own or have rights to.</p>

      <h2 style={{fontSize:'18px',fontWeight:'600',marginTop:'32px'}}>6. Contact</h2>
      <p style={{color:'#444',lineHeight:'1.7'}}>hi@getkoven.io</p>
    </main>
  )
}
