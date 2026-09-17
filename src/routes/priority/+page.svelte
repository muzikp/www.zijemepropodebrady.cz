<script>
	import { base } from '$app/paths';
	import NavBar from '$lib/components/NavBar.svelte';
	import priorities from '$lib/data/priorities.json';
</script>

<svelte:head>
	<title>Naše priority | Žijeme pro Poděbrady</title>
	<meta name="description" content="Sedm priorit pro naše město podle hnutí Žijeme pro Poděbrady." />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<main class="page">
	<div class="container">
		<header class="page-header">
			<p class="eyebrow">Žijeme pro Poděbrady</p>
			<h1>NAŠE PRIORITY</h1>
			<p>Konkrétní kroky, které chceme společně prosadit pro lepší život v Poděbradech.</p>
		</header>

		<div class="priority-grid">
			{#each priorities as priority, index}
				<article class="priority-card" id={priority.id}>
					<div class="priority-number">{String(index + 1).padStart(2, '0')}</div>
					<div>
						<h2>{priority.title}</h2>
						<p>{priority.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</main>

<style>
	.page {
		min-height: 100vh;
		padding: 140px 24px 72px;
		background: linear-gradient(180deg, #fff1dc 0%, #fffaf3 100%);
		color: var(--dark-gray-color);
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
	}

	.page-header {
		max-width: 760px;
		margin-bottom: 2.5rem;
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		color: #be1522;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1,
	h2 {
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
	}

	h1 {
		margin: 0 0 1rem;
		font-size: clamp(2.4rem, 5vw, 4.5rem);
		line-height: 1;
	}

.page-header > p:last-child {
		margin: 0;
		font-size: 1.15rem;
		line-height: 1.6;
	}

	.priority-grid {
		display: grid;
		gap: 1rem;
	}

	.priority-card {
		display: grid;
		grid-template-columns: 4rem 1fr;
		gap: 1.25rem;
		padding: 1.5rem 1.75rem;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(33, 37, 41, 0.1);
		border-radius: 20px;
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
	}

	.priority-number {
		color: #be1522;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
	}

	h2 {
		margin: 0 0 0.65rem;
		font-size: clamp(1.35rem, 2.5vw, 2rem);
		line-height: 1.15;
	}

	.priority-card p {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	@media (max-width: 640px) {
		.page {
			padding: 110px 16px 56px;
		}

		.priority-card {
			grid-template-columns: 2.5rem 1fr;
			gap: 0.75rem;
			padding: 1.25rem;
		}
	}
</style>
