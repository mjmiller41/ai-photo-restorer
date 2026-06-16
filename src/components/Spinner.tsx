import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div
      className="ss-spin"
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: '4px solid var(--paper-200)',
        borderTopColor: 'var(--accent)',
        flexShrink: 0,
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
