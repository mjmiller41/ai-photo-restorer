import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getBlogPostBySlug, BlogPost as BlogPostType } from '../../utils/blogLoader';
import AdUnit from '../../components/AdUnit';

const BlogPost: React.FC = () => {
	const { slug } = useParams<{ slug: string }>();
	const [post, setPost] = useState<BlogPostType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			if (slug) {
				const data = await getBlogPostBySlug(slug);
				setPost(data);
			}
			setLoading(false);
		};
		fetchPost();
	}, [slug]);

	if (loading) return <div className="text-center py-12">Loading...</div>;
	if (!post) return <Navigate to="/blog" replace />;

	return (
		<div className="max-w-3xl mx-auto">
			<Link to="/blog" className="text-gray-400 hover:text-white mb-6 inline-block">
				&larr; Back to Blog
			</Link>
			
			<article className="prose prose-invert prose-lg max-w-none">
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<div className="flex items-center text-gray-400 text-sm mb-8">
					<span>{post.date}</span>
					<span className="mx-2">•</span>
					<span>{post.author}</span>
				</div>
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</article>

			<div className="mt-12 pt-8 border-t border-gray-800">
				<h3 className="text-xl font-bold mb-4">Advertisement</h3>
				<AdUnit slotId="5555555555" />
			</div>
		</div>
	);
};

export default BlogPost;
