import { useRef } from 'react'
import { GALLERY_ITEMS } from '../data/content'
import { RevealBlock } from '../hooks/useReveal'

function GalleryCard({ item }) {
  return (
    <article
      role="listitem"
      aria-label={item.label}
      className="gc"
      style={{ flex:`0 0 clamp(240px,${item.w/13.5}vw,${item.w}px)` }}
    >
      <div className="gc-img-wrap">
        <img src={item.img} alt={item.label} className="gc-img" loading="lazy" decoding="async"/>
        <div className="gc-vignette"/>
      </div>
      <div className="gc-caption">
        <p className="gc-cap-label">{item.label}</p>
        <p className="gc-cap-text">{item.caption}</p>
      </div>

      <style>{`
        .gc{
          flex-shrink:0;height:clamp(240px,28vw,380px);
          position:relative;overflow:hidden;scroll-snap-align:start;cursor:none;
        }
        .gc-img-wrap{width:100%;height:100%;overflow:hidden}
        .gc-img{
          width:100%;height:100%;object-fit:cover;display:block;
          transition:transform .65s var(--ease-out);filter:brightness(.88) saturate(.9);
        }
        .gc:hover .gc-img{transform:scale(1.06);filter:brightness(1) saturate(1.05)}
        .gc-vignette{
          position:absolute;inset:0;
          background:radial-gradient(ellipse 78% 78% at center,transparent 32%,rgba(0,0,0,.45) 100%);
          pointer-events:none;
        }
        .gc-caption{
          position:absolute;bottom:0;left:0;right:0;
          padding:28px 22px 22px;
          background:linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 100%);
          transform:translateY(100%);
          transition:transform .4s var(--ease-out);
        }
        .gc:hover .gc-caption{transform:translateY(0)}
        .gc-cap-label{
          font-family:var(--font-body);font-size:9px;letter-spacing:.32em;
          text-transform:uppercase;color:var(--gold);margin-bottom:5px;
        }
        .gc-cap-text{
          font-family:var(--font-body);font-size:13px;
          color:rgba(240,234,216,.85);font-weight:300;
        }
        @media(max-width:640px){
          .gc{height:clamp(200px,55vw,300px)!important;flex:0 0 clamp(220px,72vw,300px)!important}
        }
      `}</style>
    </article>
  )
}

export default function GallerySection() {
  const trackRef = useRef(null)
  const drag     = useRef(false)
  const sx       = useRef(0)
  const sl       = useRef(0)

  const down  = e => { drag.current=true; sx.current=(e.touches?.[0]??e).pageX-trackRef.current.offsetLeft; sl.current=trackRef.current.scrollLeft; if(trackRef.current) trackRef.current.style.cursor='grabbing' }
  const move  = e => { if(!drag.current) return; const x=(e.touches?.[0]??e).pageX-trackRef.current.offsetLeft; trackRef.current.scrollLeft=sl.current-(x-sx.current)*1.4 }
  const up    = () => { drag.current=false; if(trackRef.current) trackRef.current.style.cursor='grab' }

  return (
    <section id="experience" aria-label="The Asliya Kallista Experience" className="gal-sec">
      <div className="gal-header">
        <RevealBlock>
          <div className="sec-label"><div className="sec-label-line"/>The Atmosphere</div>
          <h2 className="sec-title">The <em className="gold-em">Experience</em></h2>
          <p className="gal-hint">← Drag to explore →</p>
        </RevealBlock>
      </div>

      <div
        ref={trackRef}
        role="list"
        aria-label="Restaurant gallery"
        className="gal-track"
        onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
        onTouchStart={down} onTouchMove={move} onTouchEnd={up}
      >
        {GALLERY_ITEMS.map(item=><GalleryCard key={item.id} item={item}/>)}
      </div>

      <style>{`
        .gal-sec{padding:clamp(72px,10vw,120px) 0;overflow:hidden}
        .gal-header{padding:0 clamp(20px,5.5vw,80px);margin-bottom:48px}
        .sec-label{display:flex;align-items:center;gap:14px;font-family:var(--font-body);
                   font-size:10px;letter-spacing:.4em;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
        .sec-label-line{width:36px;height:1px;background:var(--gold)}
        .sec-title{font-family:var(--font-display);font-size:clamp(34px,4.5vw,58px);font-weight:300;line-height:1.1}
        .gold-em{font-style:italic;background:linear-gradient(118deg,var(--gold) 0%,var(--gold-light) 50%,var(--gold) 100%);
                 -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .gal-hint{margin-top:12px;font-family:var(--font-body);font-size:12px;color:var(--text-muted);letter-spacing:.08em}
        .gal-track{
          display:flex;gap:14px;
          padding:0 clamp(20px,5.5vw,80px);
          overflow-x:auto;scrollbar-width:none;
          scroll-snap-type:x mandatory;cursor:grab;
          -webkit-overflow-scrolling:touch;
        }
        .gal-track::-webkit-scrollbar{display:none}
      `}</style>
    </section>
  )
}