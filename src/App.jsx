import React, { useEffect, useState } from 'react';
import ConcertJourney from './ConcertJourney.jsx';
import Arrow from './Arrow.jsx';

const stops = [
  { city: 'SEOUL', country: 'SOUTH KOREA', region: 'Asia', number: '01' },
  { city: 'TOKYO', country: 'JAPAN', region: 'Asia', number: '02' },
  { city: 'LONDON', country: 'UNITED KINGDOM', region: 'Europe', number: '03' },
  { city: 'PARIS', country: 'FRANCE', region: 'Europe', number: '04' },
  { city: 'NEW YORK', country: 'UNITED STATES', region: 'North America', number: '05' },
  { city: 'LOS ANGELES', country: 'UNITED STATES', region: 'North America', number: '06' },
];

function HeroFilm() {
  const [loaded, setLoaded] = useState(false);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowed(!preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return <div className="hero-art" aria-hidden="true">
    <img className="campaign-image" src="/images/tour-editorial.webp" alt="" />
    <div className="image-shade" />
    {allowed && <video className={loaded ? 'film is-loaded' : 'film'} autoPlay muted loop playsInline onCanPlay={() => setLoaded(true)} onError={() => setLoaded(false)}><source src="/videos/tour-film.mp4" type="video/mp4" /></video>}
    <div className="art-caption">THE MOMENT BEFORE <span>CAMPAIGN / 001</span></div>
  </div>;
}

export default function App() {
  const [region, setRegion] = useState('All cities');
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (selected) document.getElementById('concert')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }, [selected]);
  const startExperience = (city) => setSelected({ city, key: Date.now() });
  const leaveExperience = () => {
    setSelected(null);
    requestAnimationFrame(() => { document.getElementById('tour')?.scrollIntoView({ block: 'start' }); document.querySelector('.stop-button')?.focus({ preventScroll: true }); });
  };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <a className="wordmark" href="#" aria-label="Nungshi home">NUNGSHI<span>2026</span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation">{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
      <nav id="navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        <a href="#tour" onClick={() => setMenuOpen(false)}>Tour index</a><a href="#experience" onClick={() => setMenuOpen(false)}>The experience</a><a className="nav-cta" href="#tour" onClick={() => setMenuOpen(false)}>Enter the experience <Arrow /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-meta"><span>INDEPENDENT SPIRIT. UNIVERSAL SOUND.</span><span>WORLD TOUR — 2026</span></div>
        <h1 id="hero-title">NUNGSHI<span className="sr-only"> World Tour 2026</span></h1>
        <div className="hero-editorial"><div className="hero-aside"><span className="eyebrow">A WORLD, TOGETHER.</span><h2>Some nights<br />stay with <em>you.</em></h2><p>One voice. A thousand different stories.<br />Meet us where the music happens.</p><a className="round-link" href="#tour"><span>Find your place</span><b aria-hidden="true"><Arrow /></b></a><span className="edition-note">THE LIVE EXPERIENCE<br />VOL. 01 / 2026</span></div><HeroFilm /></div>
        <div className="hero-bottom"><span>NUNGSHI WORLD TOUR 2026</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>
      <div className="tour-manifesto"><span className="eyebrow">THE WORLD TOUR</span><p>Different cities.<br />The same <em>electricity.</em></p><span className="manifesto-foot">SIX DESTINATIONS. ONE SHARED MOMENT.</span></div>
      <section id="tour" className="tour section">
        <div className="section-heading"><span className="eyebrow">01 — THE TOUR INDEX</span><span className="small-note">FIND YOUR PLACE IN THE CROWD.</span></div>
        <div className="tour-title"><h2>A night<br /><em>in your city.</em></h2><p>Choose a city. Take your seat.<br />We’ll meet you on the other side.</p></div>
        <p className="sample-note">Choose a destination to begin your virtual concert. Sample cities · official dates and venues to be announced · no real ticket sales.</p>
        <div className="filters" role="group" aria-label="Filter tour destinations">{['All cities', 'Asia', 'Europe', 'North America'].map(item => <button key={item} className={region === item ? 'active' : ''} aria-pressed={region === item} onClick={() => setRegion(item)}>{item}{item === 'All cities' && <span>06</span>}</button>)}</div>
        <div className="stops">{stops.filter(stop => region === 'All cities' || stop.region === region).map(stop => <article className="stop" key={stop.city}><span className="stop-number">/{stop.number}</span><div className="stop-city"><h3>{stop.city}</h3><span>{stop.country}</span></div><div className="stop-date">2026<span>DATE & VENUE TBA</span></div><button className="stop-button" onClick={() => startExperience(stop.city)}>Select a seat <span><Arrow /></span></button></article>)}</div>
        <div className="tour-foot"><span>MORE CITIES TO BE ANNOUNCED.</span><span>THE STORY CONTINUES.</span></div>
      </section>
      {selected && <ConcertJourney key={selected.key} city={selected.city} onExit={leaveExperience} />}
      <section id="experience" className="experience section">
        <div className="experience-art"><img src="/images/tour-editorial.webp" alt="An anonymous performer facing a stadium under a solitary stage light" loading="lazy" /><span className="art-serial">STUDIES IN SOUND & SILENCE / 001</span></div>
        <div className="experience-copy"><span className="eyebrow">02 — BEYOND THE STAGE</span><h2>The distance<br />between us.<br /><em>Disappears.</em></h2><p>That first beat. The lights going down. Thousands of voices becoming one. A moment that belongs to everyone in the room.</p><p>From choosing your seat to the final ovation, this is your invitation into the world of NUNGSHI. Stay until the end. We have something for you.</p><a className="text-link" href="#tour">Step inside <span><Arrow /></span></a></div>
      </section>
      <section className="closing"><span className="eyebrow">THE LAST WORD BELONGS TO YOU.</span><h2>Wish you<br />were <em>here.</em></h2><a href="#tour" className="closing-link">Your night starts here <span><Arrow /></span></a><span className="closing-edition">N / 26</span></section>
    </main>
    <footer><a className="wordmark" href="#">NUNGSHI<span>2026</span></a><span>WORLD TOUR 2026 / CONCEPT SITE</span><span>© {new Date().getFullYear()} NUNGSHI</span><a href="#main">BACK TO TOP ↑</a></footer>

  </>;
}
