import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SparkleIcon } from "./icons";

const NAV_LINKS = [
  { label: "Restore", to: "/" },
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "Journal", to: "/blog" },
];

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "color-mix(in srgb, var(--paper-50) 86%, transparent)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border-subtle)",
        height: "var(--header-height)",
      }}
    >
      <div
        className="flex items-center justify-between h-full mx-auto px-6"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        {/* Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <img
            src="/assets/logo/snapstitch-icon.png"
            alt="SnapStitch"
            className="w-[38px] h-[38px] rounded-[9px]"
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            <span style={{ color: "var(--secondary)" }}>Snap</span>
            <span style={{ color: "var(--accent)" }}>Stitch</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="no-underline transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--text-body)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-body)")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            className="btn-press px-3 py-1.5 rounded-[var(--radius-sm)] transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 500,
              color: "var(--text-body)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--accent)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "var(--text-body)")
            }
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn-press flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-sm)] transition-colors"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              background: "var(--accent)",
              color: "var(--accent-on)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--accent-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "var(--accent)")
            }
          >
            <SparkleIcon className="w-4 h-4" />
            Restore a photo
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
