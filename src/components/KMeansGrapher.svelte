<script>
    export let data;
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { initializeCentroids, updateCentroids, assignClusters } from '../lib/kMeans';
  import Range from './Range.svelte';

    const width = 950;
    const height = 550;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 70;
    const marginLeft = 60;

    const innerHeight = height - marginBottom - marginTop;
    const innerWidth = width - marginLeft - marginRight;

    const xVar = 'Sepal_Length';
    const yVar = 'Petal_Width';

    let k = 0;
    let x;
    let y;

    function createScatter() {
        const svg = d3.select('#scatter')
            .attr('width', width)
            .attr('height', height);
        console.log(svg);
        svg.selectAll('*').remove(); // Clear previous content
        x = d3.scaleLinear()
            .domain(d3.extent(data, (d) => d[xVar]))
            .range([0, innerWidth]);

        y = d3.scaleLinear()
            .domain([0,2.8])
            .range([innerHeight, 0]);
        
        const g = svg.append('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`);

        g.append('g')
            .call(d3.axisLeft(y));

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        //data points
        svg.append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[xVar]); } )
            .attr("cy", function (d) { return y(d[yVar]); } )
            .attr("r", 5)
            .style("fill", "#69b3a2");

        //axis labels
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 30)
            .text("Sepal Length");

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", marginLeft - 35)
            .attr("x", marginTop - 20)
            .text("Petal Length")
        
    }

    function plotInitialCentroids() {
        const svg = d3.select('#scatter')
        //TODO: clear previously created centroids
        svg.selectAll('#centroids').remove();

        const centroids = initializeCentroids(data, k);
        svg.append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .attr('id', 'centroids')
            .selectAll("centroid")
            .data(centroids)
            .enter()
            .append("circle")
            .attr("cx", function (c) { return x(c[xVar]); } )
            .attr("cy", function (c) { return y(c[yVar]); } )
            .attr("r", 10)
            .style("fill", "#b3697a");
    }

    onMount(() => {
        createScatter();
    })


    
</script>

<div>
    <div class='user-input'>
        <div class='slider'>
            <label for='basic-range'>Number of Centroids ({k})</label>
            <Range on:change={(e) => k = e.detail.value} />
            </div>
            <button class='initialize' on:click={() => plotInitialCentroids()}>Initialize Centroids</button>
    </div>
    <svg id='scatter'></svg>
    <p>This is a scatter plot showing the relationship between Sepal Length and Petal Length. The data points are represented by circles, and the initial centroids are represented by larger circles. Use the slider to change the number of centroids and click "Initialize Centroids" to update the plot. Using these centroids we'll be able to see groupings that might indicate a plant's species</p>
</div>

<style>
    svg {
        max-width: 100%;
        height: auto;
    }

    label {
        text-align: left;
        margin: 8px;
		font-size: 16px;
		font-weight: 600;
    }

    button {
        height: 60px;
        margin-top: 25px;
    }

    .user-input {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
    }

    .slider {
        width: 50%;
        margin: 30px;
        text-align: left;
    }



</style>