import { RevealBlock } from '../hooks/useReveal'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function MapPlaceholder() {
  return (
    <div role="img" aria-label="Restaurant location – No 42 Mihindu Mawatha, Kurunegala" className="map-box">
      <div className="map-grid"/>
      {[140,92,52].map((s,i)=>(
        <div key={i} className="map-ring" style={{
          width:s,height:s,
          animationDelay:`${i*.55}s`,
          animationDuration:`${2+i*.6}s`,
        }}/>
      ))}
      <div className="map-pin-group">
        <div className="map-dot"/>
        <p className="map-name">Asliya Kallista</p>
        <p className="map-addr">No 42 Mihindu Mawatha, Kurunegala</p>
        <a href="https://maps.google.com/?q=No+42+Mihindu+Mawatha+Kurunegala"
           target="_blank" rel="noopener noreferrer" className="map-link">
          Open in Google Maps ↗
        </a>
      </div>
      <div className="map-fade"/>

      <style>{`
        .map-box{
          height:clamp(200px,22vw,300px);
          background:linear-gradient(145deg,var(--bg-1) 0%,var(--bg-2) 100%);
          position:relative;overflow:hidden;
          display:flex;align-items:center;justify-content:center;
        }
        .map-grid{
          position:absolute;inset:0;
          background-image:
            linear-gradient(rgba(200,169,110,.05) 1px,transparent 1px),
            linear-gradient(90deg,rgba(200,169,110,.05) 1px,transparent 1px);
          background-size:44px 44px;
        }
        .map-ring{
          position:absolute;border:1px solid rgba(200,169,110,.12);border-radius:50%;
          animation:rExp 2.4s ease-out infinite;
        }
        @keyframes rExp{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.8);opacity:0}}
        .map-pin-group{position:relative;z-index:2;text-align:center}
        .map-dot{
          width:13px;height:13px;background:var(--gold);border-radius:50%;
          margin:0 auto 12px;
          box-shadow:0 0 0 6px rgba(200,169,110,.18),0 0 0 12px rgba(200,169,110,.08);
          animation:mapPing 2.4s ease-in-out infinite;
        }
        @keyframes mapPing{0%,100%{box-shadow:0 0 0 6px rgba(200,169,110,.18),0 0 0 12px rgba(200,169,110,.08)}50%{box-shadow:0 0 0 10px rgba(200,169,110,.1),0 0 0 20px rgba(200,169,110,.04)}}
        .map-name{font-family:var(--font-display);font-size:clamp(15px,2vw,18px);font-weight:400;color:var(--text-primary)}
        .map-addr{font-family:var(--font-body);font-size:11px;color:var(--text-muted);letter-spacing:.06em;margin-top:4px}
        .map-link{
          display:inline-block;margin-top:10px;
          font-family:var(--font-body);font-size:10px;letter-spacing:.15em;
          color:var(--gold);text-decoration:none;cursor:none;
          border-bottom:1px solid rgba(200,169,110,.3);transition:border-color .25s;
        }
        .map-link:hover{border-color:var(--gold)}
        .map-fade{position:absolute;inset:0;background:radial-gradient(ellipse 68% 68% at center,transparent 28%,var(--bg-1) 100%);pointer-events:none}
      `}</style>
    </div>
  )
}

function InfoRow({icon,label,children}) {
  return (
    <div className="ir">
      <div className="ir-icon">{icon}</div>
      <div>
        <p className="ir-label">{label}</p>
        <div className="ir-val">{children}</div>
      </div>
    </div>
  )
}

export default function LocationSection() {
  return (
    <section id="location" aria-label="Location and hours" className="loc-sec">
      <MapPlaceholder/>
      <div className="loc-cards">
        {/* Contact */}
        <RevealBlock className="loc-card" style={{borderRight:'1px solid rgba(200,169,110,.1)'}}>
          <div className="sec-label"><div className="sec-label-line"/>Find Us</div>
          <InfoRow icon="📍" label="Address">
            <span>No 42 Mihindu Mawatha<br/>Kurunegala 60000, Sri Lanka</span>
          </InfoRow>
          <InfoRow icon="📞" label="Reservations">
            <a href="tel:+94772105050" className="ir-link">+94 77 210 5050</a>
            <br/>
            <a href="tel:+94372229046" className="ir-link">+94 37 222 9046</a>
          </InfoRow>
          <InfoRow icon="💬" label="WhatsApp">
            <a href="https://wa.me/94772105050?text=Hi!%20I'd%20like%20to%20book%20a%20table%20at%20Asliya%20Kallista."
               target="_blank" rel="noopener noreferrer" className="ir-link">
              Message us on WhatsApp
            </a>
          </InfoRow>
          <InfoRow icon="📘" label="Social">
            <a href="https://www.facebook.com/p/Asliya-Kallista-Restaurant-Cafe-61575139580372/"
               target="_blank" rel="noopener noreferrer" className="ir-link">Facebook Page</a>
            {' · '}
            <a href="https://www.instagram.com/asliya_kallista/"
               target="_blank" rel="noopener noreferrer" className="ir-link">Instagram</a>
          </InfoRow>
        </RevealBlock>

        {/* Hours */}
        <RevealBlock delay={100} className="loc-card" style={{background:'var(--bg-1)'}}>
          <div className="sec-label"><div className="sec-label-line"/>Opening Hours</div>
          <div className="open-indicator">
            <span className="open-dot"/>
            <span className="open-text">Open Every Day</span>
          </div>
          <div className="hours-grid">
            {DAYS.map(d=>(
              <div key={d} className="hours-cell">
                <p className="hours-day">{d}</p>
                <p className="hours-time">10:30 AM – 12:00 AM</p>
              </div>
            ))}
            <div className="hours-cell hours-cell-gold">
              <p className="hours-day" style={{color:'var(--gold)'}}>Kitchen Closes</p>
              <p className="hours-time">11:30 PM</p>
            </div>
          </div>
        </RevealBlock>
      </div>

      <style>{`
        .loc-sec{background:var(--bg-0)}
        .loc-cards{
          display:grid;grid-template-columns:1fr 1fr;
          max-width:var(--max-w);margin:0 auto;
        }
        .loc-card{padding:clamp(32px,5vw,64px) clamp(20px,5.5vw,64px)}
        .sec-label{display:flex;align-items:center;gap:14px;font-family:var(--font-body);
                   font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:var(--gold);margin-bottom:32px}
        .sec-label-line{width:36px;height:1px;background:var(--gold)}
        .ir{display:flex;gap:16px;margin-bottom:24px;align-items:flex-start}
        .ir-icon{
          width:38px;height:38px;flex-shrink:0;
          border:1px solid rgba(200,169,110,.22);
          display:flex;align-items:center;justify-content:center;font-size:15px;
        }
        .ir-label{font-family:var(--font-body);font-size:9px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);margin-bottom:5px}
        .ir-val{font-family:var(--font-body);font-size:clamp(13px,1.3vw,15px);color:var(--text-secondary);font-weight:300;line-height:1.6}
        .ir-link{color:var(--text-secondary);text-decoration:none;cursor:none;transition:color .25s}
        .ir-link:hover{color:var(--gold-light)}
        .open-indicator{display:flex;align-items:center;gap:10px;margin-bottom:22px}
        .open-dot{width:8px;height:8px;border-radius:50%;background:#4CAF7D;
                  box-shadow:0 0 8px rgba(76,175,125,.6);animation:blink 2s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
        .open-text{font-family:var(--font-body);font-size:12px;color:#4CAF7D;letter-spacing:.1em}
        .hours-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(200,169,110,.1)}
        .hours-cell{background:var(--bg-2);padding:13px 17px}
        .hours-cell-gold{background:rgba(200,169,110,.06)!important}
        .hours-day{font-family:var(--font-body);font-size:10px;letter-spacing:.08em;color:var(--text-muted);margin-bottom:3px}
        .hours-time{font-family:var(--font-body);font-size:13px;color:var(--text-primary);font-weight:300}
        @media(max-width:768px){.loc-cards{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}