import { useState, useCallback } from 'react'
import { MENU_TABS, MENU_DATA } from '../data/content'
import { RevealBlock } from '../hooks/useReveal'

function Steam() {
  return (
    <div aria-hidden="true" className="steam-wrap">
      {[0,1,2].map(i=><div key={i} className={`sv sv${i}`}/>)}
      <style>{`
        .steam-wrap{position:absolute;top:10%;left:50%;transform:translateX(-50%);display:flex;gap:14px;z-index:4;pointer-events:none}
        .sv{width:2px;border-radius:3px;background:linear-gradient(to top,rgba(255,255,255,.45) 0%,transparent 100%);animation:sv 2.4s ease-in-out infinite}
        .sv0{height:46px;animation-delay:0s}
        .sv1{height:64px;animation-delay:.4s;width:3px}
        .sv2{height:50px;animation-delay:.8s}
        @keyframes sv{0%{opacity:0;transform:translateY(0) scaleX(1)}40%{opacity:.8}100%{opacity:0;transform:translateY(-44px) scaleX(2.2) skewX(10deg)}}
      `}</style>
    </div>
  )
}

function MenuCard({ item, featured, index }) {
  const [hov, setHov] = useState(false)

  return (
    <RevealBlock delay={index*80} style={{gridColumn:featured?'span 2':'span 1',minWidth:0}} className="mc-wrap">
      <article
        onMouseEnter={()=>setHov(true)}
        onMouseLeave={()=>setHov(false)}
        aria-label={item.name}
        className={`mc ${hov?'mc-hov':''}`}
      >
        {/* Image */}
        <div className={`mc-img-box ${featured?'mc-img-feat':''}`}>
          <img
            src={item.img}
            alt={item.name}
            className="mc-img"
            loading="lazy"
            decoding="async"
            style={{transform: hov?'scale(1.07)':'scale(1)'}}
          />
          {/* Overlay gradients */}
          <div className="mc-img-gradient"/>
          <Steam/>
          {/* Hover CTA */}
          <div className={`mc-overlay ${hov?'mc-overlay-vis':''}`}>
            <button className="mc-order-btn" aria-label={`Quick order ${item.name}`}>
              Quick Order
            </button>
          </div>
          {/* Badge */}
          {item.badge && <div className="mc-badge">{item.badge}</div>}
        </div>

        {/* Body */}
        <div className="mc-body">
          <p className="mc-tag">{item.tag}</p>
          <h3 className="mc-name">{item.name}</h3>
          <p className="mc-desc">{item.desc}</p>
          <div className="mc-footer">
            <span className="mc-price">{item.price}</span>
          </div>
        </div>
      </article>

      <style>{`
        .mc-wrap{min-width:0}
        @media(max-width:640px){.mc-wrap{grid-column:span 1!important}}

        .mc{background:var(--bg-3);border:1px solid transparent;overflow:hidden;
            transition:transform .4s var(--ease-out),border-color .3s,box-shadow .4s;cursor:none}
        .mc-hov{transform:translateY(-5px);border-color:rgba(200,169,110,.25);
                box-shadow:0 28px 64px rgba(0,0,0,.55),0 0 0 1px rgba(200,169,110,.08)}

        .mc-img-box{aspect-ratio:4/3;position:relative;overflow:hidden}
        .mc-img-feat{aspect-ratio:21/8}
        .mc-img{width:100%;height:100%;object-fit:cover;display:block;
                transition:transform .65s var(--ease-out)}
        .mc-img-gradient{position:absolute;inset:0;
          background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.15) 40%,transparent 70%);
          pointer-events:none;z-index:2}

        .mc-overlay{position:absolute;inset:0;z-index:5;
          background:linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.25) 55%,transparent 100%);
          opacity:0;transition:opacity .35s;
          display:flex;align-items:flex-end;padding:20px}
        .mc-overlay-vis{opacity:1}

        .mc-order-btn{
          padding:9px 22px;background:var(--gold);border:none;color:#080603;
          font-family:var(--font-body);font-size:10px;letter-spacing:.22em;
          text-transform:uppercase;font-weight:600;cursor:none;
          transform:translateY(${hov?'0':'8px'});transition:transform .3s .06s;
        }

        .mc-badge{
          position:absolute;top:14px;right:14px;z-index:6;
          padding:4px 12px;
          background:rgba(8,7,5,.82);border:1px solid rgba(200,169,110,.28);
          backdrop-filter:blur(8px);
          font-family:var(--font-body);font-size:9px;letter-spacing:.22em;
          text-transform:uppercase;color:var(--gold);
        }

        .mc-body{padding:clamp(16px,2.2vw,26px)}
        .mc-tag{font-family:var(--font-body);font-size:9px;letter-spacing:.32em;
                text-transform:uppercase;color:var(--gold);margin-bottom:7px}
        .mc-name{font-family:var(--font-display);font-size:clamp(18px,2.2vw,24px);
                 font-weight:400;line-height:1.15;margin-bottom:9px}
        .mc-desc{font-family:var(--font-body);font-size:12px;line-height:1.65;
                 color:var(--text-secondary);font-weight:300}
        .mc-footer{display:flex;justify-content:space-between;align-items:center;
                   margin-top:18px;padding-top:15px;border-top:1px solid rgba(200,169,110,.1)}
        .mc-price{
          font-family:var(--font-display);font-size:clamp(20px,2.4vw,26px);font-weight:300;
          background:linear-gradient(118deg,var(--gold),var(--gold-light));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
      `}</style>
    </RevealBlock>
  )
}

export default function MenuSection() {
  const [active, setActive] = useState('pizzas')
  const go = useCallback(k => setActive(k), [])

  return (
    <section id="menu" aria-label="Menu" className="menu-sec">
      <div className="menu-inner">
        <RevealBlock>
          <div className="sec-label"><div className="sec-label-line"/>Culinary Creations</div>
          <h2 className="sec-title">The <em className="gold-em">Menu</em></h2>
        </RevealBlock>

        <RevealBlock delay={80}>
          <div role="tablist" aria-label="Menu categories" className="menu-tabs-row">
            {MENU_TABS.map(({key,label})=>{
              const a = active===key
              return (
                <button key={key} role="tab" aria-selected={a}
                  onClick={()=>go(key)}
                  className={`menu-tab ${a?'menu-tab-a':''}`}>
                  {label}
                </button>
              )
            })}
          </div>
        </RevealBlock>

        <div role="tabpanel" id={`panel-${active}`} key={active} className="menu-grid">
          {MENU_DATA[active].map((item,i)=>(
            <MenuCard key={item.id} item={item} featured={!!item.featured} index={i}/>
          ))}
        </div>
      </div>

      <style>{`
        .menu-sec{background:var(--bg-1);padding:clamp(72px,10vw,128px) clamp(20px,5.5vw,80px)}
        .menu-inner{max-width:var(--max-w);margin:0 auto}
        .sec-label{display:flex;align-items:center;gap:14px;font-family:var(--font-body);
                   font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
        .sec-label-line{width:36px;height:1px;background:var(--gold)}
        .sec-title{font-family:var(--font-display);font-size:clamp(34px,4.5vw,58px);font-weight:300;line-height:1.1}
        .gold-em{font-style:italic;background:linear-gradient(118deg,var(--gold) 0%,var(--gold-light) 50%,var(--gold) 100%);
                 -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .menu-tabs-row{display:flex;border-bottom:1px solid rgba(200,169,110,.14);margin-top:40px;margin-bottom:44px;
                       overflow-x:auto;scrollbar-width:none}
        .menu-tabs-row::-webkit-scrollbar{display:none}
        .menu-tab{
          padding:13px clamp(14px,2.2vw,30px);background:none;border:none;
          border-bottom:2px solid transparent;margin-bottom:-1px;
          font-family:var(--font-body);font-size:11px;letter-spacing:.2em;text-transform:uppercase;
          color:var(--text-muted);cursor:none;white-space:nowrap;
          transition:color .25s,border-color .25s;
        }
        .menu-tab:hover{color:var(--text-primary)}
        .menu-tab-a{color:var(--gold)!important;border-bottom-color:var(--gold)!important}
        .menu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:3px}
        @media(max-width:640px){.menu-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  )
}
