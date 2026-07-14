<script>
	import { base } from '$app/paths';

	export let homeHref = `${base}/`;
</script>

<nav class="navbar">
	<div class="container">
	<div class="nav-content">
			<div class="nav-logo">
				<a href={homeHref}>
					<img src={`${base}/logo.png`} alt="Žijeme pro Poděbrady" />
				</a>
			</div>
			<div class="nav-right">
				<ul class="nav-links">
					<li><a href={`${base}/`}>Domů</a></li>
					<li><a href={`${base}/tym`}>Tým</a></li>
					<li><a href={`${base}/volebni-noviny`}>Volební noviny</a></li>
					<li><a href={`${base}/blog`}>Blog</a></li>
					<li><a href={`${base}/kontakt`}>Kontakt</a></li>
				</ul>
			</div>
		</div>
	</div>
</nav>

<style>
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

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 60px;
		width: 100%;
		display: flex;
		justify-content: space-between;
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

	.nav-right {
		display: flex;
		align-items: center;
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

	.nav-links a {
		color: var(--dark-gray-color);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.05rem;
		transition: color 0.3s ease;
	}

	.nav-links a:hover {
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

		.nav-links {
			gap: 0.7rem;
		}
	}
</style>
