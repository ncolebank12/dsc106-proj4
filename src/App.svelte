<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import KMeansGrapher from './components/KMeansGrapher.svelte';

  let data = [];

  onMount(async () => {
    data = await d3.csv('/iris.csv', d3.autoType);
    console.log(data);
  });
  
</script>

<main>

  <h1>Visualizing K-Means Clustering</h1>
  <h3>An Unsupervised Machine Learning Algorithm</h3>
  <br>
  <br>
  <br>
  <br>
 
  <h2>What to do when you need to find unlabled groups in a dataset</h2>
  <p>
    K-means clustering is a popular unsupervised machine learning algorithm used to find groups in unlabeled datasets. It is commonly used for tasks such as customer segmentation, image compression, and anomaly detection.
  </p>


  {#if data.length === 0}
  <p>Loading...</p>
  {:else}
    <KMeansGrapher {data} />
  {/if}

  <p>
    #TODO: graph of actual labeled data for comparison (using the "Species" column)
  </p>

  <p class="read-the-docs">
    #TODO: (optional) box plot of the different clusters pedal lengths
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
