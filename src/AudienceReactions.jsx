import React, { useEffect, useRef, useState } from 'react';

export const reactionComments = {
  Applaud: ['Finally, someone with functioning taste.', 'The bare minimum, but appreciated.', 'Your hands deserve a raise.', 'An excellent review. From your hands.', 'Louder. My ego has terrible hearing.'],
  Love: ['Obsessed with me? Understandable.', 'Get in line, darling.', 'Your taste is showing.', 'A crush? How on-brand for you.', 'Emotionally available? I’m on tour.'],
  Laugh: ['Glad my existence entertains you.', 'Laugh now. Cry later.', 'Comedy wasn’t the assignment, but okay.', 'That was choreography. Allegedly.', 'Finally, a fan who gets the bit.'],
  Hype: ['Calm down. I’m only one person.', 'Security, we have a situation.', 'Someone’s clearly losing composure.', 'Save some energy for my next entrance.', 'Yes, this is a completely normal reaction.'],
};

// A shuffled bag gives every line a turn before repeating one.
function drawComment(type, history) {
  const record = history[type] || { bag: [], last: null };
  if (!record.bag.length) {
    record.bag = [...reactionComments[type]];
    for (let i = record.bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [record.bag[i], record.bag[j]] = [record.bag[j], record.bag[i]];
    }
    if (record.bag[record.bag.length - 1] === record.last) {
      [record.bag[0], record.bag[record.bag.length - 1]] = [record.bag[record.bag.length - 1], record.bag[0]];
    }
  }
  record.last = record.bag.pop();
  history[type] = record;
  return record.last;
}

export default function AudienceReactions({ cheers, onApplaud }) {
  const [counts, setCounts] = useState({ Love: 0, Laugh: 0, Hype: 0 });
  const [comment, setComment] = useState(null);
  const history = useRef({});
  const sequence = useRef(0);
  useEffect(() => {
    if (!comment) return;
    const timer = setTimeout(() => setComment(null), 2600);
    return () => clearTimeout(timer);
  }, [comment]);
  function react(type) {
    if (type === 'Applaud') onApplaud();
    else setCounts(previous => ({ ...previous, [type]: previous[type] + 1 }));
    setComment({ type, text: drawComment(type, history.current), id: ++sequence.current });
  }
  return <aside className="reaction-station" aria-label="Audience reactions">
    <div className="reaction-toolbar"><span className="eyebrow">FEED THE EGO</span><div className="reaction-buttons">{Object.keys(reactionComments).map(type => <button key={type} onClick={() => react(type)}>{type}<span className="reaction-count">{type === 'Applaud' ? cheers : counts[type]}</span></button>)}</div></div>
    <div className="reaction-comment" role="status" aria-live="polite" aria-atomic="true">{comment && <div key={comment.id} className={`reaction-toast reaction-${comment.type.toLowerCase()}`}><span>NUNGSHI SAYS</span><p>“{comment.text}”</p></div>}</div>
  </aside>;
}
