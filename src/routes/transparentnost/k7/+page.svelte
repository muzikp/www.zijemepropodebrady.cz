<script>
	import { base } from '$app/paths';

	const disclosure = [
		{
			label: 'Zadavatel, plátce za reklamu',
			value: 'Žijeme pro Poděbrady, z.s., Olbrachtova 600/3, Poděbrady II, 290 01 Poděbrady'
		},
		{
			label: 'Web zadavatele',
			value: 'www.zijemepropodebrady.cz'
		},
		{
			label: 'IČ',
			value: '19260695'
		},
		{
			label: 'Doba trvání kampaně',
			value: '8. 7. 2026 - 20. 9. 2026'
		},
		{
			label: 'Cena za reklamu',
			value: '78 071 Kč'
		},
		{
			label: 'Cena za kampaň',
			value: '78 071 Kč'
		},
		{
			label: 'Původ financí',
			value: 'Soukromé'
		},
		{
			label: 'Metodika výpočtu ceny',
			value: 'Cena je součtem částek za tisk a pronájem reklamní plochy, ceny jsou uvedeny bez. DPH.'
		},
		{
			label: 'Souvislost sdělení',
			value: 'Kampaň do komunálních voleb - Poděbrady'
		},
		{
			label: 'Informace o volbách',
			value: 'Informace o podmínkách kandidatury ve volbách do zastupitelstev obcí v roce 2026',
			href: 'https://mv.gov.cz/volby/clanek/informace-o-podminkach-kandidatury-ve-volbach-do-zastupitelstev-obci-v-roce-2026.aspx'
		},
		{
			label: 'Možnost nahlášení závadné reklamy',
			value: 'info@zijemepropodebrady.cz'
		},
		{
			label: 'Personalizovaná/cílená reklama',
			value: 'Ne'
		},
		{
			label: 'Použité techniky',
			value: 'Není'
		}
	];

	const declarations = [
		'Potvrzujeme, že jde o politickou reklamu.',
		'Zadavatel je oprávněn politickou reklamu zadat a poskytnuté údaje jsou pravdivé, úplné a aktuální.',
		'Obsah plakátu neporušuje právní předpisy ani práva třetích osob.'
	];
</script>

<svelte:head>
	<title>Transparentnost | K6</title>
	<meta
		name="description"
		content="Transparentnost politické reklamy Žijeme pro Poděbrady pro kampaň v červenci 2026."
	/>
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<section class="page">
	<div class="backdrop"></div>

	<div class="shell">
		<header class="hero">
			<a class="brand" href="{base}/" aria-label="Žijeme pro Poděbrady">
				<img src="{base}/logo.png" alt="Žijeme pro Poděbrady" />
			</a>

			<div class="hero-copy">
				<p class="eyebrow">Transparentnost</p>
				<h1>Oznámení o transparentnosti</h1>
				<p class="intro">
					Veřejné informace k politické reklamě a kampani do komunálních voleb v Poděbradech.
				</p>
			</div>
		</header>

		<div class="grid">
			<section class="panel panel-highlight">
				<h2>Základní údaje</h2>
				<dl class="facts">
					{#each disclosure.slice(0, 4) as item}
						<div>
							<dt>{item.label}</dt>
							<dd>
								{#if item.href}
									<a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
								{:else}
									{item.value}
								{/if}
							</dd>
						</div>
					{/each}
				</dl>
			</section>

			<section class="panel">
				<h2>Finanční údaje</h2>
				<dl class="facts">
					{#each disclosure.slice(4, 8) as item}
						<div>
							<dt>{item.label}</dt>
							<dd>
								{#if item.href}
									<a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
								{:else}
									{item.value}
								{/if}
							</dd>
						</div>
					{/each}
				</dl>
			</section>
		</div>

		<section class="panel">
			<h2>Transparentnost kampaně</h2>
			<dl class="facts facts-wide">
				{#each disclosure.slice(8) as item}
					<div>
						<dt>{item.label}</dt>
						<dd>
							{#if item.href}
								<a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
							{:else}
								{item.value}
							{/if}
						</dd>
					</div>
				{/each}
			</dl>
		</section>

		<section class="panel">
			<h2>Prohlášení</h2>
			<ul class="declarations">
				{#each declarations as declaration}
					<li>{declaration}</li>
				{/each}
			</ul>
		</section>
	</div>
</section>

<style>
	.page {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		background:
			radial-gradient(circle at top left, rgba(255, 178, 64, 0.32), transparent 35%),
			radial-gradient(circle at right 20%, rgba(190, 21, 34, 0.12), transparent 28%),
			linear-gradient(180deg, #f9f3e8 0%, #fffaf3 100%);
		color: var(--dark-gray-color);
	}

	.backdrop {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(33, 37, 41, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(33, 37, 41, 0.03) 1px, transparent 1px);
		background-size: 48px 48px;
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.32), transparent 70%);
		pointer-events: none;
	}

	.shell {
		position: relative;
		max-width: 1100px;
		margin: 0 auto;
		padding: 48px 24px 72px;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(180px, 240px) 1fr;
		gap: 2rem;
		align-items: center;
		margin-bottom: 2rem;
	}

	.brand {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1.25rem;
		background: rgba(255, 255, 255, 0.78);
		border: 1px solid rgba(33, 37, 41, 0.1);
		border-radius: 28px;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
	}

	.brand img {
		width: 100%;
		height: auto;
		max-width: 210px;
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
		font-size: clamp(2.3rem, 4vw, 4.4rem);
		line-height: 1.02;
	}

	.intro {
		max-width: 62ch;
		font-size: 1.08rem;
		line-height: 1.6;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
		margin-bottom: 1.25rem;
	}

	.panel {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.82);
		border: 1px solid rgba(33, 37, 41, 0.1);
		border-radius: 24px;
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
		backdrop-filter: blur(8px);
	}

	.panel-highlight {
		background: linear-gradient(180deg, rgba(255, 178, 64, 0.2), rgba(255, 255, 255, 0.86));
	}

	.panel h2 {
		margin-bottom: 1.1rem;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
		font-size: 1.6rem;
	}

	.facts {
		display: grid;
		gap: 0.95rem;
	}

	.facts div {
		padding-top: 0.95rem;
		border-top: 1px solid rgba(33, 37, 41, 0.08);
	}

	.facts div:first-child {
		padding-top: 0;
		border-top: 0;
	}

	dt {
		margin-bottom: 0.25rem;
		font-size: 0.88rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: #6a6d70;
	}

	dd {
		margin: 0;
		font-size: 1.02rem;
		line-height: 1.55;
	}

	dd a {
		color: #8f1019;
		text-decoration: underline;
		text-underline-offset: 0.12em;
	}

	.facts-wide {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.facts-wide div:last-child {
		grid-column: 1 / -1;
	}

	.declarations {
		margin: 0;
		padding-left: 1.2rem;
		display: grid;
		gap: 0.65rem;
		font-size: 1.02rem;
		line-height: 1.6;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
		}

		.grid,
		.facts-wide {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.shell {
			padding: 24px 16px 56px;
		}

		.panel {
			padding: 1.2rem;
			border-radius: 18px;
		}

		.brand {
			padding: 1rem;
			border-radius: 20px;
		}

		.hero {
			gap: 1.25rem;
			margin-bottom: 1.5rem;
		}
	}
</style>
