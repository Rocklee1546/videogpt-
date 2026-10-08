import React from 'react';

interface DinoMascotProps {
  isCheering?: boolean;
}

export const DinoMascot: React.FC<DinoMascotProps> = ({ isCheering }) => {
  return (
    <svg
      className={`dino ${isCheering ? 'cheer' : ''}`}
      id="dino"
      viewBox="0 0 190 175"
      role="img"
      aria-label="Dino the dinosaur guide holding a pointer stick"
    >
      {/* Tail */}
      <g className="tail">
        <path
          d="M125 140 C165 145 175 110 150 82 C145 78 138 88 142 98 C148 112 135 132 120 135"
          fill="#6BAF45"
          stroke="#315C2B"
          strokeWidth="3"
        />
        {/* Tail Spike */}
        <polygon points="152,82 162,75 156,92" fill="#315C2B" />
      </g>

      {/* Back Spikes */}
      <g className="spikes">
        <polygon points="80,28 72,12 92,22" fill="#315C2B" />
        <polygon points="102,38 108,18 118,32" fill="#315C2B" />
        <polygon points="118,58 132,48 128,68" fill="#315C2B" />
        <polygon points="122,95 138,90 130,108" fill="#315C2B" />
      </g>

      {/* Main Body */}
      <ellipse cx="92" cy="128" rx="42" ry="36" fill="#6BAF45" stroke="#315C2B" strokeWidth="3" />

      {/* Cute Belly */}
      <ellipse cx="84" cy="134" rx="26" ry="24" fill="#DDECCF" />

      {/* Feet */}
      <ellipse cx="72" cy="162" rx="14" ry="9" fill="#4F9D55" stroke="#315C2B" strokeWidth="2.5" />
      <circle cx="66" cy="162" r="2.5" fill="#DDECCF" />
      <circle cx="72" cy="164" r="2.5" fill="#DDECCF" />
      <circle cx="78" cy="162" r="2.5" fill="#DDECCF" />

      <ellipse cx="112" cy="162" rx="14" ry="9" fill="#4F9D55" stroke="#315C2B" strokeWidth="2.5" />
      <circle cx="106" cy="162" r="2.5" fill="#DDECCF" />
      <circle cx="112" cy="164" r="2.5" fill="#DDECCF" />
      <circle cx="118" cy="162" r="2.5" fill="#DDECCF" />

      {/* Pointer Arm */}
      <g className="arm">
        <path
          d="M118 116 Q138 104 144 90"
          stroke="#6BAF45"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M118 116 Q138 104 144 90"
          stroke="#315C2B"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.2"
        />
        {/* Pointer Stick */}
        <line x1="144" y1="92" x2="182" y2="28" stroke="#315C2B" strokeWidth="5" strokeLinecap="round" />
        <circle cx="182" cy="28" r="6" fill="#6BAF45" stroke="#315C2B" strokeWidth="2" />
        {/* Hand claws */}
        <circle cx="144" cy="91" r="8" fill="#DDECCF" stroke="#315C2B" strokeWidth="2" />
      </g>

      {/* Head */}
      <path
        d="M52 75 C52 42 75 28 98 32 C125 36 130 65 120 88 C112 102 85 106 65 96 C54 90 52 83 52 75 Z"
        fill="#6BAF45"
        stroke="#315C2B"
        strokeWidth="3"
      />

      {/* Dinosaur Cute Snout / Cheek */}
      <ellipse cx="62" cy="74" rx="14" ry="12" fill="#6BAF45" />

      {/* Nostril */}
      <circle cx="56" cy="70" r="2" fill="#315C2B" />

      {/* Cheeks Blush */}
      <ellipse cx="72" cy="84" rx="7" ry="4.5" fill="#4F9D55" opacity="0.6" />
      <ellipse cx="106" cy="84" rx="7" ry="4.5" fill="#4F9D55" opacity="0.6" />

      {/* Expressive Eyes */}
      <g className="eye">
        <ellipse cx="74" cy="62" rx="7" ry="9.5" fill="#1F2520" />
        <circle cx="76" cy="58" r="3" fill="#FFFFFF" />
        <circle cx="72" cy="65" r="1.2" fill="#FFFFFF" />
      </g>
      <g className="eye">
        <ellipse cx="102" cy="62" rx="7" ry="9.5" fill="#1F2520" />
        <circle cx="104" cy="58" r="3" fill="#FFFFFF" />
        <circle cx="100" cy="65" r="1.2" fill="#FFFFFF" />
      </g>

      {/* Happy Dino Mouth */}
      <path
        d="M74 80 Q88 92 100 80"
        stroke="#1F2520"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M84 85 Q88 89 92 85"
        fill="#E0607E"
      />
    </svg>
  );
};
