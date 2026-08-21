<script>
	import { base } from '$app/paths';
	import NavBar from '$lib/components/NavBar.svelte';
	export let data;

	function getTitle(member) {
		return `${member.krestniJmeno} ${member.prijmeni} | Tým`;
	}
</script>

<svelte:head>
	<title>{getTitle(data.member)}</title>
	<meta name="description" content={`${data.member.krestniJmeno} ${data.member.prijmeni}`} />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<section class="page">
	<div class="container">
		<a class="back-link" href="{base}/tym">← Zpět na tým</a>

		<article class="profile">
			<div class="profile-photo">
				<img src="{base}{data.member.avatarFilePath}" alt={`${data.member.krestniJmeno} ${data.member.prijmeni}`} />
			</div>

			<div class="profile-body">
				<p class="eyebrow">Tým</p>
				<h1>{data.member.krestniJmeno} {data.member.prijmeni}</h1>
				<p class="profession">{data.member.povolani}</p>
				<div class="cv">
					{@html data.member.cvHtml}
				</div>
			</div>
		</article>

		{#if data.posts?.length}
			<section class="articles-section">
				<h2>Články</h2>
				<div class="articles-list">
					{#each data.posts as post}
						<article class="article-item">
							<p class="article-date">{new Intl.DateTimeFormat('cs-CZ', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							}).format(new Date(post.publishedAt))}</p>
							<h3>
								<a href="{base}/blog/{post.id}">{post.title}</a>
							</h3>
						</article>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</section>

<style>
	.page {
		min-height: 100vh;
		background: #ffb240;
		padding: 120px 0 72px;
		color: var(--dark-gray-color);
	}

	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 60px;
	}

	.back-link {
		display: inline-flex;
		margin-bottom: 1.25rem;
		color: var(--dark-gray-color);
		text-decoration: none;
		font-weight: 700;
	}

	.back-link:hover {
		color: #be1522;
	}

	.profile {
		display: grid;
		grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
		gap: 2rem;
		align-items: start;
	}

	.profile-photo {
		overflow: visible;
		background: transparent;
		box-shadow: none;
	}

	.profile-photo img {
		display: block;
		width: 100%;
		height: auto;
	}

	.profile-body {
		display: grid;
		gap: 1rem;
		align-content: start;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: clamp(2.2rem, 4vw, 4rem);
		line-height: 1.05;
	}

	.profession {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 700;
	}

	.cv {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
		border-radius: 24px;
		background: rgba(255, 255, 255, 0.5);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
		font-size: 0.98rem;
		line-height: 1.7;
	}

	.cv :global(p) {
		margin: 0;
	}

	.cv :global(h2) {
		margin: 0.4rem 0 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.35rem;
		line-height: 1.15;
	}

	.cv :global(ul),
	.cv :global(ol) {
		margin: 0;
		padding-left: 1.4rem;
	}

	.cv :global(li) {
		margin: 0.2rem 0;
	}

	.articles-section {
		display: grid;
		gap: 1rem;
		margin-top: 2.25rem;
	}

	.articles-section h2 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.7rem;
		line-height: 1.1;
	}

	.articles-list {
		display: grid;
		gap: 0.9rem;
	}

	.article-item {
		padding: 1rem 1.1rem;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.48);
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.04);
	}

	.article-date {
		margin: 0 0 0.35rem;
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #8b6a25;
	}

	.article-item h3 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.15rem;
		line-height: 1.2;
	}

	.article-item a {
		color: inherit;
		text-decoration: none;
	}

	.article-item a:hover {
		color: #be1522;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.profile {
			grid-template-columns: 1fr;
		}
	}
</style>



