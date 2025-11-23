import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogIndex from './pages/Blog/BlogIndex';
import BlogPost from './pages/Blog/BlogPost';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="blog" element={<BlogIndex />} />
					<Route path="blog/:slug" element={<BlogPost />} />
					<Route path="privacy" element={<PrivacyPolicy />} />
					<Route path="terms" element={<TermsOfService />} />
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
