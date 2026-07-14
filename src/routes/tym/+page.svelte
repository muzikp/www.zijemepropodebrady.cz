<script>
	import { base } from '$app/paths';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getTeamMemberPath, sortedTeamMembers } from '$lib/team';
</script>

<svelte:head>
	<title>Tým | Žijeme pro Poděbrady</title>
	<meta
		name="description"
		content="Tým Žijeme pro Poděbrady a lidé, kteří tvoří kandidátku pro Poděbrady."
	/>
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<section class="page">
	<div class="container page-shell">
		<header class="page-header">
			<p class="eyebrow">Tým</p>
			<h1>NÁŠ TÝM PRO PODĚBRADY</h1>
			<p class="lead">
				Lidé, kteří stojí za kandidátkou Žijeme pro Poděbrady. Medailonky doplníme později.
			</p>
		</header>

				<div class="team-grid">
			{#each sortedTeamMembers as member}
				<a class="team-member" href="{base}{getTeamMemberPath(member)}">
					<div class="member-photo">
						<img src="{base}{member.avatarFilePath}" alt="{member.krestniJmeno} {member.prijmeni}" />
					</div>
				<h2>{member.krestniJmeno} {member.prijmeni}</h2>
				<p class="member-profession">{member.povolani}</p>
					{#if member.specializace}
						<p class="member-specialization">{member.specializace}</p>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		min-height: 100vh;
		background: #ffb240 !important;
		background-color: #ffb240 !important;
		padding: 120px 0 72px;
		color: var(--dark-gray-color);
	}

	:global(body) {
		background: #ffb240 !important;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 60px;
	}

	.page-shell {
		display: grid;
		gap: 2rem;
	}

	.page-header {
		max-width: 760px;
	}

	.eyebrow {
		display: inline-block;
		margin-bottom: 0.75rem;
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		background: rgba(190, 21, 34, 0.1);
		color: #8f1019;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-size: 0.8rem;
	}

	h1 {
		margin: 0 0 0.75rem;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: clamp(2.4rem, 4vw, 4.4rem);
		line-height: 1.02;
	}

	.lead {
		font-size: 1.08rem;
		line-height: 1.6;
		max-width: 60ch;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 260px));
		justify-content: center;
		justify-items: center;
		gap: 2rem 1.5rem;
	}

	.team-member {
		display: grid;
		justify-items: center;
		gap: 0.4rem;
		text-align: center;
		padding: 0;
		background: transparent;
		border: 0;
		box-shadow: none;
		width: 100%;
		text-decoration: none;
		color: inherit;
	}

	.member-photo {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto 1rem;
		background-color: #ffb240;
	}

	.member-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.team-member h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 0.5rem;
		color: var(--dark-gray-color);
	}

	.member-profession {
		font-size: 1rem;
		color: var(--gray-color);
		margin: 0;
	}

	.member-specialization {
		font-size: 0.9rem;
		color: var(--gray-color);
		margin-top: 0.3rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.team-grid {
			grid-template-columns: 1fr;
		}

		.member-photo {
			width: 180px;
			height: 180px;
		}
	}
</style>

