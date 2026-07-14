import teamData from '$lib/data/team.json';

export const sortedTeamMembers = [...teamData].sort((left, right) => Number(left.id) - Number(right.id));

export function getTeamMemberPath(member) {
	return `/tym/${member.slug}`;
}

export function getTeamMemberProfession(member) {
	return member.povolani;
}

export function findTeamMemberBySlug(slug) {
	return sortedTeamMembers.find((member) => member.slug === slug);
}

export function findTeamMemberByPath(path) {
	return sortedTeamMembers.find((member) => member.path === path || member.slug === path);
}

export function getTeamMemberDisplayName(member) {
	return `${member.krestniJmeno} ${member.prijmeni}`;
}
