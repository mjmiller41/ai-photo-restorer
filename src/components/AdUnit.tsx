import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
	slotId: string;
	format?: 'auto' | 'fluid' | 'rectangle';
	responsive?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

declare global {
	interface Window {
		adsbygoogle: any[];
	}
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId, format = 'auto', responsive = true, className, style }) => {
	const adRef = useRef<HTMLModElement>(null);

	useEffect(() => {
		try {
			// Push the ad to the queue
			// We check if the ad element is empty to avoid double pushing in strict mode
			if (adRef.current && adRef.current.innerHTML === "") {
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
		} catch (e) {
			console.error("AdSense error", e);
		}
	}, []);

	return (
		<div className={`ad-container ${className || ''}`} style={{ overflow: 'hidden', minHeight: '100px', ...style }}>
			<ins className="adsbygoogle"
				ref={adRef}
				style={{ display: 'block' }}
				data-ad-client="ca-pub-0000000000000000" // REPLACE WITH YOUR PUBLISHER ID
				data-ad-slot={slotId}
				data-ad-format={format}
				data-full-width-responsive={responsive ? "true" : "false"}
			/>
		</div>
	);
};

export default AdUnit;
