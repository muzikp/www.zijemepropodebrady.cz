import { error } from '@sveltejs/kit';
import blogPosts from '$lib/data/blog.json';

export const prerender = true;

export function entries() {
	return blogPosts.map((post) => ({ id: post.id }));
}

export function load({ params }) {
	const post = blogPosts.find((entry) => entry.id === params.id);

	if (!post) {
		throw error(404, 'Článek nebyl nalezen');
	}

	return { post };
}
