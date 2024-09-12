import { readdirSync, readFileSync } from 'fs';
import { PWD } from '$env/static/private';

const p = '/src/pages/FullExample.md';

export const mdReader = (path: string = p) => {
	return readFileSync(PWD + path, 'utf-8');
	// const dirContent = readdirSync(PWD + '/src/pages');
	// console.log(dirContent);
};
