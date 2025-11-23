import React from 'react';

const Contact: React.FC = () => {
	return (
		<div className="max-w-3xl mx-auto prose prose-invert">
			<h1 className="text-3xl font-bold mb-6">Contact Us</h1>
			<p>Have questions or feedback? We'd love to hear from you.</p>
			
			<div className="mt-8 p-6 bg-gray-800 rounded-lg">
				<h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
				<p className="mb-2">Email: <a href="mailto:support@snap-stitch.com" className="text-blue-400 hover:underline">support@snap-stitch.com</a></p>
			</div>
		</div>
	);
};

export default Contact;
