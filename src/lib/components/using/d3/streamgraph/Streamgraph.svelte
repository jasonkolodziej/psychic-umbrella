<script lang="ts">
	import * as d3 from 'd3';

	export let data;
	export let width = 928;
	export let height = 500;
	export let marginTop = 20;
	export let marginRight = 20;
	export let marginBottom = 20;
	export let marginLeft = 20;
	//? https://observablehq.com/@d3/streamgraph-transitions
	let n = 20; // number of layers
	let m = 200; // number of samples per layer
	let k = 10; // number of bumps per layer
	let offset = d3.stackOffsetWiggle;
	async function* chart(): AsyncGenerator<SVGElement, HTMLOrSVGElement> {
		const x = d3.scaleLinear([0, m - 1], [0, width]);
		const y = d3.scaleLinear([0, 1], [height, 0]);
		const z = d3.interpolateCool;

		const area = d3
			.area()
			.x((d, i) => x(i))
			.y0((d) => y(d[0]))
			.y1((d) => y(d[1]));

		const stack = d3.stack().keys(d3.range(n)).offset(offset).order(d3.stackOrderNone);

		function randomize() {
			const layers = stack(d3.transpose(Array.from({ length: n }, () => bumps(m, k))));
			y.domain([
				d3.min(layers, (l) => d3.min(l, (d) => d[0])),
				d3.max(layers, (l) => d3.max(l, (d) => d[1]))
			]);
			return layers;
		}

		const svg = d3
			.create('svg')
			.attr('viewBox', [0, 0, width, height])
			.attr('width', width)
			.attr('height', height)
			.attr('style', 'max-width: 100%; height: auto;');

		const path = svg
			.selectAll('path')
			.data(randomize)
			.join('path')
			.attr('d', area)
			.attr('fill', () => z(Math.random()));

		while (true) {
			yield svg.node();

			await path.data(randomize).transition().delay(1000).duration(1500).attr('d', area).end();
		}
	}
	function* bumps(n: number, m: number) {
		// Inspired by Lee Byron’s test data generator.
		function bump(a: Array<number>, n: number) {
			const x = 1 / (0.1 + Math.random());
			const y = 2 * Math.random() - 0.5;
			const z = 10 / (0.1 + Math.random());
			for (let i = 0; i < n; ++i) {
				const w = (i / n - y) * z;
				a[i] += x * Math.exp(-w * w);
			}
		}
		return function bumps(n: number, m: number) {
			const a = [];
			for (let i = 0; i < n; ++i) a[i] = 0;
			for (let i = 0; i < m; ++i) bump(a, n);
			return a;
		};
	}

	// $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
	// $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
	// $: line = d3.line((d, i) => x(i), y);
</script>

<!-- <svelte:element this={await chart().next().then(d => d.value)} /> -->

<!-- <svg {width} {height}>
	<path fill="none" stroke="currentColor" stroke-width="1.5" d={d3.line(data)} />
	<g fill="white" stroke="currentColor" stroke-width="1.5">
		{#each data as d, i}
			<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
		{/each}
	</g>
</svg> -->
