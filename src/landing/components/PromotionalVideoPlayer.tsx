import React, { useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';

interface PromotionalVideoPlayerProps {
  videoId?: string;
  thumbnailUrl?: string;
}

export const PromotionalVideoPlayer: React.FC<PromotionalVideoPlayerProps> = ({
  videoId = '1-91aVYpyp8hjS2qk02d517uKf1yXq6ZD',
  thumbnailUrl = '/thynk-video-thumbnail.jpg'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Google Drive embed preview URL with autoplay flag
  const embedUrl = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1`;

  const handleStartPlay = () => {
    setIsPlaying(true);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  return (
    <div className="hero-large-video-showcase">
      <div 
        className={`large-video-frame-box ${isPlaying ? 'is-playing' : 'is-thumbnail'}`}
        onClick={!isPlaying ? handleStartPlay : undefined}
        role={!isPlaying ? 'button' : undefined}
        tabIndex={!isPlaying ? 0 : undefined}
        onKeyDown={(e) => {
          if (!isPlaying && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleStartPlay();
          }
        }}
        aria-label={!isPlaying ? 'Click to play THYNK promotional video' : undefined}
      >
        {isPlaying ? (
          /* Active Google Drive HTML5 Player with full controls (Play/Pause, Sound, Timeline, Fullscreen) */
          <div className="large-video-iframe-wrap">
            <iframe
              src={embedUrl}
              title="THYNK Digital Solution — AI Viral Video Creation Playbook"
              className="large-video-iframe"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button 
              type="button" 
              onClick={handleReset} 
              className="btn-close-video-overlay"
              title="Reset thumbnail"
            >
              <RotateCcw size={14} />
              <span>Reset Cover</span>
            </button>
          </div>
        ) : (
          /* Initial State: Matches Image 3 & Image 4 reference */
          <div className="large-video-poster-wrap">
            <img 
              src={thumbnailUrl} 
              alt="THYNK AI Viral Video Creation Playbook by Gokul Ravi" 
              className="large-video-poster-img"
            />
            <div className="large-video-poster-scrim" />

            {/* Top Right "CLICK TO TURN ON SOUND" Callout (Matching Image 3) */}
            <div className="video-sound-callout-pill">
              <div className="callout-speaker-circle">
                <Volume2 size={16} className="speaker-icon" />
              </div>
              <span className="callout-text">CLICK TO TURN ON SOUND</span>
            </div>

            {/* Centered Large Play Button (Matching Image 3) */}
            <div className="large-play-button-circle">
              <div className="play-triangle-glyph" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
