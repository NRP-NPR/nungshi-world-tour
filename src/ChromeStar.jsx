import React, { useId } from 'react';

export default function ChromeStar({ className = '' }) {
  const id = useId();
  return <svg className={`chrome-star ${className}`} viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fafafa" /><stop offset=".24" stopColor="#85898b" /><stop offset=".48" stopColor="#fff" /><stop offset=".52" stopColor="#5e6266" /><stop offset=".76" stopColor="#dfe1e2" /><stop offset="1" stopColor="#8f9294" /></linearGradient></defs><path d="M50 2 61 36 96 22 74 50 98 68 64 65 62 98 46 73 18 94 29 61 2 48 36 39Z" fill={`url(#${id})`} stroke="#eceeef" strokeWidth=".7" /><path d="m50 2-4 71M2 48l72 2M18 94l43-58" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth=".7" /></svg>;
}
