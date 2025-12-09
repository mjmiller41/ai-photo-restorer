import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
			<Header />
			<main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
				<Outlet />
			</main>
			<footer className="text-center py-6 text-gray-600 text-sm bg-gray-950">
				<div className="flex justify-center gap-6 mb-4">
					<Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
					<Link to="/blog" className="hover:text-gray-400 transition-colors">Blog</Link>
					<Link to="/about" className="hover:text-gray-400 transition-colors">About</Link>
					<Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
					<Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
					<Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
				</div>
				<p>© 2025 SnapStitch. Powered by Google Gemini.</p>
			</footer>
		</div>
	);
};

export default MainLayout;
