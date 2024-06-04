<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';
    import { initializeCentroids, updateCentroids, assignClusters , runKMeans} from '../lib/kMeans';
    import { select, scaleOrdinal, schemeCategory10 } from 'd3';



    export let data;
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

    let x;
    let y;
    let iterations = [];
    let colorScale;

    let currentMax = 0;
    let sampledata = []
    let setosaCluster;
    let versicolorCluster;
    let virginicaCluster;
    let safeIterations = [];
    let temp = {}
    let unchangeddata = [];
    let setKey;
    let versKey;
    let virgKey;
    safeIterations = [];

    //makes a copy of the data to keep the original data unchanged
    Object.assign(unchangeddata, data);
    iterations = runKMeans(unchangeddata, 3, xVar, yVar);
    safeIterations =  iterations[iterations.length-1]['data']

    function updateScatter() {
        //makes a copy of safeIterations to keep iterations unchanged
        sampledata = [];
        for (let i = 0; i < safeIterations.length; i++) {
            temp = {}
            Object.assign(temp, safeIterations[i]);
            sampledata.push(temp);
            
        }
        //gets the majority cluster for each species
        const maincluster = d3.rollup(sampledata,(D) => D.length, d =>d.Species, d => d.Cluster);
        console.log(maincluster);
        console.log(maincluster.get('setosa').get(0));

        setKey = maincluster.get('setosa').keys()
        versKey =  maincluster.get('versicolor').keys()
        virgKey = maincluster.get('virginica').keys()

        for (let key of setKey) {
            if (currentMax < maincluster.get('setosa').get(key)){
                currentMax = maincluster.get('setosa').get(key)
                setosaCluster = key;
                
            }
        
        }
        currentMax = 0;
        for (let key of versKey) {
            if (currentMax < maincluster.get('versicolor').get(key)){
                currentMax = maincluster.get('versicolor').get(key)
                versicolorCluster = key;

                
            }
            
        }
        currentMax = 0;
        for (let key of virgKey) {
            if (currentMax < maincluster.get('virginica').get(key)){
                currentMax = maincluster.get('virginica').get(key)
                virginicaCluster = key;
                
            }
        }
        //assigns the species to correct or incorrect based on the majority cluster
        for (let i = 0; i < sampledata.length; i++) {            
            
            if (sampledata[i].Species == 'setosa' && sampledata[i].Cluster != setosaCluster) {
                sampledata[i]['Species'] = 'incorrect';
                
            } else if (sampledata[i].Species == 'versicolor' && sampledata[i].Cluster != versicolorCluster) {
                sampledata[i]['Species'] = 'incorrect';

            } else if (sampledata[i].Species == 'virginica' && sampledata[i].Cluster != virginicaCluster) {
                sampledata[i]['Species'] = 'incorrect';
                
            } else {
                sampledata[i]['Species'] = 'correct';

            }
            

        }
        //const groupedData = d3.group(sampledata, d =>d.Petal_Length, d => d.Sepal_Length);
        
        sampledata.sort((a, b) => a.Species.localeCompare(b.Species));

        const svg = d3.select('#correct-scatter')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('*').remove(); // Clear previous content
        x = d3.scaleLinear()
            .domain(d3.extent(sampledata, (d) => d[xVar]))
            .range([0, innerWidth]);

        y = d3.scaleLinear()
            .domain([0,2.8])
            .range([innerHeight, 0]);
        const keys = ['correct', 'incorrect']
        let color = d3.scaleOrdinal()
            .domain(keys)
            .range(['green', 'red'])
        
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
            .data(sampledata)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[xVar]); } )
            .attr("cy", function (d) { return y(d[yVar]); } )
            .attr("r", 5)
            .style("fill", function (d) { return color(d.Species)});

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

        //legend
        svg.selectAll("legend-dots")
            .data(keys)
            .enter()
            .append("circle")
                .attr("cx", 800)
                .attr("cy", function(d,i){ return 400 + i*25})
                .attr("r", 7)
                .style("fill", function(d){ return color(d)})
        
        svg.selectAll("legend-labels")
            .data(keys)
            .enter()
            .append("text")
                .attr("x", 820)
                .attr("y", function(d,i){ return 400 + i*25})
                .style("fill", function(d){ return color(d)})
                .text(function(d){ return d})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
    }

    function createScatterKMeans() {
        colorScale = scaleOrdinal(schemeCategory10).domain([...Array(3).keys()]);
        const svg = d3.select('#correct-scatter')
            .attr('width', width)
            .attr('height', height);
        svg.selectAll('*').remove(); // Clear previous content
        
        x = d3.scaleLinear()
            .domain(d3.extent(safeIterations, (d) => d[xVar]))
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
            .data(safeIterations)
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
    function plotInitialCentroids() {
        const svg = d3.select('#correct-scatter')
        //TODO: clear previously created centroids

        const centroids = iterations[iterations.length-1]['centroids'];
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




    function createScatter() {

        const svg = d3.select('#correct-scatter')
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
        const keys = ['versicolor', 'virginica', 'setosa']
        let color = d3.scaleOrdinal()
            .domain(keys)
            .range(['#2a9d8f', '#e9c46a', '#f4a261'])
        
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
            .style("fill", function (d) { return color(d.Species)});

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

        //legend
        svg.selectAll("legend-dots")
            .data(keys)
            .enter()
            .append("circle")
                .attr("cx", 800)
                .attr("cy", function(d,i){ return 400 + i*25})
                .attr("r", 7)
                .style("fill", function(d){ return color(d)})
        
        svg.selectAll("legend-labels")
            .data(keys)
            .enter()
            .append("text")
                .attr("x", 820)
                .attr("y", function(d,i){ return 400 + i*25})
                .style("fill", function(d){ return color(d)})
                .text(function(d){ return d})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
    }

    onMount(() => {
        KmeansScatter();
    })
    
    function KmeansScatter() {
        createScatterKMeans();
        plotInitialCentroids();
        
    }

</script>
<p>Here, we can see the difference between the actual species groupings and those assigned by k-means clustering. Feel free to press the buttons to compare these groupings. The last button shows the number correctly clustered to their majority cluster!</p>
<button on:click={KmeansScatter}>Result of KMeans Algorithm</button>
<button on:click={createScatter}>Actual Species Classification</button>
<button on:click={updateScatter}>Number Correctly Clustered</button>


<svg id='correct-scatter'></svg>

