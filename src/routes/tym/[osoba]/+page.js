import { error } from '@sveltejs/kit';
import blogPosts from '$lib/data/blog.json';
import { findTeamMemberBySlug, sortedTeamMembers } from '$lib/team';

export const prerender = true;

export function entries() {
	return sortedTeamMembers.map((member) => ({ osoba: member.slug }));
}

export function load({ params }) {
	const member = findTeamMemberBySlug(params.osoba);

	if (!member) {
		throw error(404, 'Osoba nenalezena');
	}

	const posts = [...blogPosts]
		.filter((post) => post.author === member.path)
		.sort((left, right) => new Date(right.publishedAt) - new Date(left.publishedAt));

	return { member, posts };
}
