<script>
	import { base } from '$app/paths';
	import NavBar from '$lib/components/NavBar.svelte';
	import blogPosts from '$lib/data/blog.json';
	import { findTeamMemberByPath, getTeamMemberDisplayName } from '$lib/team';

	const sortedPosts = [...blogPosts].sort((left, right) => {
		return new Date(right.publishedAt) - new Date(left.publishedAt);
	});

	function stripHtml(html) {
		return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
	}

	function createExcerpt(html, wordCount = 30) {
		const words = stripHtml(html).split(' ').filter(Boolean);
		const excerpt = words.slice(0, wordCount).join(' ');
		return words.length > wordCount ? `${excerpt}…` : excerpt;
	}

	function formatDate(value) {
		return new Intl.DateTimeFormat('cs-CZ', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(value));
	}

	function getAuthor(post) {
		const author = findTeamMemberByPath(post.author);

		if (!author) {
			return null;
		}

		return {
			name: getTeamMemberDisplayName(author),
			href: `${base}/tym/${author.slug}`,
			avatar: `${base}${author.avatarFilePath}`
		};
	}
</script>

<svelte:head>
	<title>Blog | Žijeme pro Poděbrady</title>
	<meta
		name="description"
		content="Blog Žijeme pro Poděbrady s aktualitami, texty a delšími články."
	/>
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<section class="page">
	<div class="container page-shell">
		<header class="page-header">
			<p class="eyebrow">Blog</p>
			<h1>Aktuality a články</h1>
			<p class="lead">Krátké i delší texty k tématům, která v Poděbradech řešíme.</p>
		</header>

		<div class="posts-grid">
			{#each sortedPosts as post}
				<article class="post-card">
					<a class="post-image" href="{base}/blog/{post.id}">
						<img src="{base}{post.imageUrl}" alt={post.title} />
					</a>
					<div class="post-body">
						<p class="post-date">{formatDate(post.publishedAt)}</p>
						<h2>
							<a href="{base}/blog/{post.id}">{post.title}</a>
						</h2>
						{#if getAuthor(post)}
							<a class="post-author" href={getAuthor(post).href}>
								<img src={getAuthor(post).avatar} alt="" aria-hidden="true" />
								<span>{getAuthor(post).name}</span>
							</a>
						{/if}
						<p class="post-excerpt">{createExcerpt(post.textHtml)}</p>
						<a class="post-link" href="{base}/blog/{post.id}">Číst celý článek</a>
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

	.posts-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
		max-width: 980px;
	}

	.post-card {
		display: grid;
		grid-template-columns: minmax(260px, 330px) minmax(0, 1fr);
		overflow: hidden;
		border-radius: 24px;
		background: rgba(255, 255, 255, 0.86);
		border: 1px solid rgba(33, 37, 41, 0.1);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
	}

	.post-image {
		display: block;
		aspect-ratio: 4 / 3;
		background: #eee;
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.post-body {
		padding: 1.5rem;
		display: grid;
		align-content: start;
		gap: 0.85rem;
		font-size: 0.96rem;
	}

	.post-date {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #8b6a25;
	}

	.post-body h2 {
		margin: 0;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.8rem;
		line-height: 1.15;
	}

	.post-body h2 a {
		color: inherit;
		text-decoration: none;
	}

	.post-body h2 a:hover {
		color: #be1522;
	}

	.post-author {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		width: fit-content;
		color: var(--dark-gray-color);
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.post-author:hover {
		color: #be1522;
	}

	.post-author img {
		width: 18px;
		height: 18px;
		border-radius: 999px;
		object-fit: cover;
	}

	.post-excerpt {
		margin: 0;
		line-height: 1.55;
		color: var(--gray-color);
	}

	.post-link {
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

	.post-link:hover {
		background: #9a1119;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.post-card {
			grid-template-columns: 1fr;
		}

		.post-image {
			aspect-ratio: 16 / 10;
		}

		.post-body {
			padding: 1.25rem;
		}
	}
</style>
