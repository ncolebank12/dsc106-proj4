<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import KMeansGrapher from './components/KMeansGrapher.svelte';

  let data = [];

  onMount(async () => {
    data = await d3.csv('dsc106-proj4/iris.csv', d3.autoType);
    console.log(data);
  });
  
</script>

<main>

  <h1>Visualizing K-Means Clustering</h1>
  <h3>An Unsupervised Machine Learning Algorithm</h3>

  {#if data.length === 0}
  <p>Loading...</p>
  {:else}
    <KMeansGrapher {data} />
  {/if}

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
