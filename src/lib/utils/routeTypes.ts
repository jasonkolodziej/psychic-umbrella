import type { SvelteComponent } from 'svelte';

export interface RouteType {
	name: string;
	href?: string;
	dropdown?: Array<RouteType & { icon?: typeof SvelteComponent }>;
}
