import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import ComparisonViewer from "../components/ComparisonViewer";
import ActionButtons from "../components/ActionButtons";
import { restorePhoto } from "../services/geminiService";
import { UploadedImage } from "../types";

// ── Shared section header ──────────────────────────────────

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  sub?: string;
}

const SectionHead: React.FC<SectionHeadProps> = ({ eyebrow, title, sub }) => (
  <div className="text-center mx-auto mb-12" style={{ maxWidth: "var(--container-md)" }}>
    <div className="ss-eyebrow mb-3">{eyebrow}</div>
    <h2
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(30px, 3.6vw, 44px)",
        lineHeight: 1.1,
        color: "var(--text-strong)",
        margin: 0,
      }}
    >
      {title}
    </h2>
    {sub && (
      <p
        className="mt-3"
        style={{ fontSize: "var(--text-md)", color: "var(--text-muted)", lineHeight: 1.55 }}
      >
        {sub}
      </p>
    )}
  </div>
);

// ── Restore tool (centerpiece) ─────────────────────────────

const SAMPLES = [
  { id: "windmill", label: "Windmill", before: "/assets/samples/windmill-before.png", after: "/assets/samples/windmill-after.png" },
  { id: "cabin",    label: "Cabin",    before: "/assets/samples/cabin-before.png",    after: "/assets/samples/cabin-after.png"    },
  { id: "homestead",label: "Homestead",before: "/assets/samples/homestead-before.png",after: "/assets/samples/homestead-after.png"},
];

interface RestoreToolProps {
  originalImage: UploadedImage | null;
  restoredImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onImageUpload: (file: File) => void;
  onRestore: (colorize: boolean) => void;
  onReset: () => void;
  setError: (e: string | null) => void;
}

const RestoreToolCard: React.FC<RestoreToolProps> = ({
  originalImage,
  restoredImageUrl,
  isLoading,
  error,
  onImageUpload,
  onRestore,
  onReset,
  setError,
}) => {
  const handleSample = (sample: typeof SAMPLES[0]) => {
    // Load sample as an UploadedImage-like object by dispatching a synthetic upload
    fetch(sample.before)
      .then((r) => r.blob())
      .then((blob) => {
        const file = new File([blob], `${sample.id}-before.jpg`, { type: "image/jpeg" });
        onImageUpload(file);
      });
  };

  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-2xl)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-default)",
        padding: "var(--space-6)",
      }}
    >
      {/* idle: upload zone + sample picker */}
      {!originalImage && !isLoading && (
        <div>
          <ImageUploader onImageUpload={onImageUpload} setError={setError} />
          <div className="mt-5">
            <div
              className="text-center mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
              }}
            >
              Or try a real restoration
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {SAMPLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSample(s)}
                  className="p-0 cursor-pointer overflow-hidden transition-opacity hover:opacity-80"
                  style={{
                    border: "1px solid var(--border-default)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--ink-900)",
                    aspectRatio: "4/3",
                  }}
                  title={`Try ${s.label} sample`}
                >
                  <img
                    src={s.before}
                    alt={s.label}
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(1) sepia(0.35) contrast(0.92)" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* uploaded: preview + action buttons */}
      {originalImage && !restoredImageUrl && !isLoading && (
        <div className="flex flex-col gap-5">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "var(--radius-lg)",
              background: "var(--ink-900)",
              aspectRatio: "4 / 3",
            }}
          >
            <img
              src={originalImage.dataUrl}
              alt="Your photo to restore"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(1) sepia(0.4) contrast(0.9)" }}
            />
            <span
              className="absolute top-3 left-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--paper-50)",
                background: "rgba(42,32,24,0.65)",
                backdropFilter: "blur(6px)",
                borderRadius: "var(--radius-pill)",
                padding: "4px 10px",
              }}
            >
              Original
            </span>
          </div>
          <ActionButtons
            isLoading={isLoading}
            restoredImageUrl={restoredImageUrl}
            originalImageFileName={originalImage.file.name}
            onRestore={onRestore}
            onReset={onReset}
          />
        </div>
      )}

      {/* processing */}
      {isLoading && (
        <ActionButtons
          isLoading={isLoading}
          restoredImageUrl={null}
          originalImageFileName={originalImage?.file.name}
          onRestore={onRestore}
          onReset={onReset}
        />
      )}

      {/* done: comparison slider + download */}
      {restoredImageUrl && originalImage && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 12px",
                borderRadius: "var(--radius-pill)",
                background: "var(--success-soft)",
                color: "var(--success)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Restored
            </span>
          </div>
          <ComparisonViewer
            original={originalImage.dataUrl}
            restored={restoredImageUrl}
          />
          <ActionButtons
            isLoading={isLoading}
            restoredImageUrl={restoredImageUrl}
            originalImageFileName={originalImage.file.name}
            onRestore={onRestore}
            onReset={onReset}
          />
        </div>
      )}

      {/* error */}
      {error && (
        <div
          className="mt-4 px-4 py-3 rounded-[var(--radius-md)] text-center"
          role="alert"
          style={{
            background: "var(--danger-soft)",
            border: "1px solid var(--danger)",
            color: "var(--danger)",
            fontSize: "var(--text-sm)",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

// ── Features section ───────────────────────────────────────

const FEATURES = [
  {
    icon: "✂",
    title: "Scratch & tear removal",
    body: "We identify cracks, creases and dust, then fill them by reading the surrounding image — never a smudge.",
    tone: "terracotta",
  },
  {
    icon: "◉",
    title: "Face recovery",
    body: "Generative facial priors sharpen blurred faces while preserving the exact features you remember.",
    tone: "teal",
  },
  {
    icon: "◈",
    title: "Period-accurate color",
    body: "Black-and-white frames become vibrant with historically grounded, never-neon colorization.",
    tone: "success",
  },
];

const toneColors: Record<string, { bg: string; color: string }> = {
  terracotta: { bg: "var(--accent-soft)", color: "var(--accent)" },
  teal:       { bg: "var(--secondary-soft)", color: "var(--secondary)" },
  success:    { bg: "var(--success-soft)", color: "var(--success)" },
};

const Features: React.FC = () => (
  <section
    id="features"
    style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-20) var(--space-6)" }}
  >
    <SectionHead
      eyebrow="What it does"
      title="Archival-grade repair, automatically"
      sub="Every photo is treated as a priceless document — repaired with care, not over-smoothed into plastic."
    />
    <div className="grid md:grid-cols-3 gap-6">
      {FEATURES.map((f) => {
        const { bg, color } = toneColors[f.tone];
        return (
          <div
            key={f.title}
            className="card-hoverable"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-6)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-md)",
                background: bg,
                color,
                fontSize: 22,
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: 600,
                color: "var(--text-strong)",
                margin: "0 0 8px",
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
              {f.body}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);

// ── How it works section ───────────────────────────────────

const HOW_STEPS = [
  { num: "01", title: "Upload",            body: "Drag in a JPG, PNG or WEBP up to 10MB. Processed in memory, never saved." },
  { num: "02", title: "Choose",            body: "Restore in black & white, or restore and colorize in one pass." },
  { num: "03", title: "Let the AI work",   body: "A few seconds while damage is mended and faces are recovered." },
  { num: "04", title: "Compare & download",body: "Drag the slider to see the difference, then save your restored frame." },
];

const HowItWorks: React.FC = () => (
  <section
    id="how-it-works"
    style={{
      background: "var(--bg-page-alt)",
      borderTop: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
    }}
  >
    <div
      style={{ maxWidth: "var(--container-xl)", margin: "0 auto", padding: "var(--space-20) var(--space-6)" }}
    >
      <SectionHead eyebrow="How it works" title="Four steps to a second life" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {HOW_STEPS.map((s) => (
          <div
            key={s.num}
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-5)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-faint)",
                letterSpacing: "0.1em",
                marginBottom: 12,
              }}
            >
              {s.num}
            </div>
            <h3
              style={{
                fontSize: "var(--text-md)",
                fontWeight: 600,
                color: "var(--text-strong)",
                margin: "0 0 6px",
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ section ────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Is my photo data safe?",
    a: "Yes. Photos are processed in memory and deleted immediately after. We never store your personal images.",
  },
  {
    q: "How much does it cost?",
    a: "SnapStitch is free to use, supported by unobtrusive ads that cover our server costs.",
  },
  {
    q: "What's the maximum file size?",
    a: "We currently support images up to 10MB in JPG, PNG and WEBP.",
  },
];

const Faq: React.FC = () => (
  <section style={{ maxWidth: "var(--container-md)", margin: "0 auto", padding: "var(--space-20) var(--space-6)" }}>
    <SectionHead eyebrow="Good to know" title="Frequently asked" />
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map(({ q, a }) => (
        <div
          key={q}
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--space-5)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h3
            style={{
              fontSize: "var(--text-md)",
              fontWeight: 600,
              color: "var(--text-strong)",
              margin: "0 0 8px",
            }}
          >
            {q}
          </h3>
          <p style={{ fontSize: "var(--text-base)", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
            {a}
          </p>
        </div>
      ))}
    </div>
  </section>
);

// ── Main Home page ─────────────────────────────────────────

const Home: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage({ file, dataUrl: e.target?.result as string });
      setRestoredImageUrl(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRestore = async (colorize: boolean) => {
    if (!originalImage) return;
    setIsLoading(true);
    setError(null);
    setRestoredImageUrl(null);
    try {
      const resultUrl = await restorePhoto(originalImage.file, colorize);
      setRestoredImageUrl(resultUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setRestoredImageUrl(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section id="top" style={{ position: "relative", overflow: "hidden" }}>
        {/* Soft radial washes */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 80% 0%, var(--teal-50) 0%, transparent 55%), radial-gradient(90% 70% at 0% 100%, var(--terracotta-50) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="relative mx-auto px-6 grid items-center gap-16"
          style={{
            maxWidth: "var(--container-xl)",
            paddingTop: "var(--space-20)",
            paddingBottom: "var(--space-16)",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Left: copy */}
          <div>
            <div className="ss-eyebrow mb-4">· AI Photo Restoration Studio ·</div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5vw, 68px)",
                lineHeight: 1.04,
                letterSpacing: "-0.01em",
                color: "var(--text-strong)",
                margin: "0 0 20px",
              }}
            >
              Bring your old
              <br />
              photos back to life.
            </h1>
            <p
              style={{
                fontSize: "var(--text-md)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--text-body)",
                maxWidth: 460,
                margin: 0,
              }}
            >
              Upload a faded, scratched or torn photograph. Our AI mends the
              damage, recovers lost faces, and can colorize a century of memories
              — in seconds.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2.5 mt-7">
              {[
                { label: "Never stored", tone: "teal" },
                { label: "Seconds, not days", tone: "terracotta" },
                { label: "Free to use", tone: "neutral" },
              ].map(({ label, tone }) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 14px",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    fontFamily: "var(--font-sans)",
                    background:
                      tone === "teal"
                        ? "var(--teal-50)"
                        : tone === "terracotta"
                        ? "var(--terracotta-50)"
                        : "var(--paper-100)",
                    color:
                      tone === "teal"
                        ? "var(--teal-700)"
                        : tone === "terracotta"
                        ? "var(--terracotta-700)"
                        : "var(--ink-600)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: restore tool */}
          <div>
            <RestoreToolCard
              originalImage={originalImage}
              restoredImageUrl={restoredImageUrl}
              isLoading={isLoading}
              error={error}
              onImageUpload={handleImageUpload}
              onRestore={handleRestore}
              onReset={handleReset}
              setError={setError}
            />
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Faq />
    </>
  );
};

export default Home;
