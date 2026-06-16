import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';

const FOOTER_COLS = [
  ["Product", ["Restore", "Colorize", "Pricing", "API"]],
  ["Company", ["About", "Journal", "Contact", "Privacy"]],
  ["Support", ["Help center", "Terms", "Status", "support@snap-stitch.com"]],
] as const;

const MainLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--bg-page)",
        color: "var(--text-body)",
      }}
    >
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)" }}>
        <div
          className="mx-auto grid gap-10 px-6 pt-16 pb-8"
          style={{
            maxWidth: "var(--container-xl)",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          }}
        >
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/logo/snapstitch-icon.png"
                alt="SnapStitch"
                className="w-9 h-9 rounded-lg"
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                <span style={{ color: "var(--teal-200)" }}>Snap</span>
                <span style={{ color: "var(--terracotta-300)" }}>Stitch</span>
              </span>
            </div>
            <p
              className="mt-4"
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--paper-300)",
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              Memories, mended. Professional-grade photo restoration, made
              simple for everyone.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(([heading, items]) => (
            <div key={heading}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--terracotta-300)",
                  marginBottom: 14,
                }}
              >
                {heading}
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="no-underline transition-colors"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--paper-200)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--paper-50)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--paper-200)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div
            className="mx-auto flex justify-between px-6 py-5"
            style={{
              maxWidth: "var(--container-xl)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--paper-300)",
            }}
          >
            <span>© 2025 SnapStitch · Powered by Google Gemini</span>
            <span>Made for memory-keepers</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
