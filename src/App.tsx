import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogIndex from './pages/Blog/BlogIndex';
import BlogPost from './pages/Blog/BlogPost';

export const routes: RouteRecord[] = [
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'blog', element: <BlogIndex /> },
			{ path: 'blog/:slug', element: <BlogPost /> },
			{ path: 'privacy', element: <PrivacyPolicy /> },
			{ path: 'terms', element: <TermsOfService /> },
			{ path: 'about', element: <About /> },
			{ path: 'contact', element: <Contact /> },
		],
	},
];
