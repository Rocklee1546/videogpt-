import React, { useState, useEffect } from 'react';
import type { StageData, ActionButton } from '../types';
import { DinoMascot } from './DinoMascot';

interface GuideAssistantProps {
  stages: StageData[];
  currentStage: number;
  doneStages: number[];
  bubbleMsg: string;
  bubbleActions: ActionButton[];
  isCheering: boolean;
  onOpenStage: (stageId: number) => void;
  onRequestReset: () => void;
}

export const GuideAssistant: React.FC<GuideAssistantProps> = ({
  stages,
  currentStage,
  doneStages,
  bubbleMsg,
  bubbleActions,
  isCheering,
  onOpenStage,
  onRequestReset
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const totalStages = stages.length;
  const doneCount = doneStages.length;
  const pct = Math.round((doneCount / totalStages) * 100);

  // Update mobile dock height variable for body padding
  useEffect(() => {
    const measureDock = () => {
      if (window.matchMedia('(max-width:900px)').matches) {
        const guideEl = document.getElementById('guide');
        if (guideEl) {
          document.body.style.setProperty('--dock-h', `${guideEl.offsetHeight + 16}px`);
        }
      } else {
        document.body.style.removeProperty('--dock-h');
      }
    };

    measureDock();
    window.addEventListener('resize', measureDock);
    return () => window.removeEventListener('resize', measureDock);
  }, [bubbleMsg, bubbleActions, isMinimized]);

  return (
    <aside
      className={`guide ${isMinimized ? 'min' : ''}`}
      id="guide"
      aria-label="Step-by-step guide"
    >
      <div className="guide-card">
        <button
          className="dock-toggle"
          id="dockToggle"
          type="button"
          aria-label={isMinimized ? 'Expand guide' : 'Minimise guide'}
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? '▴' : '▾'}
        </button>

        <div className="guide-top">
          <div className="dino-wrap">
            <DinoMascot isCheering={isCheering} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="dino-name">Dino · your guide</div>
            <div className="bubble" id="bubble" aria-live="polite">
              {bubbleMsg}
            </div>
          </div>
        </div>

        <div className="bubble-actions" id="bubbleActions">
          {bubbleActions.map((btn, idx) => (
            <button
              key={idx}
              type="button"
              className={`btn ${btn.cls || 'btn-primary'}`}
              onClick={btn.onClick}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="progress">
          <div className="progress-label">
            <span id="progressText">{doneCount} of {totalStages} stages done</span>
            <span id="progressPct">{pct}%</span>
          </div>
          <div className="bar">
            <span id="progressBar" style={{ width: `${pct}%` }}></span>
          </div>
        </div>
      </div>

      <ol className="tracker" id="tracker">
        {stages.map((st) => {
          const isDone = doneStages.includes(st.id);
          const isCurrent = currentStage === st.id && !isDone;
          return (
            <li
              key={st.id}
              className={`${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <button type="button" onClick={() => onOpenStage(st.id)}>
                <span className="dot">
                  <span>{st.id}</span>
                </span>
                <span>
                  Stage {st.id} · {st.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <button
        className="reset"
        id="resetBtn"
        type="button"
        onClick={onRequestReset}
      >
        Start over
      </button>
    </aside>
  );
};
