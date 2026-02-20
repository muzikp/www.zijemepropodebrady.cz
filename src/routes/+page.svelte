<script>
	import { base } from '$app/paths';
	import teamData from '$lib/data/team.json';

	// Seřazení členů týmu podle ID vzestupně
	const sortedTeamData = [...teamData].sort((a, b) => {
		const idA = parseInt(a.id);
		const idB = parseInt(b.id);
		return idA - idB;
	});

	let formData = {
		email: '',
		firstName: '',
		lastName: '',
		message: ''
	};
	let isSubmitting = false;
	let submitStatus = null; // 'success' or 'error'
	let submitMessage = '';

	async function handleSubmit(event) {
		event.preventDefault();
		
		if (!formData.email || !formData.message) {
			submitStatus = 'error';
			submitMessage = 'Vyplňte prosím všechna povinná pole.';
			return;
		}

		isSubmitting = true;
		submitStatus = null;
		submitMessage = '';

		try {
			const fields = [
				{
					rank: 1,
					property: 'email',
					label: 'Email',
					value: formData.email
				},
				{
					rank: 2,
					property: 'message',
					label: 'Zpráva',
					value: formData.message
				}
			];

			if (formData.firstName || formData.lastName) {
				fields.unshift({
					rank: 0,
					property: 'name',
					label: 'Jméno a příjmení',
					value: `${formData.firstName} ${formData.lastName}`.trim()
				});
			}

			fields.push({
				rank: 99,
				property: 'recipientEmail',
				value: 'info@zijemepropodebrady.cz'
			});

			fields.push({
				rank: 100,
				property: 'subject',
				value: 'Nová zpráva z webu Žijeme pro Poděbrady'
			});

			const response = await fetch('https://api.evalytics.cz/v1/form-to-email/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ fields })
			});

			const result = await response.json();

			if (result.success) {
				submitStatus = 'success';
				submitMessage = 'Děkujeme! Vaše zpráva byla úspěšně odeslána.';
				formData = { email: '', firstName: '', lastName: '', message: '' };
			} else {
				submitStatus = 'error';
				submitMessage = 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.';
			}
		} catch (error) {
			submitStatus = 'error';
			submitMessage = 'Došlo k chybě při odesílání. Zkuste to prosím později.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Žijeme pro Poděbrady</title>
	<meta name="description" content="Žijeme pro Poděbrady - společně pro lepší budoucnost našeho města" />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<!-- Navbar -->
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
					<li><a href="#tym">Tým</a></li>
					<li><a href="#kontakt">Kontakt</a></li>
				</ul>
				<div class="nav-social">
					<a href="https://www.facebook.com/zijemepropodebrady/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<section class="hero">
	<div class="hero-content">
		<img src="{base}/logo.png" alt="Žijeme pro Poděbrady" class="hero-logo" />
	</div>
</section>

<!-- Team Section -->
<section class="team" id="tym">
	<div class="container">
		<h2>Náš tým</h2>
		<div class="team-grid">
			{#each sortedTeamData as member}
				<div class="team-member">
					<div class="member-photo">
						<img src="{base}{member.avatarFilePath}" alt="{member.krestniJmeno} {member.prijmeni}" />
					</div>
					<h3>
						{#if member.titulPred}{member.titulPred} {/if}
						{member.krestniJmeno} {member.prijmeni}
						{#if member.titulZa}, {member.titulZa}{/if}
					</h3>
					<p class="member-profession">{member.povolani}</p>
					{#if member.specializace}
						<p class="member-specialization">{member.specializace}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Contact Section -->
<footer class="contact" id="kontakt">
	<div class="container">
		<h2>Kontaktujte nás!</h2>
		
		<form class="contact-form" on:submit={handleSubmit}>
			<div class="form-row">
				<div class="form-group">
					<label for="firstName">Jméno</label>
					<input 
						type="text" 
						id="firstName" 
						bind:value={formData.firstName}
						placeholder="Vaše jméno"
					/>
				</div>
				<div class="form-group">
					<label for="lastName">Příjmení</label>
					<input 
						type="text" 
						id="lastName" 
						bind:value={formData.lastName}
						placeholder="Vaše příjmení"
					/>
				</div>
			</div>
			
			<div class="form-group">
				<label for="email">Email <span class="required">*</span></label>
				<input 
					type="email" 
					id="email" 
					bind:value={formData.email}
					placeholder="vas@email.cz"
					required
				/>
			</div>
			
			<div class="form-group">
				<label for="message">Zpráva <span class="required">*</span></label>
				<textarea 
					id="message" 
					bind:value={formData.message}
					placeholder="Vaše zpráva..."
					rows="5"
					required
				></textarea>
			</div>

			{#if submitStatus === 'success'}
				<div class="alert alert-success">{submitMessage}</div>
			{/if}
			
			{#if submitStatus === 'error'}
				<div class="alert alert-error">{submitMessage}</div>
			{/if}
			
			<button type="submit" class="submit-btn" disabled={isSubmitting}>
				{isSubmitting ? 'Odesílání...' : 'Odeslat zprávu'}
			</button>
		</form>

		<p class="email-large">
			<a href="mailto:info@zijemepropodebrady.cz">
				info@zijemepropodebrady.cz
			</a>
		</p>
		<div class="contact-details">
			<p><strong>Žijeme pro Poděbrady, z.s.</strong></p>
			<p>IČO: 19260695</p>
			<p>ID datové schránky: bfe7ayj</p>
			<p>Olbrachtova 600/3, Poděbrady II</p>
			<p>290 01 Poděbrady</p>
			<p class="registry">Zapsáno: L 77606/MSPH u Městského soudu v Praze</p>
		</div>
	</div>
</footer>

<style>
	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 60px;
	}

	.navbar .container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}
	}

	/* Navbar */
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

	.nav-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.nav-logo a {
		display: block;
	}

	.nav-logo img {
		height: 70px;
		width: auto;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}

	.nav-links a {
		color: var(--dark-gray-color);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.125rem;
		transition: all 0.3s ease;
	}

	.nav-links a:hover {
		color: #BE1522;
		font-weight: 700;
	}

	.nav-social {
		display: flex;
		align-items: center;
	}

	.nav-social a {
		color: var(--dark-gray-color);
		display: flex;
		align-items: center;
		transition: color 0.3s ease;
	}

	.nav-social a:hover {
		color: #BE1522;
	}

	/* Hero Section */
	.hero {
		background-color: #ffb240;
		padding: 150px 20px 100px;
		text-align: center;
	}

	.hero-content {
		position: relative;
	}

	.hero-logo {
		max-width: 800px;
		width: 75vw;
		height: auto;
		animation: heartbeat 7s ease-in-out infinite;
	}

	@keyframes heartbeat {
		0% {
			transform: scale(1);
		}
		10% {
			transform: scale(1.015);
		}
		16% {
			transform: scale(1);
		}
		26% {
			transform: scale(1.015);
		}
		32% {
			transform: scale(1);
		}
		66% {
			transform: scale(1);
		}
		100% {
			transform: scale(1);
		}
	}

	/* Team Section */
	.team {
		background-color: #ffb240;
		padding: 80px 0;
	}

	.team h2 {
		text-align: center;
		color: var(--dark-gray-color);
		margin-bottom: 4rem;
		font-size: 2.5rem;
		font-weight: 700;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 3rem 2rem;
		justify-items: center;
	}

	.team-member {
		text-align: center;
	}

	.member-photo {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto 1rem;
		background-color: #f0f0f0;
	}

	.member-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.team-member h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--dark-gray-color);
	}

	.member-profession {
		font-size: 1rem;
		color: var(--gray-color);
		margin-top: 0.25rem;
	}

	.member-specialization {
		font-size: 0.9rem;
		color: var(--gray-color);
		margin-top: 0.25rem;
		opacity: 0.8;
	}

	/* Contact Section */
	.contact {
		background-color: #ffb240;
		padding: 80px 0;
		text-align: center;
	}

	.contact h2 {
		font-size: 2rem;
		font-weight: 600;
		color: var(--dark-gray-color);
		margin-bottom: 2rem;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
	}

	.contact-form {
		max-width: 600px;
		margin: 0 auto 3rem;
		text-align: left;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	.form-group label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: var(--dark-gray-color);
	}

	.required {
		color: #BE1522;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid var(--dark-gray-color);
		border-radius: 5px;
		font-family: 'Montserrat', sans-serif;
		font-size: 1rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #BE1522;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.alert {
		padding: 1rem;
		border-radius: 5px;
		margin-bottom: 1.5rem;
		text-align: center;
		font-weight: 600;
	}

	.alert-success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.alert-error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	.submit-btn {
		width: 100%;
		padding: 1rem 2rem;
		background-color: #BE1522;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		font-family: 'Montserrat', sans-serif;
	}

	.submit-btn:hover:not(:disabled) {
		background-color: #9a1119;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.email-large {
		font-size: 1.5rem;
		margin-bottom: 3rem;
	}

	.email-large a {
		color: var(--dark-gray-color);
		text-decoration: underline;
		font-weight: 600;
		transition: color 0.3s ease;
	}

	.email-large a:hover {
		color: var(--orange-color);
		text-decoration: none;
	}

	.contact-details {
		display: inline-block;
		text-align: center;
		padding: 2rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 10px;
	}

	.contact-details p {
		font-size: 1.125rem;
		margin-bottom: 0.5rem;
		color: var(--dark-gray-color);
	}

	.contact-details p.registry {
		margin-top: 1rem;
		font-size: 1rem;
		color: var(--gray-color);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.navbar {
			height: 80px;
		}

		.nav-logo img {
			height: 50px;
		}

		.nav-links {
			gap: 1rem;
		}

		.nav-links a {
			font-size: 1rem;
		}

		.hero {
			padding: 120px 20px 80px;
		}

		.hero-logo {
			width: 85vw;
		}

		.team h2,
		.contact h2 {
			font-size: 2rem;
		}

		.team-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.member-photo {
			width: 180px;
			height: 180px;
		}
	}

	@media (max-width: 576px) {
		.nav-links {
			gap: 0.75rem;
		}

		.nav-links a {
			font-size: 0.9rem;
		}

		.hero-logo {
			width: 90vw;
		}

		.contact h2 {
			font-size: 1.75rem;
		}

		.email-large {
			font-size: 1.25rem;
		}

		.contact-details {
			padding: 1.5rem;
		}

		.contact-details p {
			font-size: 1rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
