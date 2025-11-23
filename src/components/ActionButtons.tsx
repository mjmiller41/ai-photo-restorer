import React from 'react';
import { DownloadIcon, ResetIcon, SparkleIcon, ColorPaletteIcon } from './icons';
import Spinner from './Spinner';
import { ActionButtonsProps } from '../types';

const ActionButtons: React.FC<ActionButtonsProps> = ({
	isLoading,
	restoredImageUrl,
	originalImageFileName,
	onRestore,
	onReset,
}) => {
	if (isLoading) {
		return (
			<div className="flex flex-col items-center space-y-2">
				<Spinner />
				<p className="text-amber-400 animate-pulse">Restoring history... this may take a moment.</p>
			</div>
		);
	}
	if (restoredImageUrl) {
		return (
			<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
				<a
					href={restoredImageUrl}
					download={`restored-${originalImageFileName || 'photo.jpg'}`}
					className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-colors"
				>
					<DownloadIcon className="w-5 h-5" />
					Download
				</a>
				<button
					onClick={onReset}
					className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
				>
					<ResetIcon className="w-5 h-5" />
					Start Over
				</button>
			</div>
		);
	}
	return (
		<div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
			<button
				onClick={() => onRestore(false)}
				disabled={isLoading}
				className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gray-200 text-gray-800 font-bold text-lg rounded-lg shadow-lg hover:bg-white transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
			>
				<SparkleIcon className="w-6 h-6" />
				Restore B&W
			</button>
			<button
				onClick={() => onRestore(true)}
				disabled={isLoading}
				className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-amber-500 text-gray-900 font-bold text-lg rounded-lg shadow-lg hover:bg-amber-600 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
			>
				<ColorPaletteIcon className="w-6 h-6" />
				Restore & Colorize
			</button>
			<button
				onClick={onReset}
				className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
			>
				<ResetIcon className="w-5 h-5" />
				Start Over
			</button>
		</div>
	);
};

export default ActionButtons;
