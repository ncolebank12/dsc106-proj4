<script>
    import * as d3 from 'd3';
    import { onMount } from 'svelte';

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

    function createScatter() {
        const svg = d3.select('#species-scatter')
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
        createScatter();
    })

</script>

<svg id='species-scatter'></svg>