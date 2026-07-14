import { error } from '@sveltejs/kit';
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

	return { member };
}
