<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import iris from './lib/data/iris.json'



  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import KMeansGrapher from './components/KMeansGrapher.svelte';
    import SpeciesScatter from './components/SpeciesScatter.svelte';
  import Banner from './components/Banner.svelte';
    import Setosa from './assets/Setosa.jpg';
    import Versicolor from './assets/Versicolor.jpg';
    import Virginica from './assets/Virginica.jpg';
    import ClusteredCorrectly from './components/ClusteredCorrectly.svelte';


  let data = [];

  onMount(async () => {
    // data = await d3.csv('../assets/iris.csv', d3.autoType);
    data = iris;
    console.log(data);
  });
  
</script>

<main>
  <Banner />

  <!-- <h1>Visualizing K-Means Clustering</h1>
  <h3>An Unsupervised Machine Learning Algorithm</h3>
  <br>
  <br>
  <br>
  <br> -->
  
  
  

<h2>What to do when you need to find unlabeled groups in a dataset</h2>


  <p>
    K-means clustering is a popular unsupervised machine learning algorithm used to find groups in unlabeled datasets. It is commonly used for tasks such as customer segmentation, image compression, and anomaly detection.
  </p>
  <br>
  <p>
    To visualize how k-means clustering works, we will be using the Iris dataset, which consists of 3 different species of irises (Setosa, Versicolor, and Virginica). These species look very similarAll of the plots below show the relationship between Sepal Length nad Petal Length for the 150 irises in the dataset.
    See <a href='https://en.wikipedia.org/wiki/Iris_flower_data_set'>here</a> for more information regarding the dataset.
  </p>
  <div style="display: flex; align-items: center;">
    <img src={Setosa} alt="Setosa" style="width: 265px; height: auto; margin-right: 200px; opacity: 0; animation: fade-in-slow 3s forwards; border: 1px solid black;"/>
    
    <img src={Versicolor} alt="Versicolor" style="width: 170px; height: auto; margin-right: 200px; opacity: 0; animation: fade-in-slow 4s forwards; border: 1px solid black;"/>
    
    <img src={Virginica} alt="Virginica" style="width: 230px; height: auto; margin-right: 100px; opacity: 0; animation: fade-in-slow 5s forwards; border: 1px solid black;"/>
  </div>
  <div style="display: flex; align-items: center;">
    <p style="opacity: 0; animation: fade-in-slow 3s forwards;margin-right: 413px">Setosa</p>
    <p style="opacity: 0; animation: fade-in-slow 4s forwards;margin-right: 300px">Versicolor</p>
    <p style="opacity: 0; animation: fade-in-slow 5s forwards;margin-right: 600px">Virginica</p>
    
  </div>
  <div style="display: flex; align-items: center;">
    
  </div>
  
  <style>  
    @keyframes fade-in-slow {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .fade-in-slow {
      animation: fade-in-slow 5s forwards;
    }
  </style>
  <p>These three species look very similar, and even with an unlabeled dataset, it would be hard to classify them by species. However, k-means clustering can help with that!</p>
  <br>

  <h2>Step 1: Initializing Centroids</h2>
  <p>The first step of the k-means clustering algorithm involves choosing <i>k</i> centroids. There are a few ways to initalize the centroids. The most common one, which we use here, is picking <i>k</i> points randomly to be the initial centroids.edr]</p>
  <p>After the centroids are placed, each data point in the scatterplot is assigned to a cluster corresponding to the nearest centroid, which can be seen by the visualization below.</p>
  
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


  {#if data.length === 0}
  <p>Loading...</p>
  {:else}
    <ClusteredCorrectly {data}/>
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
