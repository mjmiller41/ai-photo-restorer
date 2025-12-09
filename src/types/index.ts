export interface UploadedImage {
	file: File;
	dataUrl: string;
}

export interface ActionButtonsProps {
	isLoading: boolean;
	restoredImageUrl: string | null;
	originalImageFileName: string | undefined;
	onRestore: (colorize: boolean) => void;
	onReset: () => void;
}
