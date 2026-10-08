import React from 'react';

interface CatMascotProps {
  isCheering?: boolean;
}

export const CatMascot: React.FC<CatMascotProps> = ({ isCheering }) => {
  return (
    <svg
      className={`cat ${isCheering ? 'cheer' : ''}`}
      id="cat"
      viewBox="0 0 190 175"
      role="img"
      aria-label="Miko the cat guide holding a pointer stick"
    >
      <g className="tail">
        <path d="M118 146 C160 150 172 112 152 84" stroke="#e8893a" strokeWidth="13" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="90" cy="132" rx="42" ry="34" fill="#f4a259" />
      <ellipse cx="90" cy="140" rx="23" ry="22" fill="#fde4c8" />
      <ellipse cx="70" cy="164" rx="14" ry="8" fill="#f4a259" />
      <ellipse cx="110" cy="164" rx="14" ry="8" fill="#f4a259" />
      <g className="arm">
        <path d="M118 120 Q134 108 142 94" stroke="#f4a259" strokeWidth="13" fill="none" strokeLinecap="round" />
        <line x1="142" y1="96" x2="182" y2="28" stroke="#8b5a2b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="182" cy="28" r="5" fill="#ea580c" />
        <circle cx="142" cy="95" r="9" fill="#fde4c8" />
      </g>
      <polygon points="56,52 52,12 82,36" fill="#f4a259" />
      <polygon points="124,52 128,12 98,36" fill="#f4a259" />
      <polygon points="60,44 58,22 74,36" fill="#f7b8a0" />
      <polygon points="120,44 122,22 106,36" fill="#f7b8a0" />
      <circle cx="90" cy="70" r="40" fill="#f4a259" />
      <path d="M80 34 L84 46 M90 32 L90 46 M100 34 L96 46" stroke="#d9772a" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="70" cy="86" rx="8" ry="5" fill="#f28b8b" opacity=".45" />
      <ellipse cx="110" cy="86" rx="8" ry="5" fill="#f28b8b" opacity=".45" />
      <g className="eye">
        <ellipse cx="75" cy="68" rx="7" ry="9" fill="#1c1410" />
        <circle cx="77" cy="64" r="2.6" fill="#fff" />
      </g>
      <g className="eye">
        <ellipse cx="105" cy="68" rx="7" ry="9" fill="#1c1410" />
        <circle cx="107" cy="64" r="2.6" fill="#fff" />
      </g>
      <path d="M86 80 L94 80 L90 85 Z" fill="#e0607e" />
      <path d="M90 85 Q86 92 80 89 M90 85 Q94 92 100 89" stroke="#1c1410" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M48 76 L66 79 M48 86 L66 85 M132 76 L114 79 M132 86 L114 85" stroke="#1c1410" strokeWidth="1.6" strokeLinecap="round" opacity=".6" />
    </svg>
  );
};
