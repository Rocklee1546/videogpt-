import React from 'react';
import type { StageData } from '../types';
import { PromptBlock } from './PromptBlock';

interface StageCardProps {
  stage: StageData;
  isOpen: boolean;
  isCurrent: boolean;
  isDone: boolean;
  checks: Record<string, boolean>;
  onToggleOpen: (id: number) => void;
  onToggleTask: (taskId: string, stageId: number) => void;
  onCompleteStage: (id: number) => void;
}

export const StageCard: React.FC<StageCardProps> = ({
  stage,
  isOpen,
  isCurrent,
  isDone,
  checks,
  onToggleOpen,
  onToggleTask,
  onCompleteStage
}) => {
  const statusText = isDone ? 'Done' : isCurrent ? 'In progress' : 'To do';

  return (
    <section
      className={`stage ${isOpen ? 'open' : ''} ${isCurrent ? 'current' : ''} ${isDone ? 'done' : ''}`}
      id={`stage-${stage.id}`}
    >
      <div
        className="stage-head"
        onClick={() => onToggleOpen(stage.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleOpen(stage.id);
          }
        }}
      >
        <div className="stage-num">{stage.id}</div>
        <div className="stage-title">
          <small>{stage.subtitle}</small>
          <h2>{stage.title}</h2>
        </div>
        <span className="status">{statusText}</span>
        <span className="chev">▾</span>
      </div>

      <div className="stage-body">
        {stage.id === 1 ? (
          <div className="stage-grid">
            <div>
              {stage.ctaLink && (
                <a
                  className="cta-link"
                  href={stage.ctaLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <b>{stage.ctaLink.title}</b>
                    <small>{stage.ctaLink.subtitle}</small>
                  </div>
                  <span className="arrow">↗</span>
                </a>
              )}
              {stage.examples && (
                <div className="example">
                  Type only the object name, nothing else:
                  <br />
                  {stage.examples.map((ex, idx) => (
                    <code key={idx} style={{ marginRight: 6 }}>
                      {ex}
                    </code>
                  ))}
                </div>
              )}
              <p className="lead" style={{ margin: 0 }}>
                {stage.lead}
              </p>
            </div>
            <div>
              <ul className="tasks">
                {stage.tasks.map((task) => {
                  const isChecked = !!checks[task.id];
                  return (
                    <li key={task.id}>
                      <label className={`task ${isChecked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleTask(task.id, stage.id)}
                        />
                        <span>{task.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {stage.backupPrompt && (
                <details className="more">
                  <summary>GPT not opening? Use this backup prompt in normal ChatGPT</summary>
                  <PromptBlock prompt={stage.backupPrompt} />
                </details>
              )}
            </div>
          </div>
        ) : stage.id === 2 || stage.id === 3 ? (
          <div className="stage-grid">
            <div>
              <p className="lead">{stage.lead}</p>
              <ul className="tasks">
                {stage.tasks.map((task) => {
                  const isChecked = !!checks[task.id];
                  return (
                    <li key={task.id}>
                      <label className={`task ${isChecked ? 'checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleTask(task.id, stage.id)}
                        />
                        <span>
                          {task.label.includes('Attached my object image first') ? (
                            <>
                              <span className="warn">Attached my object image first</span>, before pasting anything.
                            </>
                          ) : (
                            task.label
                          )}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {stage.note && <p className="note">{stage.note}</p>}
            </div>
            {stage.mainPrompt && <PromptBlock prompt={stage.mainPrompt} />}
          </div>
        ) : (
          <>
            <p className="lead">{stage.lead}</p>
            <ul className="tasks">
              {stage.tasks.map((task) => {
                const isChecked = !!checks[task.id];
                return (
                  <li key={task.id}>
                    <label className={`task ${isChecked ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleTask(task.id, stage.id)}
                      />
                      <span>{task.label}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
            {stage.note && <p className="note">{stage.note}</p>}
          </>
        )}

        <div className="stage-foot">
          <button
            className="btn btn-ok done-btn"
            type="button"
            onClick={() => onCompleteStage(stage.id)}
          >
            Done, Stage {stage.id} complete
          </button>
        </div>
      </div>
    </section>
  );
};
