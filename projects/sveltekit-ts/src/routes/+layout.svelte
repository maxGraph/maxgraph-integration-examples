<script lang="ts">
  import 'maxgraph-examples-shared/css/all.css'
  import { Client } from '@maxgraph/core';
</script>

<svelte:head>
  <title>maxGraph SvelteKit TypeScript example</title>
</svelte:head>

<h1>maxGraph <a href="https://svelte.dev/tutorial/kit/introducing-sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> TypeScript example</h1>
<p>Display a test graph. Activated behaviours:</p>
<ul>
  <li>Panning: use mouse right button</li>
  <li>Cells selection with Rubberband: use mouse left button</li>
</ul>

<slot />
<!-- display the maxGraph version in the footer -->
<footer>Built with maxGraph {Client.VERSION}</footer>
