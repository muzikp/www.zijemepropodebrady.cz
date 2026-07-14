<script>
	import { base } from '$app/paths';
import NavBar from '$lib/components/NavBar.svelte';
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

<NavBar />

<!-- Hero Section -->
<section class="hero">
	<div class="hero-content">
		<img src="{base}/logo.png" alt="Žijeme pro Poděbrady" class="hero-logo" />
	</div>
</section>

<!-- Priorities Section -->
	<section class="priorities">
		<div class="container">
			<h2>NAŠE PRIORITY</h2>
		<ul class="priority-list">
			<li>
				<img src="{base}/favicon.png" alt="" aria-hidden="true" />
				<span>Vyřešíme parkování a bude pro občany města ZDARMA!</span>
			</li>
			<li>
				<img src="{base}/favicon.png" alt="" aria-hidden="true" />
				<span>Nová POLIKLINIKA a centralizování lékařské péče pod jednu střechu.</span>
			</li>
			<li>
				<img src="{base}/favicon.png" alt="" aria-hidden="true" />
				<span>ČISTÉ MĚSTO každý den!</span>
			</li>
			<li>
				<img src="{base}/favicon.png" alt="" aria-hidden="true" />
				<span>Fungující úřad jako servis pro občany.</span>
			</li>
			<li>
				<img src="{base}/favicon.png" alt="" aria-hidden="true" />
				<span>10.000.000 Kč pro sportovní kluby.</span>
			</li>
		</ul>
	</div>
</section>

<!-- Team Section -->
<section class="team" id="tym">
	<div class="container">
		<h2>NÁŠ TÝM PRO PODĚBRADY</h2>
		<div class="team-grid">
			{#each sortedTeamData as member}
				<div class="team-member">
					<div class="member-photo">
						<img src="{base}{member.avatarFilePath}" alt="{member.krestniJmeno} {member.prijmeni}" />
					</div>
					<h3>{member.krestniJmeno} {member.prijmeni}</h3>
					<p class="member-profession">
						{#if member.krestniJmeno === 'Tereza' && member.prijmeni === 'Horníčková'}
							Obchodní manažerka ve zdravotnictví a kandidátka na starostku
						{:else if member.krestniJmeno === 'Petr' && member.prijmeni === 'Hercik'}
							Zástupce ředitele a učitel na EKO gymnáziu a zastupitel města
						{:else}
							{member.povolani}
						{/if}
					</p>
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

	/* Hero Section */
	.hero {
		background-color: #ffb240;
		padding: 150px 20px 50px;
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

	.priorities {
		background-color: #ffb240;
		padding: 0 0 80px;
	}

	.priorities h2,
	.team h2 {
		text-align: center;
		color: var(--dark-gray-color);
		margin-bottom: 4rem;
		font-size: 2.5rem;
		font-weight: 700;
		font-family: 'Neutraface Slab Display', 'Montserrat', sans-serif;
	}

	.priority-list {
		list-style: none;
		max-width: 920px;
		margin: 0 auto;
		padding: 0;
		display: grid;
		gap: 1rem;
	}

	.priority-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.9rem;
		padding: 1rem 1.25rem;
		background: rgba(255, 255, 255, 0.18);
		border: 1px solid rgba(33, 37, 41, 0.14);
		border-radius: 16px;
		color: var(--dark-gray-color);
		font-size: 1.1rem;
		line-height: 1.45;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
	}

	.priority-list img {
		width: 1.2rem;
		height: 1.2rem;
		flex: 0 0 auto;
		margin-top: 0.2rem;
	}

	.priority-list span {
		display: block;
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
		width: 100%;
		max-width: 260px;
	}

	.member-photo {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto 0.75rem;
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
		margin: 0;
	}

	.member-specialization {
		font-size: 0.9rem;
		color: var(--gray-color);
		margin: 0.2rem 0 0;
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
		margin-bottom: 1rem;
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
		.container {
			padding: 0 20px;
		}

		.hero {
			padding: 120px 20px 40px;
		}

		.hero-logo {
			width: 85vw;
		}

		.team h2,
		.priorities h2,
		.contact h2 {
			font-size: 2rem;
		}

		.priority-list li {
			font-size: 1rem;
			padding: 0.9rem 1rem;
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
		.hero-logo {
			width: 90vw;
		}

		.priorities {
			padding: 0 0 60px;
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
