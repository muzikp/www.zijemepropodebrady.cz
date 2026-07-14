<script>
	import { base } from '$app/paths';
import NavBar from '$lib/components/NavBar.svelte';

	let formData = {
		email: '',
		firstName: '',
		lastName: '',
		message: ''
	};
	let isSubmitting = false;
	let submitStatus = null;
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
	<title>Kontakt | Žijeme pro Poděbrady</title>
	<meta name="description" content="Kontaktní údaje spolku Žijeme pro Poděbrady." />
	<link rel="icon" type="image/png" href="{base}/favicon.png" />
</svelte:head>

<NavBar />

<section class="page">
	<div class="container page-shell">
		<header class="page-header">
			<p class="eyebrow">Kontakt</p>
			<h1>Kontaktujte nás</h1>
			<p class="lead">Když nás budete chtít oslovit, použijte e-mail nebo níže uvedené údaje.</p>
		</header>

		<div class="contact-grid">
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

			<div class="contact-details">
				<p><strong>Žijeme pro Poděbrady, z.s.</strong></p>
				<p>IČO: 19260695</p>
				<p>ID datové schránky: bfe7ayj</p>
				<p>Olbrachtova 600/3, Poděbrady II</p>
				<p>290 01 Poděbrady</p>
				<p class="registry">Zapsáno: L 77606/MSPH u Městského soudu v Praze</p>
			</div>
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
		max-width: 980px;
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

	.contact-grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: minmax(0, 1fr);
	}

	.contact-form {
		max-width: 600px;
		margin: 0 0 0.5rem;
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
		color: #be1522;
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
		border-color: #be1522;
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
		background-color: #be1522;
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

	.contact-details {
		display: inline-block;
		padding: 2rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 10px;
		border: 1px solid rgba(33, 37, 41, 0.1);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
	}

	.contact-details p {
		font-size: 1.08rem;
		margin: 0 0 0.55rem;
		color: var(--dark-gray-color);
	}

	.contact-details p.registry {
		margin-top: 1rem;
		font-size: 1rem;
		color: var(--gray-color);
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 20px;
		}

		.page {
			padding-top: 110px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-details {
			padding: 1.5rem;
		}
	}
</style>
