<script>
    export let data;
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { initializeCentroids, updateCentroids, assignClusters , runKMeans} from '../lib/kMeans';
    import Range from './Range.svelte';
    import { select, scaleOrdinal, schemeCategory10 } from 'd3';

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

    let k = 3;
    let x;
    let y;

    let iterations = [];
    let currentIteration = 0;
    let maxIteration = 0;
    let colorScale;

    function initializeAndRun() {
        iterations = runKMeans(data, k, xVar, yVar);
        maxIteration = iterations.length - 1;
        currentIteration = 0;
        colorScale = scaleOrdinal(schemeCategory10).domain([...Array(k).keys()]);
        updatePlot();
        console.log(maxIteration);
    }

    function createScatter() {
        const svg = d3.select('#scatter')
            .attr('width', width)
            .attr('height', height);
        // console.log(svg);
        svg.selectAll('*').remove(); // Clear previous content
        const currentData = iterations[currentIteration]['data'];
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
            .data(currentData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[xVar]); } )
            .attr("cy", function (d) { return y(d[yVar]); } )
            .attr("r", 5)
            .style("fill", d => colorScale(d.Cluster));

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

    function updatePlot() {
        createScatter();
        plotInitialCentroids();
    }

    function plotInitialCentroids() {
        const svg = d3.select('#scatter')
        //TODO: clear previously created centroids
        svg.selectAll('#centroids').remove();

        const centroids = iterations[currentIteration]['centroids'];
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
            .style("fill", (d, i) => colorScale(i));
    }

    function onIterationChange(event) {
        currentIteration = +event.target.value;
        updatePlot();
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
        <button class='initialize' on:click={initializeAndRun}>Initialize and Run</button>
    </div>
    <svg id='scatter'></svg>
    <h2>Step 2: Reassign Centroids and Regroup Data Points</h2>
    <p>Now, the centroids are reassigned to the graphical middle of their cluster. Since the centroid has moved, each data point is categorized into a new cluster. Repeat this process by moving the slider until there is no change in centroids.</p>
    {#if maxIteration > 0}
        <div class="slider-container">
            <input class="iteration-slider" type="range" min="0" max={maxIteration} bind:value={currentIteration} on:input={onIterationChange} />
            <div class="iteration-label">Iteration: {currentIteration}</div>
        </div>
    {/if}
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
