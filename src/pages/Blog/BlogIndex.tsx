import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../../utils/blogLoader';
import AdUnit from '../../components/AdUnit';

const BlogIndex: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const data = await getBlogPosts();
			setPosts(data);
		};
		fetchPosts();
	}, []);

	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="text-4xl font-bold mb-8 text-center">SnapStitch Blog</h1>
			<p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
				Tips, tutorials, and insights into the world of digital photo restoration and AI technology.
			</p>

			<div className="grid gap-8 md:grid-cols-2">
				{posts.map((post) => (
					<article key={post.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-750 transition-colors border border-gray-700">
						<div className="p-6">
							<div className="text-sm text-blue-400 mb-2">{post.date}</div>
							<Link to={`/blog/${post.slug}`} className="block">
								<h2 className="text-2xl font-bold mb-3 hover:text-blue-300 transition-colors">{post.title}</h2>
							</Link>
							<p className="text-gray-400 mb-4">{post.excerpt}</p>
							<Link to={`/blog/${post.slug}`} className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center">
								Read more 
								<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
							</Link>
						</div>
					</article>
				))}
			</div>

			<div className="mt-12">
				<AdUnit slotId="9876543210" />
			</div>
		</div>
	);
};

export default BlogIndex;
