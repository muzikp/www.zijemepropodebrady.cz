import teamData from '$lib/data/team.json';

export const sortedTeamMembers = [...teamData].sort((left, right) => Number(left.id) - Number(right.id));

export function getTeamMemberPath(member) {
	return `/tym/${member.slug}`;
}

export function getTeamMemberProfession(member) {
	if (member.krestniJmeno === 'Tereza' && member.prijmeni === 'HornĂ­ÄŤkovĂˇ') {
		return 'ObchodnĂ­ manaĹľerka ve zdravotnictvĂ­ a kandidĂˇtka na starostku';
	}

	if (member.krestniJmeno === 'Petr' && member.prijmeni === 'Hercik') {
		return 'ZĂˇstupce Ĺ™editele a uÄŤitel na EKO gymnĂˇziu a zastupitel mÄ›sta';
	}

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
