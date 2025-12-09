import React from 'react';

const About: React.FC = () => {
	return (
		<div className="max-w-3xl mx-auto prose prose-invert">
			<h1 className="text-3xl font-bold mb-6">About Us</h1>
			<p>
				SnapStitch is dedicated to preserving memories through the power of Artificial Intelligence. 
				Our mission is to make professional-grade photo restoration accessible to everyone.
			</p>
			<p className="mt-4">
				Built with the latest Generative AI technology, we help you restore, colorize, and enhance your vintage photography.
			</p>
		</div>
	);
};

export default About;
