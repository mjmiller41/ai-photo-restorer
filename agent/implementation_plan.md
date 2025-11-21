# Refactoring and Improvement Plan

The goal is to make the codebase more concise, efficient, and user-friendly.

## User Review Required

> [!NOTE]
> I will be extracting `ActionButtons` to a new component file and moving types to a shared `types.ts` file. This will clean up `App.tsx`.

## Proposed Changes

### Refactoring (Conciseness)

#### [NEW] `src/types/index.ts`
- Create a centralized types file.
- Move `UploadedImage` interface here.
- Move `ActionButtonsProps` interface here (or keep with component if specific).

#### [NEW] `src/components/ActionButtons.tsx`
- Extract the `ActionButtons` component from `App.tsx`.

#### [MODIFY] `src/App.tsx`
- Import `ActionButtons` and types.
- Remove local definitions.
- Add file size validation before upload (Efficiency/User Friendly).

#### [MODIFY] `src/services/geminiService.ts`
- Move prompts to a separate `prompts.ts` file or constants object at the bottom to keep the logic clean.
- Ensure error messages are descriptive.

### Efficiency & User Experience

#### [MODIFY] `src/components/ImageUploader.tsx`
- Add client-side validation for file type and size (e.g., max 10MB) to prevent API errors.

## Verification Plan

### Manual Verification
1.  **Upload Flow**: Upload a valid image and verify it displays.
2.  **Restoration**: Click "Restore B&W" and "Restore & Colorize" and verify the API is called and result is shown.
3.  **Validation**: Try uploading a non-image file or a very large file (if I have one) to test the new validation logic.
4.  **Reset**: Verify "Start Over" clears the state.
