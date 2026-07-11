<script>
	import { base } from '$app/paths';
	export let data;

	function formatDate(value) {
		return new Intl.DateTimeFormat('cs-CZ', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(new Date(value));
	}
</script>

<svelte:head>
	<title>{data.post.title} | Blog</title>
	<meta name="description" content={data.post.title} />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<nav class="navbar">
	<div class="container">
		<div class="nav-content">
			<div class="nav-logo">
				<a href="{base}/">
					<img src="{base}/logo.png" alt="Žijeme pro Poděbrady" />
				</a>
			</div>
			<div class="nav-right">
				<ul class="nav-links">
					<li><a href="{base}/">Domů</a></li>
					<li><a href="{base}/blog">Blog</a></li>
					<li><a href="{base}/volebni-noviny">Volební noviny</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>

<article class="page">
	<div class="container article-shell">
		<a class="back-link" href="{base}/blog">← Zpět na blog</a>
		<header class="article-header">
			<p class="post-date">{formatDate(data.post.publishedAt)}</p>
			<h1>{data.post.title}</h1>
		</header>

		<div class="article-hero">
			<img src="{base}{data.post.imageUrl}" alt={data.post.title} />
		</div>

		<div class="article-body">
			{@html data.post.textHtml}
		</div>
	</div>
</article>

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

	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #ffb240;
		height: 100px;
		display: flex;
		align-items: center;
		z-index: 1000;
	}

	.navbar .container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.nav-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.nav-logo img {
		height: 70px;
		width: auto;
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 1.5rem;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin: 0;
		padding: 0;
	}

	.nav-links a,
	.back-link {
		color: var(--dark-gray-color);
		text-decoration: none;
		font-weight: 600;
	}

	.nav-links a:hover,
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

	.article-hero {
		overflow: hidden;
		border-radius: 28px;
		background: rgba(255, 255, 255, 0.88);
		border: 1px solid rgba(33, 37, 41, 0.1);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
	}

	.article-hero img {
		display: block;
		width: 100%;
		height: auto;
	}

	.article-body {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.82);
		border: 1px solid rgba(33, 37, 41, 0.1);
		border-radius: 24px;
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
		font-size: 1.08rem;
		line-height: 1.75;
	}

	.article-body :global(p) {
		margin: 0;
	}

	.article-body :global(a) {
		color: #be1522;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.navbar {
			height: 80px;
		}

		.nav-logo img {
			height: 50px;
		}

		.page {
			padding-top: 110px;
		}

		.article-body {
			padding: 1.2rem;
		}
	}
</style>
