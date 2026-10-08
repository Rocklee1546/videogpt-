import { useState, useEffect, useCallback } from 'react';
import { STAGES } from './data/playbookData';
import type { PlaybookState, ActionButton } from './types';
import { Header } from './components/Header';
import { GuideAssistant } from './components/GuideAssistant';
import { StageCard } from './components/StageCard';
import { Toolkit } from './components/Toolkit';
import { Footer } from './components/Footer';
import { ResetModal } from './components/ResetModal';
import { Toast } from './components/Toast';

const LOCAL_STORAGE_KEY = 'object-playbook-progress-v2';
const THEME_STORAGE_KEY = 'object-playbook-theme';

export function App() {
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

  const isDone = useCallback((stageId: number) => {
    return state.done.includes(stageId);
  }, [state.done]);

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

  const promptForStage = useCallback((i: number) => {
    if (isDone(i)) {
      const n = nextUndone(i);
      setBubbleMsg(
        `Stage ${i} is already done. ${
          n > -1 ? `Want to jump to Stage ${n}?` : 'Everything is complete!'
        }`
      );
      setBubbleActions(
        n > -1
          ? [
              {
                label: `Go to Stage ${n}`,
                onClick: () => openStage(n, true)
              }
            ]
          : []
      );
      return;
    }

    setBubbleMsg(STAGES[i].msg);
    setBubbleActions([
      {
        label: `Done, Stage ${i} complete`,
        cls: 'btn-ok',
        onClick: () => completeStage(i)
      },
      {
        label: 'Show me',
        cls: 'btn-ghost',
        onClick: () => {
          openStage(i, true);
        }
      }
    ]);
  }, [isDone, nextUndone]);

  const openStage = useCallback((i: number, scroll = false) => {
    updateState((prev) => ({
      ...prev,
      current: i,
      openStages: prev.openStages.includes(i) ? prev.openStages : [...prev.openStages, i]
    }));

    promptForStage(i);

    if (scroll) {
      setTimeout(() => {
        const stageEl = document.getElementById(`stage-${i}`);
        if (stageEl) {
          stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [promptForStage, updateState]);

  const toggleStageOpen = (i: number) => {
    updateState((prev) => {
      const isOpen = prev.openStages.includes(i);
      const nextOpen = isOpen
        ? prev.openStages.filter((id) => id !== i)
        : [...prev.openStages, i];
      return {
        ...prev,
        current: i,
        openStages: nextOpen
      };
    });
    promptForStage(i);
  };

  const completeStage = (i: number) => {
    updateState((prev) => {
      const nextDone = prev.done.includes(i) ? prev.done : [...prev.done, i];
      const stageTasks = STAGES[i].tasks;
      const nextChecks = { ...prev.checks };
      stageTasks.forEach((t) => {
        nextChecks[t.id] = true;
      });
      return {
        ...prev,
        done: nextDone,
        checks: nextChecks
      };
    });

    cheer();
    triggerToast(`Stage ${i} complete`);

    const n = nextUndone(i);
    if (n === -1) {
      setBubbleMsg(
        'Yay! All 5 stages are done. Your talking object video is ready to go viral. Want to make part 2? Just ask Claude for the next episode.'
      );
      setBubbleActions([
        {
          label: 'Review stages',
          cls: 'btn-ghost',
          onClick: () => openStage(0, true)
        }
      ]);
      return;
    }

    setBubbleMsg(
      `Stage ${i} is done! Great work. Are you ready for Stage ${n}: ${STAGES[n].title}?`
    );
    setBubbleActions([
      {
        label: `Yes, go to Stage ${n}`,
        onClick: () => openStage(n, true)
      },
      {
        label: 'Not yet',
        cls: 'btn-ghost',
        onClick: () => {
          setBubbleMsg(`No rush. Tap Stage ${n} when you are ready.`);
          setBubbleActions([
            {
              label: `Go to Stage ${n}`,
              onClick: () => openStage(n, true)
            }
          ]);
        }
      }
    ]);
  };

  const handleToggleTask = (taskId: string, stageId: number) => {
    updateState((prev) => {
      const isCurrentlyChecked = !!prev.checks[taskId];
      const newChecks = { ...prev.checks, [taskId]: !isCurrentlyChecked };
      let newDone = [...prev.done];

      if (isCurrentlyChecked && newDone.includes(stageId)) {
        newDone = newDone.filter((id) => id !== stageId);
      }

      const stageTasks = STAGES[stageId].tasks;
      const allCheckedNow = stageTasks.every((t) => newChecks[t.id]);

      if (allCheckedNow && !newDone.includes(stageId)) {
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
  }, []); // Run once on mount

  return (
    <div className="app-container">
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

export default App;
