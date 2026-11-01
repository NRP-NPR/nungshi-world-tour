import React, { useEffect, useState } from 'react';
import ConcertJourney from './ConcertJourney.jsx';
import Arrow from './Arrow.jsx';
import ChromeStar from './ChromeStar.jsx';

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
    <div className="art-caption">CALM BEFORE THE ENCORE <span>ZERO CHILL / 2026</span></div>
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
        <a href="#tour" onClick={() => setMenuOpen(false)}>Tour cities</a><a href="#experience" onClick={() => setMenuOpen(false)}>The experience</a><a className="nav-cta" href="#tour" onClick={() => setMenuOpen(false)}>Enter the experience <Arrow /></a>
      </nav>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-meta"><span>GLAMOROUS CHAOS / LOOKS EXPENSIVE. BEHAVES RIDICULOUS.</span><span>WORLD TOUR — 2026</span></div>
        <h1 id="hero-title">NUNGSHI<span className="sr-only"> World Tour 2026</span></h1>
        <div className="hero-editorial"><div className="hero-aside"><span className="eyebrow">NUNGSHI WORLD TOUR 2026</span><h2>THE WORLD<br />IS NOT <em>READY.</em></h2><p>Unnecessarily iconic since 2026.</p><a className="round-link" href="#tour"><span>ENTER THE EXPERIENCE</span><b aria-hidden="true"><Arrow /></b></a><span className="edition-note">DRESS CODE: MAIN CHARACTER.</span></div><div className="hero-image-wrap"><HeroFilm /><ChromeStar className="hero-chrome" /><span className="pop-sticker">GLAMOROUS<br />CHAOS<small>looks expensive. behaves ridiculous.</small></span></div></div>
        <div className="hero-bottom"><span>NUNGSHI WORLD TOUR 2026</span><span>SCROLL TO DISCOVER ↓</span></div>
      </section>
      <div className="tour-manifesto"><span className="eyebrow">THE ITINERARY</span><p>Six cities. <em>One spectacular ego.</em></p><a href="#tour">Find your seat <Arrow /></a></div>
      <section id="tour" className="tour section">
        <div className="section-heading"><span className="eyebrow">01 / PICK A CITY</span><span className="small-note">YOUR SOFA IS NOT A TOUR DESTINATION.</span></div>
        <div className="tour-title"><h2>Coming to<br /><em>your screen.</em></h2><p>Pick a city. Claim a seat. Cause a scene.</p></div>
        <p className="sample-note">A fictional tour. A free virtual ticket. No flights or credit cards required.</p>
        <div className="filters" role="group" aria-label="Filter tour destinations">{['All cities', 'Asia', 'Europe', 'North America'].map(item => <button key={item} className={region === item ? 'active' : ''} aria-pressed={region === item} onClick={() => setRegion(item)}>{item}{item === 'All cities' && <span>06</span>}</button>)}</div>
        <div className="stops">{stops.filter(stop => region === 'All cities' || stop.region === region).map(stop => <article className="stop" key={stop.city}><span className="stop-number">/{stop.number}</span><div className="stop-city"><h3>{stop.city}</h3><span>{stop.country}</span></div><div className="stop-date">2026<span>VIRTUAL EDITION</span></div><button className="stop-button" onClick={() => startExperience(stop.city)}>Select a seat <span><Arrow /></span></button></article>)}</div>
        <div className="tour-foot"><span>PASSPORT OPTIONAL.</span><span>ENTHUSIASM ENCOURAGED.</span></div>
      </section>
      {selected && <ConcertJourney key={selected.key} city={selected.city} onExit={leaveExperience} />}
      <section id="experience" className="experience section">
        <div className="experience-art"><img src="/images/tour-editorial.webp" alt="An anonymous performer facing a stadium under a solitary stage light" loading="lazy" /><span className="art-serial">REHEARSED CASUALNESS / TAKE 47</span></div>
        <div className="experience-copy"><span className="eyebrow">02 / THE FULL NUNGSHI</span><h2>All the drama.<br /><em>None of the queue.</em></h2><p>Your seat. Your dramatic entrance. Three performances worth cancelling imaginary plans for.</p><p>Stay for the awards. Our jury has excellent taste. It’s us.</p><a className="text-link" href="#tour">I’m on the list <span><Arrow /></span></a></div>
      </section>
      <section className="closing"><span className="eyebrow">NO SUCH THING AS TOO MUCH ENCORE.</span><h2>You had to<br />be <em>here.</em></h2><a href="#tour" className="closing-link">Make an entrance <span><Arrow /></span></a><span className="closing-edition">N / 26</span></section>
    </main>
    <footer><a className="wordmark" href="#">NUNGSHI<span>2026</span></a><span>FICTIONAL ICON. REAL COMMITMENT.</span><span>© {new Date().getFullYear()} NUNGSHI</span><a href="#main">BACK TO TOP ↑</a></footer>

  </>;
}
