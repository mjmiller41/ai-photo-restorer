import React from 'react';
import { DownloadIcon, ResetIcon, SparkleIcon, ColorPaletteIcon } from './icons';
import Spinner from './Spinner';
import { ActionButtonsProps } from '../types';

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '12px 28px',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--text-base)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  cursor: 'pointer',
  border: 'none',
  transition: `background var(--duration-base) var(--ease-standard), color var(--duration-base) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)`,
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  restoredImageUrl,
  originalImageFileName,
  onRestore,
  onReset,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-5">
        <Spinner />
        <div className="text-center">
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text-strong)' }}>
            Restoring history…
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 8 }}>
            Repairing scratches · recovering faces
          </div>
        </div>
      </div>
    );
  }

  if (restoredImageUrl) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={restoredImageUrl}
          download={`restored-${originalImageFileName || 'photo.jpg'}`}
          className="btn-press flex items-center justify-center gap-2 no-underline"
          style={{
            ...btnBase,
            background: 'var(--accent)',
            color: 'var(--accent-on)',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)')}
        >
          <DownloadIcon className="w-5 h-5" />
          Download
        </a>
        <button
          onClick={onReset}
          className="btn-press"
          style={{
            ...btnBase,
            background: 'transparent',
            color: 'var(--text-body)',
            border: '1px solid var(--border-default)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)';
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--paper-100)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <ResetIcon className="w-5 h-5" />
          Restore another
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
      <button
        onClick={() => onRestore(false)}
        disabled={isLoading}
        className="btn-press w-full sm:w-auto"
        style={{
          ...btnBase,
          background: 'var(--secondary)',
          color: 'var(--secondary-on)',
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--secondary-hover)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--secondary)';
        }}
      >
        <SparkleIcon className="w-5 h-5" />
        Restore in B&W
      </button>
      <button
        onClick={() => onRestore(true)}
        disabled={isLoading}
        className="btn-press w-full sm:w-auto"
        style={{
          ...btnBase,
          background: 'var(--accent)',
          color: 'var(--accent-on)',
          opacity: isLoading ? 0.5 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => {
          if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
        }}
      >
        <ColorPaletteIcon className="w-5 h-5" />
        Restore &amp; colorize
      </button>
      <button
        onClick={onReset}
        className="btn-press w-full sm:w-auto"
        style={{
          ...btnBase,
          background: 'transparent',
          color: 'var(--text-muted)',
          border: 'none',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-body)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
      >
        <ResetIcon className="w-5 h-5" />
        Start over
      </button>
    </div>
  );
};

export default ActionButtons;
