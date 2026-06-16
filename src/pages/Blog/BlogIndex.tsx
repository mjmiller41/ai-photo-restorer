import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../../utils/blogLoader';

const BlogIndex: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogPosts().then(setPosts);
  }, []);

  return (
    <div
      style={{
        background: "var(--bg-page-alt)",
        minHeight: "60vh",
      }}
    >
      <div
        className="mx-auto px-6 py-20"
        style={{ maxWidth: "var(--container-xl)" }}
      >
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="ss-eyebrow mb-3">From the journal</div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.2vw, 40px)",
                lineHeight: 1.1,
                color: "var(--text-strong)",
                margin: 0,
              }}
            >
              Tips &amp; tales of restoration
            </h1>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="card-hoverable overflow-hidden"
              style={{
                background: "var(--surface-card)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ padding: "var(--space-5)" }}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-faint)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>

                <Link to={`/blog/${post.slug}`} className="no-underline block group">
                  <h2
                    className="mb-2 transition-colors"
                    style={{
                      fontSize: "var(--text-md)",
                      fontWeight: 600,
                      color: "var(--text-strong)",
                      lineHeight: 1.3,
                      margin: "0 0 8px",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLHeadingElement).style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLHeadingElement).style.color = "var(--text-strong)")
                    }
                  >
                    {post.title}
                  </h2>
                </Link>

                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-muted)",
                    lineHeight: 1.55,
                    margin: "0 0 16px",
                  }}
                >
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="no-underline inline-flex items-center gap-1.5 transition-colors"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 600,
                    color: "var(--accent)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-hover)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")
                  }
                >
                  Read more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ color: "var(--text-muted)", textAlign: "center", marginTop: 48 }}>
            No articles yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;
