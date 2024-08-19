<script lang="ts">
  import '@maxgraph/core/css/common.css';
  import 'maxgraph-examples-shared/css/rubber-band.css'
  import 'maxgraph-examples-shared/css/general-style.css'
  import { Client } from '@maxgraph/core';
</script>

<svelte:head>
  <title>maxGraph SvelteKit TypeScript example</title>
</svelte:head>

<h1>maxGraph SvelteKit TypeScript example</h1>
<p>Display a test graph. Activated behaviours:</p>
<ul>
  <li>Panning: use mouse right button</li>
  <li>Cells selection with Rubberband: use mouse left button</li>
</ul>

<slot />
<!-- display the maxGraph version in the footer -->
<footer>Built with maxGraph {Client.VERSION}</footer>
