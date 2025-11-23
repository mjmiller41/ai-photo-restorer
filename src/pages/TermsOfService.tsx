import React from 'react';

const TermsOfService: React.FC = () => {
	return (
		<div className="max-w-3xl mx-auto prose prose-invert">
			<h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
			<p>Last updated: November 22, 2025</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
			<p>By accessing and using SnapStitch, you accept and agree to be bound by the terms and provision of this agreement.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
			<p>You agree not to upload any illegal or prohibited content. You retain all rights to your original images.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
			<p>The service is provided "as is" without warranties of any kind.</p>
		</div>
	);
};

export default TermsOfService;
