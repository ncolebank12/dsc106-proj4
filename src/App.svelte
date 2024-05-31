<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import iris from './lib/data/iris.json'

  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import KMeansGrapher from './components/KMeansGrapher.svelte';
    import SpeciesScatter from './components/SpeciesScatter.svelte';

  let data = [];

  onMount(async () => {
    // data = await d3.csv('../assets/iris.csv', d3.autoType);
    data = iris;
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
 
  <h2>What to do when you need to find unlabeled groups in a dataset</h2>
  <p>
    K-means clustering is a popular unsupervised machine learning algorithm used to find groups in unlabeled datasets. It is commonly used for tasks such as customer segmentation, image compression, and anomaly detection.
  </p>
  <br>
  <p>
    To visualize how k-means clustering works, we will be using the Iris dataset, which consists of 3 different species of irises (Setosa, Versicolor, and Virginica). All of the plots below show the relationship between Sepal Length nad Petal Length for the 150 irises in the dataset.
    See <a href='https://en.wikipedia.org/wiki/Iris_flower_data_set'>here</a> for more information regarding the dataset.
  </p>
  <br>

  <h2>Step 1: Initializing Centroids</h2>
  <p>The first step of the k-means clustering algorithm involves choosing <i>k</i> centroids. There are a few ways to initalize the centroids. The most common one, which we use here, is picking <i>k</i> points randomly to be the initial centroids.edr]</p>
  {#if data.length === 0}
  <p>Loading...</p>
  {:else}
    <KMeansGrapher {data} />
  {/if}

  <h2>
    How does k-means clustering compare to the actual labels?
  </h2>
  <p>
    Lets look at the actual labels for species:
  </p>



  {#if data.length === 0}
  <p>Loading...</p>
  {:else}
    <SpeciesScatter {data} />
  {/if}

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
