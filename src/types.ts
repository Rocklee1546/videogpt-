export interface TaskItem {
  id: string;
  label: string;
}

export interface PromptData {
  title: string;
  subtitle: string;
  content: string;
}

export interface StageData {
  id: number;
  title: string;
  subtitle: string;
  msg: string;
  lead: string;
  tasks: TaskItem[];
  ctaLink?: {
    title: string;
    subtitle: string;
    url: string;
  };
  examples?: string[];
  note?: string;
  backupPrompt?: PromptData;
  mainPrompt?: PromptData;
}

export interface PlaybookState {
  started: boolean;
  current: number;
  openStages: number[];
  done: number[];
  checks: Record<string, boolean>;
}

export interface ActionButton {
  label: string;
  cls?: 'btn-primary' | 'btn-ghost' | 'btn-ok';
  onClick: () => void;
}
