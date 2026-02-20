<script>
	import { base } from '$app/paths';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<div class="app">
	<slot />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
