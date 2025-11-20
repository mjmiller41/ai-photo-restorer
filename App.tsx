import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ComparisonViewer from './components/ComparisonViewer';
import ActionButtons from './components/ActionButtons';
import { restorePhoto } from './services/geminiService';
import { UploadedImage } from './types';

const App: React.FC = () => {
	const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
	const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleImageUpload = (file: File) => {
		// Basic validation
		if (!file.type.startsWith('image/')) {
			setError('Please upload a valid image file.');
			return;
		}
		if (file.size > 10 * 1024 * 1024) { // 10MB limit
			setError('File size exceeds 10MB limit.');
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
			setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
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
		<div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
			<Header />
			<main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center gap-8">
				{!originalImage ? (
					<>
						<div className="text-center max-w-2xl">
							<h2 className="text-3xl md:text-4xl mb-2">Bring Your Old Photos Back to Life</h2>
							<p className="text-gray-400">
								Bring your old photos back to life with SnapStitch. Our AI automatically removes scratches, enhances details, and colorizes cherished memories in seconds.
							</p>
						</div>
						<ImageUploader onImageUpload={handleImageUpload} setError={setError} />
					</>
				) : (
					<>
						{restoredImageUrl ? (
							<ComparisonViewer original={originalImage.dataUrl} restored={restoredImageUrl} />
						) : (
							<div className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shadow-2xl bg-gray-800 flex items-center justify-center">
								<img src={originalImage.dataUrl} alt="Original to be restored" className="max-h-full max-w-full object-contain" />
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
					<div className="mt-4 w-full max-w-xl bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
						<strong className="font-bold">Error: </strong>
						<span className="block sm:inline">{error}</span>
					</div>
				)}
			</main>
			<footer className="text-center py-4 text-gray-600 text-sm">
				<p>© 2025 SnapStitch. Powered by Google Gemini.</p>
			</footer>
		</div>
	);
};

export default App;
