import React from "react";

// Hand-drawn flat-illustration furniture for the homepage's cozy-room scene —
// real vector art (gradients + a soft drop-shadow filter) instead of
// CSS box-shadow shapes trying to fake 3D.

export const CouchIllustration = ({ width = 190, height = 140 }) => (
  <svg width={width} height={height} viewBox="0 0 190 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="couchBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DCD0BC" />
        <stop offset="100%" stopColor="#C9BFAF" />
      </linearGradient>
      <linearGradient id="couchSeat" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C9BFAF" />
        <stop offset="100%" stopColor="#AB9F8B" />
      </linearGradient>
      <filter id="couchShadow" x="-20%" y="-20%" width="140%" height="170%">
        <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#3A2E22" floodOpacity="0.18" />
      </filter>
    </defs>
    <g filter="url(#couchShadow)">
      <rect x="20" y="18" width="150" height="78" rx="26" fill="url(#couchBody)" />
      <rect x="10" y="55" width="34" height="60" rx="16" fill="url(#couchBody)" />
      <rect x="146" y="55" width="34" height="60" rx="16" fill="url(#couchBody)" />
      <rect x="26" y="78" width="138" height="42" rx="18" fill="url(#couchSeat)" />
      <rect x="108" y="50" width="34" height="34" rx="9" fill="#8FAE94" transform="rotate(-8 125 67)" />
      <rect x="34" y="118" width="8" height="16" rx="3" fill="#8B6F52" />
      <rect x="148" y="118" width="8" height="16" rx="3" fill="#8B6F52" />
    </g>
  </svg>
);

export const LampIllustration = ({ width = 90, height = 190 }) => (
  <svg width={width} height={height} viewBox="0 0 90 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFDFA3" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#FFDFA3" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="lampShade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFDF8" />
        <stop offset="100%" stopColor="#F2EEE4" />
      </linearGradient>
      <linearGradient id="lampPole" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#D9C5B2" />
        <stop offset="100%" stopColor="#8B6F52" />
      </linearGradient>
    </defs>
    <circle cx="45" cy="60" r="55" fill="url(#lampGlow)" />
    <path d="M18 68 L72 68 L60 18 L30 18 Z" fill="url(#lampShade)" />
    <rect x="41" y="66" width="8" height="104" rx="4" fill="url(#lampPole)" />
    <ellipse cx="45" cy="176" rx="22" ry="7" fill="#8B6F52" />
  </svg>
);

export const DeskIllustration = ({ width = 100, height = 100 }) => (
  <svg width={width} height={height} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D9C5B2" />
        <stop offset="100%" stopColor="#B99C7C" />
      </linearGradient>
    </defs>
    <ellipse cx="55" cy="84" rx="30" ry="6" fill="#3A2E22" opacity="0.08" />
    <ellipse cx="55" cy="38" rx="42" ry="14" fill="url(#deskTop)" />
    <rect x="18" y="38" width="8" height="46" rx="3" fill="#8B6F52" />
    <rect x="84" y="38" width="8" height="46" rx="3" fill="#8B6F52" />
    <g transform="translate(40, 14)">
      <path d="M0 0 H30 L17 15 L30 30 H0 L13 15 Z" fill="#F2EEE4" stroke="#9A9EAB" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 4 H24 L15 15 Z" fill="#E7C878" opacity="0.8" />
    </g>
  </svg>
);

export const PlantIllustration = ({ width = 80, height = 130 }) => (
  <svg width={width} height={height} viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7C9C81" />
        <stop offset="100%" stopColor="#4A5D4E" />
      </linearGradient>
      <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CE8A5C" />
        <stop offset="100%" stopColor="#A6653C" />
      </linearGradient>
    </defs>
    <path d="M40 78 C20 60 22 30 40 12 C58 30 60 60 40 78 Z" fill="url(#leafGrad)" />
    <path d="M40 82 C16 68 10 44 22 24 C40 34 46 62 40 82 Z" fill="url(#leafGrad)" opacity="0.9" />
    <path d="M40 82 C64 68 70 44 58 24 C40 34 34 62 40 82 Z" fill="url(#leafGrad)" opacity="0.9" />
    <path d="M14 82 H66 L58 122 H22 Z" fill="url(#potGrad)" />
    <rect x="10" y="76" width="60" height="12" rx="4" fill="#B3703F" />
  </svg>
);
