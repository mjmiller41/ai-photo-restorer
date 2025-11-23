# Monetization Implementation Plan

## Goal

Implement programmatic elements suggested in the monetization roadmap to make SnapStitch eligible for AdSense, focusing on SPA architecture, content expansion, and compliance.

## Proposed Changes

### 1. Architecture Refactoring

- **Install `react-router-dom`**: Enable client-side routing.
- **`src/layouts/MainLayout.tsx`**: Create a layout component that wraps pages. It will contain the `Header` and `Footer`.
- **`src/pages/Home.tsx`**: Move the current `App.tsx` photo restoration logic here.
- **`src/App.tsx`**: Replace the single-component logic with `BrowserRouter` and `Routes`.

### 2. Ad Unit Integration

- **`public/ads.txt`**: Create this file with the publisher ID (placeholder for now).
- **`src/components/AdUnit.tsx`**: Create a reusable component for AdSense units.
  - **Logic**:
    - Load `adsbygoogle.js` script (if not already loaded).
    - Detect route changes to refresh ads (destroy and recreate slot).
    - Handle `TagError` (adsbygoogle.push error).
    - Props: `slotId`, `format`, `style`.

### 3. Compliance & Legal Pages

- **`src/pages/PrivacyPolicy.tsx`**: Static page with GDPR/CCPA compliant text placeholders.
- **`src/pages/TermsOfService.tsx`**: Static page with ToS text placeholders.
- **`src/pages/About.tsx`**: "About Us" page with mission statement and team info placeholders.
- **`src/pages/Contact.tsx`**: Contact page with email/form placeholders.

### 4. Content Expansion

- **`src/pages/Home.tsx`**: Add semantic sections below the tool:
  - **Features**: `<h2>` headers for "AI Scratch Removal", etc.
  - **How-To**: Step-by-step guide.
  - **FAQ**: Accordion style questions.
- **`src/pages/Blog/BlogIndex.tsx`**: List of blog posts.
- **`src/pages/Blog/BlogPost.tsx`**: Individual blog post viewer (can use markdown rendering or hardcoded for now).

## Verification Plan

- **Routing**: Verify navigation between Home, About, Privacy, etc. works without page reload.
- **Ad Units**: Verify `AdUnit` component attempts to load ads (will show blank or error in console without valid ID, but logic can be tested).
- **Compliance**: Verify `ads.txt` is accessible at `/ads.txt`.
- **Content**: Verify new sections are visible and semantically structured (Inspect Element).
