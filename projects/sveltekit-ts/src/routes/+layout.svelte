<script lang="ts">
	import '@maxgraph/core/css/common.css';
	import '../style.css';
	import { onMount } from 'svelte';
	import { Client } from '@maxgraph/core';

	let maxGraphVersion: string;

	onMount(async () => {
		maxGraphVersion = Client.VERSION;
	});
</script>

<h1>maxGraph SvelteKit-TypeScript example</h1>
<p>Display a test graph. Activated behaviours:</p>
<ul>
	<li>Panning: use mouse right button</li>
	<li>Cells selection with Rubberband: use mouse left button</li>
</ul>

<slot />
<!-- display the maxGraph version in the footer -->
<footer>Built with maxGraph {maxGraphVersion}</footer>
