import React, { useState } from 'react';
import type { PromptData } from '../types';

interface PromptBlockProps {
  prompt: PromptData;
}

export const PromptBlock: React.FC<PromptBlockProps> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = prompt.content;

    const copySuccess = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1800);
    };

    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        copySuccess();
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy).then(copySuccess, fallbackCopy);
    } else {
      fallbackCopy();
    }
  };

  return (
    <div className="prompt">
      <div className="prompt-head">
        <div>
          <strong>{prompt.title}</strong>
          <small>{prompt.subtitle}</small>
        </div>
        <button
          className={`copy ${copied ? 'done' : ''}`}
          type="button"
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{prompt.content}</pre>
    </div>
  );
};
