import fm from 'front-matter';

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	author: string;
}

interface FrontMatterAttributes {
	id: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
	const modules = import.meta.glob(['../data/blogPosts/*.md', '!../data/blogPosts/_*.md'], { as: 'raw' });
	const posts: BlogPost[] = [];

	for (const path in modules) {
		const markdown = await modules[path]();
		const { attributes, body } = fm<FrontMatterAttributes>(markdown);
		
		// Extract slug from filename
		const slug = path.split('/').pop()?.replace('.md', '') || '';

		posts.push({
			id: attributes.id,
			slug: slug,
			title: attributes.title,
			excerpt: attributes.excerpt,
			content: body,
			date: attributes.date,
			author: attributes.author
		});
	}

	// Sort by date descending
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
	const posts = await getBlogPosts();
	return posts.find(p => p.slug === slug) || null;
};
