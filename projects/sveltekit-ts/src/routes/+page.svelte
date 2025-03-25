<script lang="ts">
  import { onMount } from 'svelte';
  import {initializeGraph} from 'maxgraph-examples-shared';

  let container: HTMLElement;

  onMount(async () => {
    initializeGraph(container);
  });
</script>

<div bind:this={container} id="graph-container"></div>
