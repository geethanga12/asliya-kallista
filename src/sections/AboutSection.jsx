import { RevealBlock } from '../hooks/useReveal'
import { STATS } from '../data/content'
import { IMAGES } from '../data/images'

function Img({ src, alt='', style={} }) {
  return (
    <div style={{ overflow:'hidden', position:'relative', ...style }}>
      <img src={src} alt={alt}
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
                 transition:'transform .7s var(--ease-out)' }}
        loading="lazy" decoding="async"
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      />
      <div style={{ position:'absolute', inset:0,
        background:'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.35) 100%)',
        pointerEvents:'none' }}/>
    </div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" aria-label="About Asliya Kallista" className="about-sec">
      <div className="about-inner">
        {/* ── Left: Image mosaic ── */}
        <RevealBlock delay={0} className="mosaic-col">
          <div className="mosaic">
            <Img src={IMAGES.aboutMain} alt="Fine dining table at Asliya Kallista" style={{ gridArea:'main', aspectRatio:'4/5' }}/>
            <Img src={IMAGES.aboutAccent1} alt="Chef plating food" style={{ gridArea:'a1', aspectRatio:'1' }}/>
            <Img src={IMAGES.aboutAccent2} alt="Restaurant ambiance" style={{ gridArea:'a2', aspectRatio:'16/9' }}/>
          </div>
          {/* Corner accent */}
          <div className="mosaic-accent-corner"/>
        </RevealBlock>

        {/* ── Right: Text ── */}
        <RevealBlock delay={140} className="about-text-col">
          <div className="sec-label">
            <div className="sec-label-line"/>Our Story
          </div>
          <h2 className="about-title">
            A Culinary <em className="gold-em">Journey</em>
          </h2>
          <div className="gold-rule"/>
          <p className="about-p">
            Nestled in the heart of Kurunegala, Asliya Kallista brings bold flavours
            and refined aesthetics to Sri Lanka's dining scene. Our kitchen draws on
            pan-Asian traditions while honouring local ingredients and heritage recipes
            passed down through generations.
          </p>
          <p className="about-p">
            From our legendary Bacon Special to the slow-braised Glazed Pork Belly and
            fragrant Royal Dum Biryani — every dish is a celebration of craft. We also
            host BYOB events, birthday parties, high teas and corporate gatherings in
            our spacious, warm interiors.
          </p>

          {/* Stats */}
          <RevealBlock delay={200}>
            <div className="stats-grid">
              {STATS.map((s,i) => (
                <RevealBlock key={s.num} delay={220+i*55} style={{background:'var(--bg-1)',padding:'clamp(14px,2vw,22px) 10px',textAlign:'center'}}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-lbl">{s.label}</div>
                </RevealBlock>
              ))}
            </div>
          </RevealBlock>
        </RevealBlock>
      </div>

      <style>{`
        .about-sec{padding:clamp(72px,10vw,128px) clamp(20px,5.5vw,80px)}
        .about-inner{
          display:grid;grid-template-columns:1fr 1fr;
          gap:clamp(40px,6vw,96px);align-items:center;
          max-width:var(--max-w);margin:0 auto;
        }
        .mosaic-col{position:relative}
        .mosaic{
          display:grid;
          grid-template-areas:"main a1" "main a2";
          grid-template-columns:2fr 1fr;
          grid-template-rows:1fr auto;
          gap:4px;
        }
        .mosaic-accent-corner{
          position:absolute;top:-14px;left:-14px;
          width:72px;height:72px;
          border-left:1px solid rgba(200,169,110,.3);
          border-top:1px solid rgba(200,169,110,.3);
          pointer-events:none;
        }
        .about-text-col{display:flex;flex-direction:column;justify-content:center}
        .sec-label{
          display:flex;align-items:center;gap:14px;
          font-family:var(--font-body);font-size:10px;letter-spacing:.4em;
          text-transform:uppercase;color:var(--gold);margin-bottom:18px;
        }
        .sec-label-line{width:36px;height:1px;background:var(--gold)}
        .about-title{
          font-family:var(--font-display);
          font-size:clamp(34px,4.5vw,58px);font-weight:300;line-height:1.1;
        }
        .gold-em{
          font-style:italic;
          background:linear-gradient(118deg,var(--gold) 0%,var(--gold-light) 50%,var(--gold) 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }
        .gold-rule{width:52px;height:1px;background:var(--gold);margin:24px 0}
        .about-p{
          font-family:var(--font-body);font-size:clamp(13px,1.3vw,15px);
          color:var(--text-secondary);line-height:1.8;font-weight:300;margin-bottom:14px;
        }
        .stats-grid{
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:1px;background:rgba(200,169,110,.12);margin-top:32px;
        }
        .stat-num{
          font-family:var(--font-display);font-size:clamp(26px,3vw,36px);font-weight:300;
          background:linear-gradient(118deg,var(--gold),var(--gold-light));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          line-height:1;
        }
        .stat-lbl{
          font-family:var(--font-body);font-size:9px;letter-spacing:.2em;
          text-transform:uppercase;color:var(--text-muted);margin-top:5px;
        }
        @media(max-width:900px){
          .about-inner{grid-template-columns:1fr!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
        }
        @media(max-width:460px){
          .mosaic{grid-template-areas:"main" "a1" "a2";grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  )
}