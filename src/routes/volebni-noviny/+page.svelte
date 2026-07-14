<script>
	import { base } from '$app/paths';
import NavBar from '$lib/components/NavBar.svelte';
	import volebniNoviny from '$lib/data/volebniNoviny.json';

	function formatDate(value) {
		return new Intl.DateTimeFormat('cs-CZ', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(value));
	}
</script>

<svelte:head>
	<title>Volební noviny | Žijeme pro Poděbrady</title>
	<meta
		name="description"
		content="Ke stažení volební noviny Žijeme pro Poděbrady v PDF."
	/>
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<section class="page">
	<div class="container page-shell">
		<header class="page-header">
			<p class="eyebrow">Publikace</p>
			<h1>Volební noviny</h1>
			<p class="lead">PDF ke stažení pro jednotlivá vydání volebních novin.</p>
		</header>

		<div class="issues-grid">
			{#each volebniNoviny as issue}
				<article class="issue-card">
					<a
						class="pdf-preview"
						href="{base}/volebni-noviny/{issue.pdfFileName}"
						download
						aria-label={`Stáhnout ${issue.title}`}
					>
						{#if issue.thumbnailFileName}
							<img src="{base}/volebni-noviny/{issue.thumbnailFileName}" alt="" aria-hidden="true" />
						{:else}
							<div class="pdf-badge">PDF</div>
							<div class="pdf-sheet">
								<span>{issue.title}</span>
							</div>
						{/if}
					</a>
					<div class="issue-body">
						<p class="issue-date">{formatDate(issue.publishedAt)}</p>
						<h2>{issue.title}</h2>
						<a class="download-link" href="{base}/volebni-noviny/{issue.pdfFileName}" download>
							Stáhnout PDF
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.page {
		min-height: 100vh;
		background:
			radial-gradient(circle at top left, rgba(255, 178, 64, 0.2), transparent 35%),
			linear-gradient(180deg, #fff7ed 0%, #fffdf8 100%);
		padding: 120px 0 72px;
		color: var(--dark-gray-color);
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

	.issues-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.issue-card {
		display: grid;
		grid-template-columns: minmax(120px, 180px) minmax(0, 1fr);
		gap: 1rem;
		align-items: start;
	}

	.pdf-preview {
		display: block;
		width: 100%;
		aspect-ratio: 3 / 4;
		padding: 0;
		background: transparent;
		overflow: hidden;
	}

	.pdf-preview img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.pdf-badge {
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		background: #be1522;
		color: white;
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.pdf-sheet {
		width: min(220px, 85%);
		aspect-ratio: 3 / 4;
		border-radius: 18px;
		background: white;
		border: 1px solid rgba(33, 37, 41, 0.1);
		box-shadow: 0 16px 24px rgba(0, 0, 0, 0.08);
		display: grid;
		place-items: center;
		padding: 1rem;
		text-align: center;
	}

	.pdf-sheet span {
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.2rem;
		line-height: 1.2;
	}

	.issue-body {
		padding: 0.25rem 0;
		display: grid;
		gap: 0.75rem;
		align-content: center;
	}

	.issue-date {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #8b6a25;
	}

	.issue-body h2 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.55rem;
		line-height: 1.15;
	}

	.download-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		padding: 0.8rem 1rem;
		border-radius: 999px;
		background: #be1522;
		color: white;
		text-decoration: none;
		font-weight: 700;
	}

	.download-link:hover {
		background: #9a1119;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.issue-card {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}

		.pdf-preview {
			aspect-ratio: 16 / 10;
		}

		.issue-body {
			padding: 0;
		}
	}
</style>
