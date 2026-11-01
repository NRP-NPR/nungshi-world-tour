import React, { useEffect, useRef, useState } from 'react';
import AudienceReactions from './AudienceReactions.jsx';
import ChromeStar from './ChromeStar.jsx';

const sections = [
  { name: 'Front Row', code: 'A', className: 'front', description: 'Close enough to make eye contact. Act natural.', price: 240 },
  { name: 'VIP', code: 'B', className: 'vip', description: 'Very Important Person. Complimentary imaginary champagne.', price: 180 },
  { name: 'Standard', code: 'C', className: 'standard', description: 'Excellent vibes. Sensible fictional spending.', price: 95 },
  { name: 'Restricted View', code: 'D', className: 'restricted', description: 'Partial stage view. Full main-character confidence.', price: 45 },
];
const stageEditions = ['THE ARRIVAL / CHROME AFTER DARK', 'THE TAKEOVER / PINK PANIC', 'THE ENCORE / ONE LAST FLASH'];
const songs = ['The entrance was necessary', 'Still not being subtle', 'One more. Obviously.'];

function Performance({ track, onFinish }) {
  const video = useRef(null);
  const [status, setStatus] = useState('loading');
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [retry, setRetry] = useState(0);
  useEffect(() => { setStatus('loading'); setPlaying(false); setMuted(true); }, [track, retry]);
  async function togglePlay() {
    if (!video.current) return;
    if (!video.current.paused) { video.current.pause(); return; }
    try { await video.current.play(); } catch { setPlaying(false); setStatus('paused'); }
  }
  return <>
    <div className="led-screen">
      <div className="screen-poster" aria-hidden="true"><img className="performance-art" src="/images/tour-editorial.webp" alt="" /><div className="led-texture" /><span className="screen-brand">NUNGSHI</span></div>
      <video key={`${track}-${retry}`} ref={video} src={`/videos/performance-0${track + 1}.mp4`} controls playsInline muted={muted} preload="metadata" className={status === 'ready' || status === 'paused' ? 'performance-video visible' : 'performance-video'} onLoadedData={() => setStatus('ready')} onError={() => { setStatus('missing'); setPlaying(false); }} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={onFinish} />
      <div className="screen-top"><span>LIVE EXPERIENCE</span><span>ACT 0{track + 1} / 0{songs.length}</span></div>
      {(status === 'missing' || status === 'loading') && <div className="screen-message"><span>{status === 'missing' ? 'THE STAGE IS YOURS' : 'PREPARING THE SCREEN'}</span><p>{status === 'missing' ? 'Performance film coming soon' : 'Loading performance…'}</p><small>{status === 'missing' ? 'A brief diva moment. Try again or skip ahead.' : 'The superstar is finding their good side.'}</small></div>}
    </div>
    <div className="playback-bar"><div><span className="eyebrow">ACT 0{track + 1} — {stageEditions[track]}</span><h3>{songs[track]}</h3><p role="status">{status === 'missing' ? 'Preview artwork · video not yet available' : playing ? 'Now playing' : 'Hit play. Enable sound. Neighbours optional.'}</p></div><div className="playback-buttons">{status === 'missing' ? <button onClick={() => setRetry(value => value + 1)}>Retry video</button> : <><button onClick={togglePlay} disabled={status === 'loading'}>{playing ? 'Pause' : 'Play film'}</button><button onClick={() => setMuted(value => !value)}>{muted ? 'Enable sound' : 'Mute'}</button></>}<button className="gold-button" onClick={onFinish}>{track < songs.length - 1 ? 'Next performance →' : 'To the awards →'}</button></div></div>
  </>;
}

export default function ConcertJourney({ city, onExit }) {
  const [step, setStep] = useState('seats');
  const [seat, setSeat] = useState(null);
  const [count, setCount] = useState(5);
  const [track, setTrack] = useState(0);
  const [cheers, setCheers] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const heading = useRef(null);
  const timers = { entering: 2400, lights: 1800 };
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    if (step === 'entering' || step === 'lights') {
      const timer = setTimeout(() => setStep(step === 'entering' ? 'lights' : 'countdown'), timers[step]);
      return () => clearTimeout(timer);
    }
    if (step === 'countdown') {
      const timer = setTimeout(() => { if (count > 1) setCount(value => value - 1); else setStep('show'); }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, count]);
  function restart() { setStep('seats'); setSeat(null); setCount(5); setTrack(0); setCheers(0); setRevealed(false); }
  const stageIndex = step === 'seats' ? 0 : step === 'confirmed' ? 1 : ['entering', 'lights', 'countdown'].includes(step) ? 2 : step === 'show' ? 3 : 4;
  return <section className="journey section" id="concert" aria-labelledby="journey-title">
    <div className="section-heading"><span className="eyebrow">THE LIVE EXPERIENCE / {city}</span><button className="subtle-button" onClick={onExit}>← Change city</button></div>
    <ol className="journey-progress" aria-label="Concert progress">{['Seat', 'Ticket', 'Entrance', 'Show', 'Awards'].map((label, i) => <li key={label} className={i <= stageIndex ? 'reached' : ''} aria-current={i === stageIndex ? 'step' : undefined}><span>0{i + 1}</span>{label}</li>)}</ol>
    <h2 id="journey-title" ref={heading} tabIndex={-1}>{step === 'seats' ? 'Pick your level of extra.' : step === 'confirmed' ? 'You’re with the band. Ish.' : step === 'entering' ? 'Cue your entrance.' : step === 'lights' ? 'Lighting: unnecessarily good.' : step === 'countdown' ? 'Deep breath. Big moment.' : step === 'awards' ? 'And the ego goes to…' : 'NUNGSHI has entered the chat.'}</h2>
    {step === 'seats' && <><p className="journey-intro">48 seats. Four moods. Tap one to make it yours.</p><div className="booking-layout"><div className="seat-plan"><div className="map-stage">NUNGSHI <span>MAIN STAGE</span></div><div className="runway" aria-hidden="true" />{sections.map(section => <fieldset className={`seat-section ${section.className}`} key={section.code}><legend><span>{section.name}</span><small>ROW {section.code}</small></legend><div className="seat-row">{Array.from({ length: 12 }, (_, i) => { const id = `${section.code}${String(i + 1).padStart(2, '0')}`; return <button key={id} className={`seat ${seat?.id === id ? 'chosen' : ''}`} aria-label={`${section.name}, seat ${id}`} aria-pressed={seat?.id === id} onClick={() => setSeat(seat?.id === id ? null : { ...section, id })}><span>{i + 1}</span></button>; })}</div></fieldset>)}<div className="map-key"><span>□ Available</span><span>◆ Selected</span><span>Tap again to deselect</span></div></div><aside className="booking-card"><span className="eyebrow">SEAT SELECTION</span><h3>Your spot.<br /><em>Your plot.</em></h3><div className="ticket-details"><div><span>Destination</span><b>{city}</b></div><div><span>Section</span><b>{seat?.name || 'Choose a seat'}</b></div><div><span>Seat</span><b>{seat?.id || '—'}</b></div><div><span>Fictional price</span><b>{seat ? `$${seat.price} USD` : '—'}</b></div></div><p className="seat-description" aria-live="polite">{seat?.description || 'Pick a seat. The imaginary paparazzi can wait.'}</p><button className="gold-button" disabled={!seat} onClick={() => setStep('confirmed')}>Confirm my seat <span>→</span></button><p className="simulation-note">Free virtual experience. No payment or real reservation.</p></aside></div></>}
    {step === 'confirmed' && <div className="confirmation"><div className="admission-ticket"><ChromeStar className="ticket-star" /><span className="eyebrow">NUNGSHI / WORLD TOUR 2026</span><div className="ticket-access"><b>VIP</b><span>VIRTUAL ICON PASS<br />ALL ACCESS</span></div><h3>ADMIT<br /><em>ICON.</em></h3><div className="ticket-stub"><span>{city}</span><b>{seat.name} · {seat.id}</b><span>DRAMA LEVEL: UNLIMITED</span></div><div className="barcode" aria-hidden="true" /><p>COLLECTIBLE NO. 2026-{seat.id} / {city}<br />VIRTUAL ADMISSION. REAL ATTITUDE.</p></div><div className="confirmation-copy"><span className="eyebrow">VIRTUAL TICKET / EGO INCLUDED</span><h3>On the list.<br />Off the charts.</h3><p>Your avatar will handle the walk. You handle the attitude.</p><button className="gold-button" onClick={() => setStep('entering')}>Enter the venue →</button><button className="subtle-button" onClick={() => setStep('seats')}>Change my seat</button></div></div>}
    {['entering', 'lights', 'countdown', 'show'].includes(step) && <><div className={`concert-hall ${step}`} data-act={track + 1}><div className="stage-truss" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="stage-wing wing-left" aria-hidden="true" /><div className="stage-wing wing-right" aria-hidden="true" /><div className="hall-architecture" aria-hidden="true"><i /><i /><i /></div><div className="lighting" aria-hidden="true"><i /><i /><i /><i /></div><div className="stage-platform">{step === 'show' ? <Performance track={track} onFinish={() => { if (track < songs.length - 1) setTrack(value => value + 1); else setStep('awards'); }} /> : <div className="led-screen waiting-screen"><span className="eyebrow chrome-sign">NUNGSHI / GLAMOROUS CHAOS</span><span className="venue-monogram">N</span><div className="countdown-number" role="status" aria-live="polite">{step === 'entering' ? 'WELCOME' : step === 'lights' ? 'LIGHTS UP' : count}</div><p>{step === 'entering' ? 'Follow the aisle. Pretend you do this all the time.' : step === 'lights' ? 'Yes, those lights are for you too.' : 'Screaming practice starts now.'}</p></div>}</div><div className="audience" aria-hidden="true">{Array.from({ length: 36 }, (_, i) => <span className="audience-person" key={i} style={{ '--i': i }} />)}</div><div className="avatar-path" aria-hidden="true"><div className="audience-avatar"><i /><b /><span /></div></div><span className="your-seat-label">YOU · {seat.id} · {seat.name}</span></div><div className="venue-controls"><p role="status">{step === 'entering' ? 'Your avatar is walking to your seat…' : step === 'lights' ? 'You’re seated. The stage lights are turning on…' : step === 'countdown' ? `Show begins in ${count}…` : `On stage · Performance ${track + 1} of ${songs.length}`}</p>{step !== 'show' ? <button onClick={() => setStep('show')}>Skip intro →</button> : null}</div>{step === 'show' && <AudienceReactions cheers={cheers} onApplaud={() => setCheers(value => value + 1)} />}</>}
    {step === 'awards' && <div className={`awards ${revealed ? 'revealed' : 'sealed'}`}><div className="confetti" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div><span className="eyebrow">THE HIGHLY UNOFFICIAL NUNGSHI AWARDS</span><ChromeStar className="certificate-star" /><div className="award-seal" aria-hidden="true"><span>100%</span><small>DESERVED. PROBABLY.</small></div><h3>{revealed ? 'You. Obviously.' : 'We’d like to thank… you.'}</h3>{!revealed ? <><p>Three seconds of deliberation. Zero impartiality.</p><button className="gold-button" onClick={() => setRevealed(true)}>Open the envelope →</button></> : <><span className="award-category">{seat.name === 'Restricted View' ? 'BEST PERFORMANCE DESPITE A PILLAR' : cheers > 2 ? 'OUTSTANDING ACHIEVEMENT IN AGGRESSIVE CLAPPING' : seat.name === 'Front Row' ? 'BEST ATTEMPT AT CASUAL EYE CONTACT' : seat.name === 'VIP' ? 'MOST IMPORTANT PERSON, SELF-DECLARED' : 'MAIN CHARACTER ON A SENSIBLE BUDGET'}</span><p>{city}. Seat {seat.id}. Impeccable taste.<br />Your prize is bragging rights. Please expense nothing.</p><div className="award-facts"><span>1 unforgettable night</span><span>{songs.length} performances</span><span>{cheers} virtual ovations</span></div><p className="certificate-number">CERTIFIED ICON / NWT26-{seat.id} / {city}</p><button className="gold-button" onClick={restart}>Do it all again ↻</button><button className="subtle-button" onClick={onExit}>Back to the world tour</button></>}</div>}
  </section>;
}
