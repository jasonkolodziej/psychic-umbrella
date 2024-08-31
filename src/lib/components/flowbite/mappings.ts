//? "p", "blockquote", "ul", "ol", "li", "hr", "table", "thead", "tbody", "tr", "th", "td", "pre", "code", "em", "strong", "del", "a", "img"

import { component } from '@cartamd/plugin-component';
import type { ComponentConstructorOptions, ComponentProps, ComponentType } from 'svelte';
import Heading from '$components/carta-md/Heading.svelte';
import { svelte } from '@cartamd/plugin-component/svelte';
import type { Plugin } from 'carta-md';
import type { HeadingLevel } from '$components/blog/ui/card';
import type { P } from 'flowbite-svelte';

// ? Carta-md plugin for elements "h1", "h2", "h3", "h4", "h5", "h6"
export const FlowbiteHeading: Plugin = component<ComponentType<Heading>>(
	[
		svelte('h1', Heading),
		svelte('h2', Heading),
		svelte('h3', Heading),
		svelte('h4', Heading),
		svelte('h5', Heading),
		svelte('h6', Heading)
	],
	(components, renderer) => {
		renderer = renderer ?? (document.body as HTMLElement);

		const mountedComponents = renderer.querySelectorAll(
			'[data-mounted-component]'
		) as NodeListOf<HTMLElement>;
		console.log('mountedComponents', mountedComponents);
		for (const component of mountedComponents) {
			component.remove();
		}

		const placeholders = renderer.querySelectorAll('[data-component]') as NodeListOf<HTMLElement>;
		for (const placeholder of placeholders) {
			const id = placeholder.dataset.component;

			if (!id) {
				console.error('Component placeholder does not have a data-component attribute');
				continue;
			}
			//? get the mapped component
			const component = components.find((c) => c.id === id);
			if (!component) {
				console.error(`Component with id ${id} not found`);
				continue;
			}
			// console.log('mappedComponent', component);
			const tag = id as HeadingLevel | undefined;

			//? get the props and attributes from the placeholder
			const props = Array.from(placeholder.attributes)
				.filter((attr) => attr.name !== 'data-component')
				.map((attr) => ({
					[attr.name]: attr.value
				}))
				.reduce((acc, curr) => ({ ...acc, ...curr }), {});
			const wrapper = document.createElement('div');
			wrapper.setAttribute('data-mounted-component', id);
			wrapper.style.display = 'contents';
			placeholder.replaceWith(wrapper);

			// console.log(placeholder.innerHTML);
			const feedingProps: ComponentProps<Heading> = JSON.parse(placeholder.dataset.props || '{}');
			const options: ComponentConstructorOptions<typeof feedingProps> = {
				// target: placeholder,
				target: wrapper,
				props: { ...feedingProps, tag, ...props, value: placeholder.innerHTML }
			};
			// console.log('options', options);
			new component.component(options);

			// Add children to the slot
			const slot = wrapper.querySelector('[data-slot]') as HTMLElement | undefined;
			if (!slot) continue;

			slot.replaceWith(...placeholder.childNodes);
		}
	}
);

export const FlowbiteP: Plugin = component<ComponentType<P>>(
	[
		svelte('h1', Heading),
		svelte('h2', Heading),
		svelte('h3', Heading),
		svelte('h4', Heading),
		svelte('h5', Heading),
		svelte('h6', Heading)
	],
	(components, renderer) => {
		renderer = renderer ?? (document.body as HTMLElement);

		const mountedComponents = renderer.querySelectorAll(
			'[data-mounted-component]'
		) as NodeListOf<HTMLElement>;
		console.log('mountedComponents', mountedComponents);
		for (const component of mountedComponents) {
			component.remove();
		}

		const placeholders = renderer.querySelectorAll('[data-component]') as NodeListOf<HTMLElement>;
		for (const placeholder of placeholders) {
			const id = placeholder.dataset.component;

			if (!id) {
				console.error('Component placeholder does not have a data-component attribute');
				continue;
			}
			//? get the mapped component
			const component = components.find((c) => c.id === id);
			if (!component) {
				console.error(`Component with id ${id} not found`);
				continue;
			}
			// console.log('mappedComponent', component);
			const tag = id as HeadingLevel | undefined;

			//? get the props and attributes from the placeholder
			const props = Array.from(placeholder.attributes)
				.filter((attr) => attr.name !== 'data-component')
				.map((attr) => ({
					[attr.name]: attr.value
				}))
				.reduce((acc, curr) => ({ ...acc, ...curr }), {});
			const wrapper = document.createElement('div');
			wrapper.setAttribute('data-mounted-component', id);
			wrapper.style.display = 'contents';
			placeholder.replaceWith(wrapper);

			// console.log(placeholder.innerHTML);
			const feedingProps: ComponentProps<Heading> = JSON.parse(placeholder.dataset.props || '{}');
			const options: ComponentConstructorOptions<typeof feedingProps> = {
				// target: placeholder,
				target: wrapper,
				props: { ...feedingProps, tag, ...props, value: placeholder.innerHTML }
			};
			// console.log('options', options);
			new component.component(options);

			// Add children to the slot
			const slot = wrapper.querySelector('[data-slot]') as HTMLElement | undefined;
			if (!slot) continue;

			slot.replaceWith(...placeholder.childNodes);
		}
	}
);
