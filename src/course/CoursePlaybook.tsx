import { useState, useEffect, useCallback } from 'react';
import { STAGES } from '../data/playbookData';
import type { PlaybookState, ActionButton } from '../types';
import { Header } from '../components/Header';
import { GuideAssistant } from '../components/GuideAssistant';
import { StageCard } from '../components/StageCard';
import { Toolkit } from '../components/Toolkit';
import { Footer } from '../components/Footer';
import { ResetModal } from '../components/ResetModal';
import { Toast } from '../components/Toast';

const LOCAL_STORAGE_KEY = 'object-playbook-progress-v2';
const THEME_STORAGE_KEY = 'object-playbook-theme';

export interface CoursePlaybookProps {
  onBackToSales?: () => void;
}

export function CoursePlaybook({ onBackToSales }: CoursePlaybookProps) {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Playbook state
  const [state, setState] = useState<PlaybookState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          started: parsed.started ?? false,
          current: parsed.current ?? 0,
          openStages: parsed.openStages ?? [0],
          done: parsed.done ?? [],
          checks: parsed.checks ?? {}
        };
      }
    } catch (e) {
      console.error('Error loading state from localStorage', e);
    }
    return {
      started: false,
      current: 0,
      openStages: [0],
      done: [],
      checks: {}
    };
  });

  const [bubbleMsg, setBubbleMsg] = useState<string>('');
  const [bubbleActions, setBubbleActions] = useState<ActionButton[]>([]);
  const [isCheering, setIsCheering] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Save state helper
  const updateState = useCallback((updater: (prev: PlaybookState) => PlaybookState) => {
    setState((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Error saving state to localStorage', e);
      }
      return next;
    });
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 1800);
  };

  const cheer = () => {
    setIsCheering(true);
    setTimeout(() => {
      setIsCheering(false);
    }, 1500);
  };

  const _isDone = useCallback((stageId: number) => {
    return state.done.includes(stageId);
  }, [state.done]);
  void _isDone;

  const nextUndone = useCallback((from: number) => {
    const total = STAGES.length;
    for (let i = from; i < total; i++) {
      if (!state.done.includes(i)) return i;
    }
    for (let j = 0; j < from; j++) {
      if (!state.done.includes(j)) return j;
    }
    return -1;
  }, [state.done]);

  // Stage card collapse/expand
  const toggleStageOpen = (stageId: number) => {
    updateState((prev) => {
      const isOpen = prev.openStages.includes(stageId);
      const newOpenStages = isOpen
        ? prev.openStages.filter((id) => id !== stageId)
        : [...prev.openStages, stageId];
      return { ...prev, openStages: newOpenStages };
    });
  };

  // Helper to open a specific stage and optionally scroll
  const openStage = useCallback((stageId: number, andScroll = false) => {
    updateState((prev) => {
      const newOpen = prev.openStages.includes(stageId)
        ? prev.openStages
        : [...prev.openStages, stageId];
      return {
        ...prev,
        openStages: newOpen,
        current: stageId
      };
    });

    if (andScroll) {
      setTimeout(() => {
        const el = document.getElementById(`stage-${stageId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  }, [updateState]);

  // Guide assistant prompts
  const promptForStage = useCallback((stageId: number) => {
    const stage = STAGES[stageId];
    if (!stage) return;

    if (stageId === 0) {
      setBubbleMsg("Stage 0: let's get your tools ready. Tick each one as you go, then tap Done.");
      setBubbleActions([
        {
          label: 'Show me Stage 0',
          onClick: () => openStage(0, true)
        }
      ]);
    } else if (stageId === 1) {
      setBubbleMsg('Stage 1: tap the Object Talk GPT button, type ONLY your object name, and download the image.');
      setBubbleActions([
        {
          label: 'Show me Stage 1',
          onClick: () => openStage(1, true)
        }
      ]);
    } else if (stageId === 2) {
      setBubbleMsg('Stage 2: upload your object image to Claude and paste the director prompt.');
      setBubbleActions([
        {
          label: 'Show me Stage 2',
          onClick: () => openStage(2, true)
        }
      ]);
    } else if (stageId === 3) {
      setBubbleMsg('Stage 3: open Google Flow Agent, pick Omni Flash 1.1, and paste each clip prompt.');
      setBubbleActions([
        {
          label: 'Show me Stage 3',
          onClick: () => openStage(3, true)
        }
      ]);
    } else if (stageId === 4) {
      setBubbleMsg('Stage 4: import clips into CapCut or VN, trim them, add auto-captions and export.');
      setBubbleActions([
        {
          label: 'Show me Stage 4',
          onClick: () => openStage(4, true)
        }
      ]);
    }
  }, [openStage]);

  // Handle stage completion
  const completeStage = (stageId: number) => {
    cheer();
    triggerToast(`Stage ${stageId} complete!`);

    updateState((prev) => {
      const newDone = prev.done.includes(stageId) ? prev.done : [...prev.done, stageId];
      const stage = STAGES[stageId];
      const newChecks = { ...prev.checks };
      stage.tasks.forEach((t) => {
        newChecks[t.id] = true;
      });

      return {
        ...prev,
        done: newDone,
        checks: newChecks
      };
    });

    const next = nextUndone(stageId + 1);
    if (next === -1) {
      setBubbleMsg("That's all five stages! You're ready to make your first talking-object video.");
      setBubbleActions([
        {
          label: 'Back to top',
          onClick: () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      ]);
    } else {
      const nextTitle = STAGES[next].title;
      setBubbleMsg(`Great work on Stage ${stageId}! Ready for Stage ${next}: ${nextTitle}?`);
      setBubbleActions([
        {
          label: `Start Stage ${next}`,
          cls: 'btn-ok',
          onClick: () => {
            openStage(next, true);
            promptForStage(next);
          }
        },
        {
          label: 'Stay here',
          cls: 'btn-ghost',
          onClick: () => {
            setBubbleMsg(`Nice! You can review Stage ${stageId} or jump ahead anytime.`);
            setBubbleActions([]);
          }
        }
      ]);
    }
  };

  // Toggle single checklist task
  const handleToggleTask = (taskId: string, stageId: number) => {
    updateState((prev) => {
      const newChecks = {
        ...prev.checks,
        [taskId]: !prev.checks[taskId]
      };

      const stage = STAGES[stageId];
      const allChecked = stage.tasks.every((t) => newChecks[t.id]);
      const wasDone = prev.done.includes(stageId);

      let newDone = prev.done;
      if (!allChecked && wasDone) {
        newDone = prev.done.filter((id) => id !== stageId);
      }

      if (allChecked && !wasDone) {
        setTimeout(() => {
          setBubbleMsg(`Looks like everything in Stage ${stageId} is ticked. Is Stage ${stageId} done?`);
          setBubbleActions([
            {
              label: `Yes, Stage ${stageId} is done`,
              cls: 'btn-ok',
              onClick: () => completeStage(stageId)
            },
            {
              label: 'Not yet',
              cls: 'btn-ghost',
              onClick: () => promptForStage(stageId)
            }
          ]);
        }, 50);
      }

      return {
        ...prev,
        checks: newChecks,
        done: newDone
      };
    });
  };

  const handleResetConfirm = () => {
    setIsResetModalOpen(false);
    updateState(() => ({
      started: true,
      current: 0,
      openStages: [0],
      done: [],
      checks: {}
    }));
    triggerToast('Progress reset');
    openStage(0, true);
  };

  // Initial welcome dialog setup
  useEffect(() => {
    if (!state.started) {
      setBubbleMsg("Hi, I'm Dino. I'll guide you through this playbook step by step. Ready to begin?");
      setBubbleActions([
        {
          label: "Let's start",
          onClick: () => {
            updateState((prev) => ({ ...prev, started: true }));
            openStage(0, true);
          }
        }
      ]);
    } else {
      const n = nextUndone(state.current);
      if (n === -1) {
        setBubbleMsg('Welcome back! All stages are done. Ready for part 2?');
        setBubbleActions([
          {
            label: 'Review stages',
            cls: 'btn-ghost',
            onClick: () => openStage(0, true)
          }
        ]);
      } else {
        setBubbleMsg(`Welcome back! You were on Stage ${n}: ${STAGES[n].title}. Shall we continue?`);
        setBubbleActions([
          {
            label: `Continue Stage ${n}`,
            onClick: () => openStage(n, true)
          }
        ]);
      }
    }
  }, []);

  return (
    <div className="app-container">
      {onBackToSales && (
        <div style={{
          background: 'linear-gradient(90deg, #101510, #173D24)',
          borderBottom: '1px solid #69C94A',
          padding: '10px 16px',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '14px',
          fontWeight: 500,
          zIndex: 100,
          position: 'sticky',
          top: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#69C94A',
              color: '#0D120E',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '11px',
              textTransform: 'uppercase'
            }}>
              Active Offer
            </span>
            <span>ObjectFlow Playbook — Get Lifetime Access for just ₹299!</span>
          </div>
          <button
            onClick={onBackToSales}
            style={{
              background: 'transparent',
              border: '1px solid #69C94A',
              color: '#69C94A',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#69C94A';
              e.currentTarget.style.color = '#0D120E';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#69C94A';
            }}
          >
            ← View Sales Landing Page
          </button>
        </div>
      )}

      <Toast message={toastMsg} />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <div className="layout">
        <GuideAssistant
          stages={STAGES}
          currentStage={state.current}
          doneStages={state.done}
          bubbleMsg={bubbleMsg}
          bubbleActions={bubbleActions}
          isCheering={isCheering}
          onOpenStage={(id) => openStage(id, true)}
          onRequestReset={() => setIsResetModalOpen(true)}
        />

        <main className="main">
          {STAGES.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isOpen={state.openStages.includes(stage.id)}
              isCurrent={state.current === stage.id && !state.done.includes(stage.id)}
              isDone={state.done.includes(stage.id)}
              checks={state.checks}
              onToggleOpen={toggleStageOpen}
              onToggleTask={handleToggleTask}
              onCompleteStage={completeStage}
            />
          ))}

          <Toolkit />
        </main>
      </div>

      <Footer />

      <ResetModal
        isOpen={isResetModalOpen}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}
export default CoursePlaybook;
