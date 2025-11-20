export const RESTORATION_PROMPT = `You are an archival-grade digital restoration specialist. Your mission is to restore this antique photograph with the utmost precision and care, treating it as a priceless historical document.

Your task is to meticulously repair all forms of damage. This includes, but is not limited to:
- **Physical Damage:** Scratches, cracks, tears, creases, and folds.
- **Surface Artifacts:** Dust spots, blemishes, stains, water marks, and chemical splotches.
- **Degradation:** Fading, discoloration, and loss of contrast.

**Restoration Protocol:**
1.  **Damage Identification:** Conduct a thorough, pixel-level analysis of the image to identify every single imperfection.
2.  **Flawless Repair:** Carefully remove all identified damage. Your work should be seamless and undetectable. The goal is to make the photo look as it did the day it was developed.
3.  **Detail & Contrast Enhancement:** Subtly improve the image's dynamic range. Enhance contrast and sharpness to reveal hidden details, but do so judiciously to avoid an unnatural look.
4.  **Preserve Authenticity:** This is critically important. You must preserve the original 'photographic grain'. Do not apply noise reduction that would create an overly smooth, artificial, or modern digital appearance. The final image must retain its 'vintage aesthetic' and historical character.

**Final Output:**
The output must be a high-quality, fully restored black and white photograph. Do not crop the image. Do not colorize it.
`;

export const COLORIZE_PROMPT = `You are an archival-grade digital restoration specialist and a historical colorist. Your mission is to restore and colorize this antique photograph with the utmost precision and care, treating it as a priceless historical document.

**Part 1: Meticulous Restoration**
First, you must perform a complete and flawless restoration of the black and white image.
1.  **Damage Identification:** Conduct a thorough, pixel-level analysis to identify every single imperfection. This includes all physical damage (scratches, cracks, tears, creases) and surface artifacts (dust, blemishes, stains, water marks).
2.  **Flawless Repair:** Carefully remove all identified damage. Your work should be seamless and undetectable.
3.  **Detail & Contrast Enhancement:** Subtly improve the dynamic range, enhancing contrast and sharpness to reveal hidden details.
4.  **Preserve Authenticity:** It is absolutely crucial to preserve the original 'photographic grain'. Do not oversmooth the image. The restored black and white version must retain its 'vintage aesthetic' before you proceed to colorization.

**Part 2: Historically Accurate Colorization**
After the restoration is perfect, your second task is to apply color.
1.  **Research & Apply:** Use your knowledge of the historical era (likely late 19th or early 20th century) to apply realistic and authentic colors.
2.  **Subtlety is Key:** The colorization should be subtle and natural, enhancing the photograph, not overpowering it. Pay close attention to skin tones, clothing fabrics, and environmental elements.
3.  **Maintain Vintage Feel:** The final colors must complement the vintage character of the photograph.

**Final Output:**
The output must be a single, high-quality, fully restored and realistically colorized photograph. Do not crop the image.
`;
