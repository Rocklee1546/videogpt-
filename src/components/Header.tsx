import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <>
      <button
        className="theme-toggle"
        id="themeToggle"
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <header className="hero">
        <div className="hero-inner">
          <div>
            <span className="badge">Playbook · Viral Object Content</span>
            <h1>Talking Object Video Playbook</h1>
            <p>
              Make a laptop, a tomato or a pressure cooker talk, joke and sell. Follow Dino the dinosaur through 5 stages and finish with a ready-to-post vertical video.
            </p>
          </div>
          <div className="chips">
            <span>Object Talk GPT</span>
            <span>Claude</span>
            <span>Flow Agent · Omni Flash 1.1</span>
            <span>9:16</span>
            <span>10 sec per clip</span>
          </div>
        </div>
      </header>
    </>
  );
};
