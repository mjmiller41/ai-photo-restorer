import React from 'react';

const PrivacyPolicy: React.FC = () => {
	return (
		<div className="max-w-3xl mx-auto prose prose-invert">
			<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
			<p>Last updated: November 22, 2025</p>
			
			<h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
			<p>Welcome to SnapStitch. We respect your privacy and are committed to protecting your personal data.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">2. Data Collection</h2>
			<p>We do not store your photos permanently. Images uploaded are processed in memory and are deleted immediately after processing.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">3. Advertising</h2>
			<p>We use Google AdSense to serve ads. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</p>
			<p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:underline">Google Ads Settings</a>.</p>
		</div>
	);
};

export default PrivacyPolicy;
