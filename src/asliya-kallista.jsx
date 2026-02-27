import { useState, useEffect, useRef, useCallback } from "react";

const goldGradient = "linear-gradient(135deg, #C9A84C 0%, #F5D78A 50%, #C9A84C 100%)";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  :root {
    --gold: #C9A84C;
    --gold-light: #F5D78A;
    --gold-dark: #8B6914;
    --charcoal: #1A1A1A;
    --charcoal-mid: #232323;
    --charcoal-light: #2D2D2D;
    --surface: #252520;
    --surface2: #2E2E28;
    --cream: #F5EFE0;
    --text-muted: #888880;
    --wood: #3D2B1F;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--charcoal);
    color: var(--cream);
    font-family: 'Josefin Sans', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  .cursor {
    width: 12px; height: 12px;
    background: var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.2s;
    mix-blend-mode: difference;
  }

  .cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.4s ease, opacity 0.3s;
    opacity: 0.5;
  }

  .grain {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-size: 200px 200px;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 20px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s ease;
  }
  nav.scrolled {
    background: rgba(18,18,16,0.92);
    backdrop-filter: blur(20px);
    padding: 14px 60px;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 2px;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .nav-logo span {
    font-style: italic;
    font-weight: 300;
    font-size: 14px;
    display: block;
    letter-spacing: 4px;
    margin-top: -4px;
  }
  .nav-links { display: flex; gap: 36px; align-items: center; }
  .nav-links a {
    color: rgba(245,239,224,0.7);
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .nav-links a:hover { color: var(--gold-light); }
  .nav-links a:hover::after { transform: scaleX(1); }
  .btn-book {
    padding: 10px 24px;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Josefin Sans', sans-serif;
    background: transparent;
    cursor: none;
    transition: all 0.3s;
  }
  .btn-book:hover {
    background: var(--gold);
    color: var(--charcoal);
  }

  /* HERO */
  .hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 120%, rgba(201,168,76,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%),
      linear-gradient(180deg, #0D0D0B 0%, #1A1A14 40%, #0F0F0C 100%);
  }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 70% 70% at center, black 30%, transparent 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 900px;
    padding: 0 24px;
  }
  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 6px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeUp 0.8s 0.3s forwards;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 300;
    line-height: 1.08;
    letter-spacing: -1px;
    opacity: 0;
    animation: fadeUp 0.9s 0.5s forwards;
  }
  .hero-title em {
    font-style: italic;
    font-weight: 400;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-subtitle {
    font-size: 14px;
    color: rgba(245,239,224,0.55);
    letter-spacing: 1.5px;
    margin-top: 24px;
    font-weight: 300;
    opacity: 0;
    animation: fadeUp 0.9s 0.7s forwards;
  }
  .hero-cta {
    margin-top: 52px;
    display: flex;
    gap: 20px;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.9s 0.9s forwards;
  }
  .btn-primary {
    padding: 16px 48px;
    background: var(--gold);
    color: #0D0D0B;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    cursor: none;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.2);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }
  .btn-primary:hover::before { transform: translateX(0); }
  .btn-secondary {
    padding: 16px 48px;
    border: 1px solid rgba(201,168,76,0.4);
    color: rgba(245,239,224,0.8);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: transparent;
    cursor: none;
    transition: all 0.3s;
  }
  .btn-secondary:hover {
    border-color: var(--gold);
    color: var(--gold);
  }
  .hero-scroll {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    opacity: 0;
    animation: fadeIn 1s 1.4s forwards;
    color: rgba(245,239,224,0.4);
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s infinite;
  }

  /* 3D PIZZA CANVAS */
  .hero-3d {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 460px;
    height: 460px;
    opacity: 0;
    animation: fadeIn 1.2s 1s forwards;
  }
  #pizza-canvas { width: 100%; height: 100%; }

  /* STRIP */
  .marquee-strip {
    background: var(--gold);
    padding: 14px 0;
    overflow: hidden;
    white-space: nowrap;
  }
  .marquee-inner {
    display: inline-flex;
    animation: marquee 20s linear infinite;
    gap: 0;
  }
  .marquee-item {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #0D0D0B;
    font-weight: 600;
    padding: 0 40px;
  }
  .marquee-dot {
    color: rgba(13,13,11,0.4);
    padding: 0 8px;
  }

  /* SECTION COMMONS */
  section { padding: 120px 60px; }
  .section-label {
    font-size: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 40px;
    height: 1px;
    background: var(--gold);
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 300;
    line-height: 1.1;
  }
  .section-title em {
    font-style: italic;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ABOUT / CONCEPT */
  .concept-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  .concept-visual {
    position: relative;
    aspect-ratio: 4/5;
  }
  .concept-img-main {
    width: 78%;
    aspect-ratio: 4/5;
    background: linear-gradient(160deg, #2A2416 0%, #3D2B1F 40%, #1A1209 100%);
    position: relative;
    overflow: hidden;
  }
  .concept-img-accent {
    position: absolute;
    bottom: -30px;
    right: 0;
    width: 55%;
    aspect-ratio: 1;
    background: linear-gradient(135deg, #1E1A0F 0%, #2D2418 100%);
    border: 6px solid var(--charcoal);
    overflow: hidden;
  }
  .food-emoji-display {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 100px;
    filter: drop-shadow(0 20px 40px rgba(0,0,0,0.8));
  }
  .concept-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(201,168,76,0.15);
    margin-top: 48px;
  }
  .stat-item {
    background: var(--charcoal);
    padding: 28px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px;
    font-weight: 300;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }
  .stat-label {
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--text-muted);
    text-transform: uppercase;
    margin-top: 6px;
  }
  .concept-text p {
    color: rgba(245,239,224,0.6);
    line-height: 1.8;
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 16px;
  }
  .gold-divider {
    width: 60px;
    height: 1px;
    background: var(--gold);
    margin: 32px 0;
  }

  /* MENU SECTION */
  .menu-section { background: #141412; }
  .menu-tabs {
    display: flex;
    gap: 0;
    margin: 48px 0 52px;
    border-bottom: 1px solid rgba(201,168,76,0.15);
    max-width: 1200px;
    margin: 48px auto 0;
  }
  .menu-tab {
    padding: 16px 32px;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    cursor: none;
    transition: all 0.3s;
    font-family: 'Josefin Sans', sans-serif;
  }
  .menu-tab.active {
    color: var(--gold);
    border-bottom-color: var(--gold);
  }
  .menu-tab:hover { color: var(--cream); }
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2px;
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 48px;
  }
  .menu-card {
    background: var(--surface2);
    position: relative;
    overflow: hidden;
    group: true;
    cursor: none;
    transition: transform 0.4s ease;
  }
  .menu-card:hover { transform: translateY(-4px); z-index: 2; }
  .menu-card:hover .card-overlay { opacity: 1; }
  .menu-card:hover .card-img-inner { transform: scale(1.06); }
  .menu-card-featured {
    grid-column: span 2;
  }
  .card-img {
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;
  }
  .menu-card-featured .card-img { aspect-ratio: 16/7; }
  .card-img-inner {
    width: 100%; height: 100%;
    transition: transform 0.6s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .food-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
  }
  .food-icon {
    font-size: 120px;
    filter: drop-shadow(0 20px 60px rgba(0,0,0,0.9));
    position: relative;
    z-index: 1;
  }
  .menu-card-featured .food-icon { font-size: 160px; }
  .steam {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 16px;
    z-index: 2;
  }
  .steam-line {
    width: 3px;
    height: 50px;
    background: linear-gradient(to top, rgba(255,255,255,0.3), transparent);
    border-radius: 2px;
    animation: steamAnim 2s ease-in-out infinite;
  }
  .steam-line:nth-child(2) { animation-delay: 0.4s; height: 70px; }
  .steam-line:nth-child(3) { animation-delay: 0.8s; }
  .card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
    display: flex;
    align-items: flex-end;
    padding: 24px;
  }
  .card-overlay-btn {
    padding: 10px 24px;
    background: var(--gold);
    color: #0D0D0B;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 600;
    border: none;
    cursor: none;
  }
  .card-body { padding: 24px; }
  .card-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  .card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .card-desc {
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.6;
    font-weight: 300;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }
  .card-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 400;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .card-price span {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
  }
  .card-badge {
    padding: 4px 12px;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* GALLERY */
  .gallery-section { padding: 100px 0; overflow: hidden; }
  .gallery-header { padding: 0 60px; margin-bottom: 60px; }
  .gallery-track {
    display: flex;
    gap: 20px;
    padding: 0 60px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    cursor: grab;
  }
  .gallery-track::-webkit-scrollbar { display: none; }
  .gallery-track:active { cursor: grabbing; }
  .gallery-item {
    flex-shrink: 0;
    scroll-snap-align: start;
    position: relative;
    overflow: hidden;
  }
  .gallery-item:nth-child(1) { width: 500px; height: 380px; }
  .gallery-item:nth-child(2) { width: 340px; height: 380px; }
  .gallery-item:nth-child(3) { width: 420px; height: 380px; }
  .gallery-item:nth-child(4) { width: 300px; height: 380px; }
  .gallery-item:nth-child(5) { width: 460px; height: 380px; }
  .gallery-img {
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    transition: transform 0.6s ease;
    position: relative;
  }
  .gallery-item:hover .gallery-img { transform: scale(1.05); }
  .gallery-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 24px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    font-size: 13px;
    letter-spacing: 1px;
    color: rgba(245,239,224,0.8);
    transform: translateY(100%);
    transition: transform 0.4s ease;
  }
  .gallery-item:hover .gallery-caption { transform: translateY(0); }

  /* INFO SECTION */
  .info-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .info-card {
    background: var(--surface);
    padding: 60px;
  }
  .info-card.dark { background: #0F0F0D; }
  .info-row {
    display: flex;
    gap: 20px;
    margin-bottom: 28px;
    align-items: flex-start;
  }
  .info-icon {
    width: 40px; height: 40px;
    border: 1px solid rgba(201,168,76,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .info-label {
    font-size: 10px;
    letter-spacing: 3px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .info-value {
    font-size: 15px;
    color: rgba(245,239,224,0.8);
    line-height: 1.6;
    font-weight: 300;
  }
  .hours-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: rgba(201,168,76,0.1);
    margin-top: 12px;
  }
  .hours-item {
    background: var(--charcoal);
    padding: 16px 20px;
  }
  .hours-day { font-size: 11px; letter-spacing: 1px; color: var(--text-muted); }
  .hours-time { font-size: 14px; color: var(--cream); margin-top: 4px; }

  /* MAP PLACEHOLDER */
  .map-placeholder {
    background: linear-gradient(135deg, #1A1A14 0%, #252520 100%);
    height: 300px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .map-pin {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .map-pin-dot {
    width: 16px; height: 16px;
    background: var(--gold);
    border-radius: 50%;
    box-shadow: 0 0 0 8px rgba(201,168,76,0.2), 0 0 0 16px rgba(201,168,76,0.1);
    animation: pingAnim 2s infinite;
  }
  .map-grid-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* FOOTER */
  footer {
    background: #080807;
    padding: 80px 60px 40px;
    border-top: 1px solid rgba(201,168,76,0.1);
  }
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 80px;
    margin-bottom: 60px;
  }
  .footer-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    background: ${goldGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .footer-brand em { font-style: italic; }
  .footer-desc {
    font-size: 13px;
    color: var(--text-muted);
    line-height: 1.8;
    margin-top: 16px;
    font-weight: 300;
    max-width: 280px;
  }
  .footer-col-title {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 24px;
  }
  .footer-links { list-style: none; }
  .footer-links li {
    margin-bottom: 12px;
    font-size: 13px;
    color: var(--text-muted);
    cursor: none;
    transition: color 0.3s;
    font-weight: 300;
  }
  .footer-links li:hover { color: var(--cream); }
  .footer-bottom {
    padding-top: 32px;
    border-top: 1px solid rgba(245,239,224,0.06);
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: rgba(245,239,224,0.25);
    letter-spacing: 1px;
  }

  /* FAB */
  .fab {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 500;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
  .fab-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    background: rgba(13,13,11,0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 10px 18px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s;
    pointer-events: none;
  }
  .fab:hover .fab-label {
    opacity: 1;
    transform: translateX(0);
  }
  .fab-btn {
    width: 60px; height: 60px;
    background: var(--gold);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: none;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s;
  }
  .fab-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.2);
    transform: scale(0);
    border-radius: 50%;
    transition: transform 0.4s ease;
  }
  .fab-btn:hover { transform: scale(1.1); }
  .fab-btn:hover::before { transform: scale(2); }
  .fab-ring {
    position: absolute;
    inset: -8px;
    border: 1px solid var(--gold);
    animation: fabRing 2s infinite;
    opacity: 0;
  }

  /* MODAL */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(8px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.3s ease;
  }
  .modal {
    background: var(--surface);
    max-width: 560px;
    width: 100%;
    padding: 60px;
    position: relative;
    border: 1px solid rgba(201,168,76,0.2);
    animation: slideUp 0.4s ease;
  }
  .modal-close {
    position: absolute;
    top: 24px; right: 24px;
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 24px;
    cursor: none;
    transition: color 0.3s;
    font-family: 'Josefin Sans', sans-serif;
  }
  .modal-close:hover { color: var(--cream); }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    margin-bottom: 8px;
  }
  .modal-subtitle {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 1px;
    margin-bottom: 40px;
  }
  .form-group { margin-bottom: 24px; }
  .form-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
    display: block;
  }
  .form-input {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.15);
    color: var(--cream);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    cursor: none;
  }
  .form-input:focus { border-color: var(--gold); }
  .form-input::placeholder { color: rgba(245,239,224,0.25); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes steamAnim {
    0%, 100% { opacity: 0.3; transform: translateY(0) scaleX(1); }
    50% { opacity: 0.8; transform: translateY(-20px) scaleX(1.5); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 1; transform: scaleY(1); }
    50% { opacity: 0.4; transform: scaleY(0.7); }
  }
  @keyframes pingAnim {
    0% { box-shadow: 0 0 0 8px rgba(201,168,76,0.2), 0 0 0 16px rgba(201,168,76,0.1); }
    100% { box-shadow: 0 0 0 20px rgba(201,168,76,0), 0 0 0 40px rgba(201,168,76,0); }
  }
  @keyframes fabRing {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes rotateFloat {
    0% { transform: rotate(0deg) translateY(0); }
    25% { transform: rotate(10deg) translateY(-10px); }
    50% { transform: rotate(0deg) translateY(-20px); }
    75% { transform: rotate(-10deg) translateY(-10px); }
    100% { transform: rotate(0deg) translateY(0); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    nav.scrolled { padding: 12px 24px; }
    .nav-links { display: none; }
    section { padding: 80px 24px; }
    .hero-title { font-size: clamp(40px, 10vw, 64px); }
    .hero-3d { display: none; }
    .concept-section { grid-template-columns: 1fr; gap: 40px; }
    .menu-grid { grid-template-columns: 1fr; }
    .menu-card-featured { grid-column: span 1; }
    .gallery-item { width: 280px !important; height: 280px !important; }
    .info-section { grid-template-columns: 1fr; }
    .info-card { padding: 40px 24px; }
    footer { padding: 60px 24px 32px; }
    .footer-top { grid-template-columns: 1fr; gap: 40px; }
    .fab { bottom: 24px; right: 24px; }
    .modal { padding: 40px 24px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

const menuData = {
  pizzas: [
    {
      name: "Bacon Special",
      label: "Signature",
      desc: "Crispy premium bacon, mozzarella, caramelized onions, BBQ drizzle on hand-tossed dough",
      price: "Rs. 1,450",
      badge: "Chef's Pick",
      icon: "🍕",
      bg: "linear-gradient(135deg, #2D1A0A 0%, #3D2210 100%)",
      featured: true,
    },
    {
      name: "Margherita Royale",
      label: "Classic",
      desc: "San Marzano tomatoes, fresh buffalo mozzarella, basil oil",
      price: "Rs. 1,200",
      icon: "🍕",
      bg: "linear-gradient(135deg, #1E1A10 0%, #2A2215 100%)",
    },
    {
      name: "Smoked Chicken",
      label: "House Special",
      desc: "House-smoked chicken, jalapeños, gouda, honey sriracha glaze",
      price: "Rs. 1,350",
      badge: "Popular",
      icon: "🍕",
      bg: "linear-gradient(135deg, #1A1210 0%, #2D1E14 100%)",
    },
  ],
  mains: [
    {
      name: "Chicken Pad Thai",
      label: "Fusion",
      desc: "Wok-tossed rice noodles, free-range chicken, tamarind glaze, crushed peanuts",
      price: "Rs. 1,600",
      badge: "Bestseller",
      icon: "🍜",
      bg: "linear-gradient(135deg, #1A1A0A 0%, #2A280A 100%)",
      featured: true,
    },
    {
      name: "Seafood Pad Thai",
      label: "Fusion",
      desc: "Tiger prawns, calamari, egg noodles, lime, fresh herbs, chili oil",
      price: "Rs. 1,800",
      badge: "Premium",
      icon: "🦐",
      bg: "linear-gradient(135deg, #0A1A1A 0%, #0A2028 100%)",
    },
    {
      name: "Royal Biryani",
      label: "Heritage",
      desc: "Aged basmati, slow-cooked lamb, saffron, fried shallots, raita",
      price: "Rs. 1,700",
      icon: "🍛",
      bg: "linear-gradient(135deg, #1A1208 0%, #2A1C08 100%)",
    },
  ],
  specialties: [
    {
      name: "Glazed Pork Belly",
      label: "Signature",
      desc: "48hr sous vide pork, sticky miso glaze, pickled daikon, sesame",
      price: "Rs. 1,900",
      badge: "Award Winning",
      icon: "🥩",
      bg: "linear-gradient(135deg, #1A0A0A 0%, #2A1010 100%)",
      featured: true,
    },
    {
      name: "Mango Fizz",
      label: "Premium Drink",
      desc: "Fresh mango, elderflower, lime, sparkling water, gold leaf garnish",
      price: "Rs. 450",
      icon: "🥭",
      bg: "linear-gradient(135deg, #1A1208 0%, #1A1800 100%)",
    },
    {
      name: "Luxury Cocktails",
      label: "Bar Menu",
      desc: "Curated selection of signature cocktails and premium spirits from Rs. 550",
      price: "From Rs. 550",
      icon: "🍹",
      bg: "linear-gradient(135deg, #0A0A1A 0%, #121228 100%)",
    },
  ],
};

const galleryItems = [
  { emoji: "🪑", label: "The Grand Dining Hall", bg: "linear-gradient(135deg, #1A1408 0%, #2D2210 100%)", caption: "Spacious fine dining atmosphere" },
  { emoji: "🕯️", label: "Evening Ambiance", bg: "linear-gradient(135deg, #0A0808 0%, #1A1010 100%)", caption: "Warm candlelit evenings" },
  { emoji: "🍷", label: "Bar & Lounge", bg: "linear-gradient(135deg, #080A14 0%, #10122A 100%)", caption: "Premium bar selection" },
  { emoji: "🌿", label: "Garden Terrace", bg: "linear-gradient(135deg, #080A08 0%, #101A0A 100%)", caption: "Al fresco dining" },
  { emoji: "👨‍🍳", label: "Open Kitchen", bg: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)", caption: "Watch the magic happen" },
];

export default function AsliyaKallista() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("pizzas");
  const [showModal, setShowModal] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2" });
  const galleryRef = useRef(null);
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      ringRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const animate = () => {
      setRing(prev => ({
        x: prev.x + (ringRef.current.x - prev.x) * 0.12,
        y: prev.y + (ringRef.current.y - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // Gallery drag scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - galleryRef.current.offsetLeft;
    scrollLeft.current = galleryRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - galleryRef.current.offsetLeft;
    galleryRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onMouseUp = () => { isDragging.current = false; };

  const currentMenu = menuData[activeTab];

  return (
    <>
      <style>{styles}</style>
      <div className="grain" />

      {/* Custom Cursor */}
      <div className="cursor" style={{ left: cursor.x - 6, top: cursor.y - 6 }} />
      <div className="cursor-ring" style={{ left: ring.x - 18, top: ring.y - 18 }} />

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          Asliya Kallista
          <span>Restaurant & Café</span>
        </div>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#experience">Experience</a>
          <a href="#location">Location</a>
          <button className="btn-book" onClick={() => setShowModal(true)}>Reserve</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        
        <div className="hero-3d">
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ animation: "rotateFloat 6s ease-in-out infinite", fontSize: "240px", filter: "drop-shadow(0 30px 80px rgba(201,168,76,0.3)) drop-shadow(0 0 60px rgba(201,168,76,0.15))" }}>
              🍕
            </div>
          </div>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Kurunegala's Finest · Est. 2020</p>
          <h1 className="hero-title">
            Fine Dining,<br />
            <em>Rich Flavors,</em><br />
            Unforgettable Moments.
          </h1>
          <p className="hero-subtitle">Where every plate tells a story — No 42 Mihindu Mawatha, Kurunegala</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setShowModal(true)}>Book a Table</button>
            <button className="btn-secondary" onClick={() => document.getElementById("menu").scrollIntoView({ behavior: "smooth" })}>
              View Menu
            </button>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex" }}>
              <span className="marquee-item">Bacon Special</span>
              <span className="marquee-dot">◆</span>
              <span className="marquee-item">Glazed Pork Belly</span>
              <span className="marquee-dot">◆</span>
              <span className="marquee-item">Seafood Pad Thai</span>
              <span className="marquee-dot">◆</span>
              <span className="marquee-item">Royal Biryani</span>
              <span className="marquee-dot">◆</span>
              <span className="marquee-item">Premium Cocktails</span>
              <span className="marquee-dot">◆</span>
              <span className="marquee-item">Open Daily 10:30 AM – 12 AM</span>
              <span className="marquee-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* CONCEPT */}
      <section>
        <div className="concept-section">
          <div className="concept-visual reveal">
            <div className="concept-img-main">
              <div className="food-emoji-display">🍽️</div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))" }} />
            </div>
            <div className="concept-img-accent">
              <div className="food-emoji-display" style={{ fontSize: "60px" }}>🥂</div>
            </div>
            <div className="concept-stats reveal reveal-delay-2">
              {[
                { num: "50+", label: "Signature Dishes" },
                { num: "5★", label: "Dining Experience" },
                { num: "200", label: "Seating Capacity" },
                { num: "3+", label: "Years of Excellence" },
              ].map((s) => (
                <div className="stat-item" key={s.num}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="concept-text reveal reveal-delay-1">
            <div className="section-label">Our Story</div>
            <h2 className="section-title">
              A Culinary<br /><em>Journey</em>
            </h2>
            <div className="gold-divider" />
            <p>Nestled in the heart of Kurunegala, Asliya Kallista is where bold flavors meet refined aesthetics. Our kitchen draws from Asian fusion traditions while celebrating local Sri Lankan ingredients.</p>
            <p>From our legendary Bacon Special pizza to the slow-cooked Glazed Pork Belly, every dish is a testament to culinary artistry. We believe dining is theatre — and you deserve the best seat in the house.</p>
            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <button className="btn-primary" onClick={() => setShowModal(true)}>Reserve Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section" id="menu" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 0, paddingRight: 0 }}>
          <div className="reveal" style={{ padding: "0 0 0 0" }}>
            <div className="section-label">Culinary Creations</div>
            <h2 className="section-title">The <em>Menu</em></h2>
          </div>
          <div className="menu-tabs">
            {[
              { key: "pizzas", label: "Signature Pizzas" },
              { key: "mains", label: "Fusion Mains" },
              { key: "specialties", label: "Specialties" },
            ].map(t => (
              <button
                key={t.key}
                className={`menu-tab ${activeTab === t.key ? "active" : ""}`}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {currentMenu.map((item, i) => (
              <div
                key={item.name}
                className={`menu-card reveal reveal-delay-${i + 1} ${item.featured ? "menu-card-featured" : ""}`}
              >
                <div className="card-img">
                  <div className="card-img-inner" style={{ background: item.bg }}>
                    <div className="steam">
                      <div className="steam-line" />
                      <div className="steam-line" />
                      <div className="steam-line" />
                    </div>
                    <div className="food-icon">{item.icon}</div>
                  </div>
                  <div className="card-overlay">
                    <button className="card-overlay-btn">Quick Order</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-label">{item.label}</div>
                  <div className="card-name">{item.name}</div>
                  <div className="card-desc">{item.desc}</div>
                  <div className="card-footer">
                    <div>
                      <div className="card-price">{item.price}</div>
                    </div>
                    {item.badge && <div className="card-badge">{item.badge}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section" id="experience">
        <div className="gallery-header reveal">
          <div className="section-label">The Atmosphere</div>
          <h2 className="section-title">The <em>Experience</em></h2>
        </div>
        <div
          className="gallery-track"
          ref={galleryRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {galleryItems.map((item, i) => (
            <div className="gallery-item" key={i}>
              <div className="gallery-img" style={{ background: item.bg }}>
                <div style={{
                  fontSize: "100px",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.8))",
                  animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}>
                  {item.emoji}
                </div>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4))`,
                }} />
              </div>
              <div className="gallery-caption">
                <div style={{ fontSize: 10, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginBottom: 4 }}>
                  {item.label}
                </div>
                {item.caption}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "24px 60px 0", color: "var(--text-muted)", fontSize: 12, letterSpacing: 2, display: "flex", alignItems: "center", gap: 12 }}>
          <span>← Drag to explore →</span>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="map-placeholder">
          <div className="map-grid-lines" />
          <div className="map-pin">
            <div className="map-pin-dot" />
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--cream)", marginTop: 16 }}>
              Asliya Kallista
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: 1 }}>
              No 42 Mihindu Mawatha, Kurunegala
            </div>
          </div>
        </div>
        <div className="info-section">
          <div className="info-card">
            <div className="section-label" style={{ marginBottom: 36 }}>Find Us</div>
            <div className="info-row">
              <div className="info-icon">📍</div>
              <div>
                <div className="info-label">Address</div>
                <div className="info-value">No 42 Mihindu Mawatha<br />Kurunegala 60000<br />Sri Lanka</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">📞</div>
              <div>
                <div className="info-label">Reservations</div>
                <div className="info-value">+94 77 210 5050</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon">✉️</div>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">info@asliyakallista.lk</div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => setShowModal(true)} style={{ marginTop: 12 }}>
              Book a Table
            </button>
          </div>
          <div className="info-card dark">
            <div className="section-label" style={{ marginBottom: 36 }}>Hours</div>
            <div className="info-row">
              <div className="info-icon">🕙</div>
              <div>
                <div className="info-label">Operating Hours</div>
                <div className="info-value">Open Every Day</div>
              </div>
            </div>
            <div className="hours-grid">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <div className="hours-item" key={day}>
                  <div className="hours-day">{day}</div>
                  <div className="hours-time">10:30 AM – 12:00 AM</div>
                </div>
              ))}
              <div className="hours-item" style={{ background: "rgba(201,168,76,0.08)" }}>
                <div className="hours-day" style={{ color: "var(--gold)" }}>Kitchen Closes</div>
                <div className="hours-time">11:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="footer-brand">Asliya <em>Kallista</em></div>
            <div className="footer-desc">
              Fine dining, rich flavors, unforgettable moments. Kurunegala's premier destination for culinary excellence and sophisticated atmosphere.
            </div>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              <li>Menu</li>
              <li>Reservations</li>
              <li>Gallery</li>
              <li>Private Events</li>
              <li>Gift Cards</li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Follow Us</div>
            <ul className="footer-links">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>TripAdvisor</li>
            </ul>
            <div style={{ marginTop: 32 }}>
              <div className="footer-col-title">Contact</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 300 }}>+94 77 210 5050</div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Asliya Kallista Restaurant & Café. All rights reserved.</span>
          <span>No 42 Mihindu Mawatha, Kurunegala 60000</span>
        </div>
      </footer>

      {/* FAB */}
      <div className="fab">
        <div className="fab-label">Quick Order</div>
        <button className="fab-btn" onClick={() => setShowModal(true)}>
          <div className="fab-ring" />
          🛎️
        </button>
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-title">Reserve a <em style={{ fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" }}>Table</em></div>
            <div className="modal-subtitle">Complete your booking — we'll confirm within the hour</div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+94 77 XXX XXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input className="form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input className="form-input" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Number of Guests</label>
              <input className="form-input" type="number" min="1" max="20" value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} />
            </div>
            <button className="btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => {
              alert("🎉 Reservation received! We'll call you to confirm shortly.");
              setShowModal(false);
            }}>
              Confirm Reservation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
