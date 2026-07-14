<script>
	import { base } from '$app/paths';
	import NavBar from '$lib/components/NavBar.svelte';
	import { fade, scale } from 'svelte/transition';
	import { findTeamMemberByPath, getTeamMemberDisplayName } from '$lib/team';
	export let data;

	let selectedImage = null;

	function formatDate(value) {
		return new Intl.DateTimeFormat('cs-CZ', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(value));
	}

	function normalizeAssetPath(value) {
		return value
			.replace(/\\/g, '/')
			.replace(/^\/+/, '')
			.replace(/^static\//, '');
	}

	function openGalleryImage(image) {
		selectedImage = image;
	}

	function closeGalleryImage() {
		selectedImage = null;
	}

	function handleWindowKeydown(event) {
		if (event.key === 'Escape' && selectedImage) {
			closeGalleryImage();
		}
	}

	$: author = data.post.author ? findTeamMemberByPath(data.post.author) : null;
	$: authorLink = author ? `${base}/tym/${author.slug}` : null;
	$: authorAvatar = author ? `${base}${author.avatarFilePath}` : null;
</script>

<svelte:head>
	<title>{data.post.title} | Blog</title>
	<meta name="description" content={data.post.title} />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<svelte:window on:keydown={handleWindowKeydown} />

<NavBar />

<article class="page">
	<div class="container article-shell">
		<a class="back-link" href="{base}/blog">← Zpět na blog</a>
		<header class="article-header">
			<p class="post-date">{formatDate(data.post.publishedAt)}</p>
			<h1>{data.post.title}</h1>
			{#if author}
				<a class="article-author" href={authorLink}>
					<img src={authorAvatar} alt="" aria-hidden="true" />
					<span>{getTeamMemberDisplayName(author)}</span>
				</a>
			{/if}
		</header>

		<div class="article-body">
			{@html data.post.textHtml}
		</div>

		{#if data.post.gallery?.length}
			<section class="article-gallery" aria-label="Galerie k článku">
				<h2>Galerie</h2>
				<div class="gallery-grid">
					{#each data.post.gallery as image}
						<figure class="gallery-item">
							<button class="gallery-trigger" type="button" on:click={() => openGalleryImage(image)}>
								<img
									src="{base}/{normalizeAssetPath(image.url)}"
									alt={image.title}
									loading="lazy"
								/>
							</button>
							{#if image.title}
								<figcaption>{image.title}</figcaption>
							{/if}
						</figure>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</article>

{#if selectedImage}
	<div class="modal-backdrop" transition:fade>
		<div class="modal-dialog" role="dialog" tabindex="-1" aria-modal="true" aria-label={selectedImage.title}>
			<button class="modal-close" type="button" aria-label="Zavřít" on:click={closeGalleryImage}>
				×
			</button>
			<img
				src="{base}/{normalizeAssetPath(selectedImage.url)}"
				alt={selectedImage.title}
				transition:scale={{ duration: 180, start: 0.94 }}
			/>
			{#if selectedImage.title}
				<p class="modal-caption">{selectedImage.title}</p>
			{/if}
		</div>
	</div>
{/if}

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
		max-width: 980px;
		margin: 0 auto;
		padding: 0 60px;
	}

	.back-link {
		color: var(--dark-gray-color);
		text-decoration: none;
		font-weight: 600;
	}

	.back-link:hover {
		color: #be1522;
	}

	.article-shell {
		display: grid;
		gap: 1.5rem;
	}

	.back-link {
		width: fit-content;
	}

	.article-header h1 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: clamp(2.4rem, 4vw, 4rem);
		line-height: 1.05;
	}

	.post-date {
		margin: 0 0 0.5rem;
		font-size: 0.88rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #8b6a25;
	}

	.article-author {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		width: fit-content;
		margin-top: 0.5rem;
		color: var(--dark-gray-color);
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.article-author:hover {
		color: #be1522;
	}

	.article-author img {
		width: 36px;
		height: 36px;
		border-radius: 999px;
		object-fit: cover;
	}

	.article-body {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.82);
		border: 1px solid rgba(33, 37, 41, 0.1);
		border-radius: 24px;
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
	}

	.article-body :global(p) {
		margin: 0;
		font-size: 0.96rem;
		line-height: 1.68;
	}

	.article-body :global(ul),
	.article-body :global(ol) {
		margin: 0;
		padding-left: 1.4rem;
		font-size: 0.96rem;
		line-height: 1.68;
	}

	.article-body :global(li) {
		margin: 0.25rem 0;
	}

	.article-body :global(h2) {
		margin: 0.4rem 0 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.45rem;
		line-height: 1.15;
	}

	.article-body :global(h3) {
		margin: 0.35rem 0 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.15rem;
		line-height: 1.2;
	}

	.article-body :global(a) {
		color: #be1522;
	}

	.article-gallery {
		display: grid;
		gap: 1rem;
	}

	.article-gallery h2 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.8rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.gallery-item {
		width: 100%;
		margin: 0;
		display: grid;
		gap: 0.5rem;
		padding: 0;
		border: 0;
		background: transparent;
		text-align: left;
	}

	.gallery-trigger {
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
	}

	.gallery-item img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		object-position: center;
		display: block;
		border-radius: 0;
		background: rgba(255, 255, 255, 0.88);
	}

	.gallery-item figcaption {
		font-size: 0.95rem;
		line-height: 1.4;
		color: var(--gray-color);
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 2000;
		display: grid;
		place-items: center;
		padding: 24px;
		background: rgba(17, 17, 17, 0.82);
	}

	.modal-dialog {
		position: relative;
		max-width: min(92vw, 1100px);
		max-height: 90vh;
		display: grid;
		gap: 0.75rem;
		place-items: center;
	}

	.modal-dialog img {
		display: block;
		max-width: 100%;
		max-height: 82vh;
		object-fit: contain;
		border-radius: 0;
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
	}

	.modal-caption {
		margin: 0;
		color: white;
		text-align: center;
		font-size: 1rem;
	}

	.modal-close {
		position: absolute;
		top: -12px;
		right: -12px;
		width: 40px;
		height: 40px;
		border: 0;
		border-radius: 999px;
		background: white;
		color: #222;
		font-size: 1.8rem;
		line-height: 1;
		cursor: pointer;
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.article-body {
			padding: 1.2rem;
		}

		.modal-dialog {
			max-width: 96vw;
		}
	}
</style>
