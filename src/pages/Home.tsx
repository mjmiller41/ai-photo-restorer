import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import ComparisonViewer from "../components/ComparisonViewer";
import ActionButtons from "../components/ActionButtons";
import { restorePhoto } from "../services/geminiService";
import { UploadedImage } from "../types";
import AdUnit from "../components/AdUnit";

const Home: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(
    null
  );
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
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
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
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
    <div className="flex flex-col items-center justify-center gap-8">
      {!originalImage ? (
        <>
          <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl mb-2">
              Bring Your Old Photos Back to Life
            </h2>
            <p className="text-gray-400">
              Bring your old photos back to life with SnapStitch. Our AI
              automatically removes scratches, enhances details, and colorizes
              cherished memories in seconds.
            </p>
          </div>
          <ImageUploader
            onImageUpload={handleImageUpload}
            setError={setError}
          />
        </>
      ) : (
        <>
          {restoredImageUrl ? (
            <ComparisonViewer
              original={originalImage.dataUrl}
              restored={restoredImageUrl}
            />
          ) : (
            <div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-gray-800 flex items-center justify-center">
              <img
                src={originalImage.dataUrl}
                alt="Original to be restored"
                className="max-h-full max-w-full object-contain"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                  {/* Spinner is shown via ActionButtons */}
                </div>
              )}
            </div>
          )}
          <div className="mt-4 h-16 flex items-center justify-center">
            <ActionButtons
              isLoading={isLoading}
              restoredImageUrl={restoredImageUrl}
              originalImageFileName={originalImage?.file.name}
              onRestore={handleRestore}
              onReset={handleReset}
            />
          </div>
        </>
      )}
      {error && (
        <div
          className="mt-4 w-full max-w-xl bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="w-full max-w-4xl space-y-16 text-left">
        <AdUnit slotId="1234567890" />

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Advanced AI Photo Restoration Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">
                Scratch Removal
              </h3>
              <p>
                Our AI intelligently identifies and fills in scratches, tears,
                and dust marks, seamlessly blending them with the surrounding
                image.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-purple-400">
                Face Enhancement
              </h3>
              <p>
                Recover lost facial details with Generative Facial Prior (GFP)
                technology, making blurry faces sharp and recognizable again.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-400">
                Auto Colorization
              </h3>
              <p>
                Transform black and white photos into vibrant color images using
                deep learning algorithms trained on millions of historical
                photos.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">
            How to Restore Your Old Photos
          </h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-300 bg-gray-800 p-8 rounded-lg">
            <li className="pl-2">
              <strong className="text-white">Upload your photo:</strong> Drag
              and drop your image or click to select a file. We support JPG and
              PNG formats.
            </li>
            <li className="pl-2">
              <strong className="text-white">Choose options:</strong> Select
              "Colorize" if you want to add color to a black and white image.
            </li>
            <li className="pl-2">
              <strong className="text-white">Let AI work:</strong> Click
              "Restore Photo" and wait a few seconds while our GPU-powered AI
              processes your image.
            </li>
            <li className="pl-2">
              <strong className="text-white">Download:</strong> Compare the
              before and after, then download your restored masterpiece.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-white">
                Is my photo data safe?
              </h3>
              <p className="text-gray-300">
                Yes. Your photos are processed in memory and are strictly
                deleted immediately after processing. We do not store your
                personal images.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-white">
                How much does it cost?
              </h3>
              <p className="text-gray-300">
                SnapStitch is currently free to use. We are supported by ads to
                cover our server costs.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-white">
                What is the maximum file size?
              </h3>
              <p className="text-gray-300">
                We currently support images up to 10MB.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
