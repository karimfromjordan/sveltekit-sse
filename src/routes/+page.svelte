<script>
	import '$lib/css/global.css';
	import { onMount } from 'svelte';
	import sse_store from '$lib/stores/sse.js';
	import Alerts, { alerts } from '$lib/components/Alerts.svelte';
	import { enhance } from '$app/forms';

	let position = 'start';

	export let form;

	$: $sse_store && alerts.show($sse_store);
</script>

<Alerts {position} />

<main>
	<article>
		<form action="?/message" method="POST" enctype="application/x-www-form-urlencoded" use:enhance>
			<input type="text" name="message" />
			<button>Send</button>
		</form>
	</article>
</main>

<style>
	main {
		height: 100%;
		display: grid;
		place-items: center;
	}

	article {
		max-width: 55ch;
	}

	fieldset {
		margin-block-end: 1rem;
	}

	fieldset div {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	label,
	input[type='number'] {
		display: block;
		width: 100%;
	}

	label {
		margin-block-end: 0.25rem;
	}
</style>
