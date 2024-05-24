<script>
    export let data;
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

    const width = 928;
    const height = 550;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 20;
    const marginLeft = 40;

    const innerHeight = height - marginBottom - marginTop;
    const innerWidth = width - marginLeft - marginRight;

    const xVar = 'Sepal_Length';
    const yVar = 'Petal_Width';

    function createScatter() {
        const svg = d3.select('#scatter')
            .attr('width', width)
            .attr('height', height);
        console.log(svg);
        svg.selectAll('*').remove(); // Clear previous content
        const x = d3.scaleLinear()
            .domain(d3.extent(data, (d) => d[xVar]))
            .range([0, innerWidth]);

        const y = d3.scaleLinear()
            .domain([0,2.8])
            .range([innerHeight, 0]);
        
        const g = svg.append('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`);

        g.append('g')
            .call(d3.axisLeft(y));

        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[xVar]); } )
            .attr("cy", function (d) { return y(d[yVar]); } )
            .attr("r", 5)
            .style("fill", "#69b3a2")
    }

    onMount(() => {
        createScatter();
    })


    
</script>


<svg id='scatter'></svg>

<style>
    svg {
        max-width: 100%;
        height: auto;
    }
</style>