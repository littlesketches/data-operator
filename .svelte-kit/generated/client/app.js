export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/": [6],
		"/data/open-electricity": [7],
		"/docs": [8,[2]],
		"/docs/model/oe-10": [9,[2]],
		"/docs/model/oe-dfam": [10,[2]],
		"/docs/operator-design": [11,[2]],
		"/docs/quick-start": [12,[2]],
		"/docs/sonification": [13,[2]],
		"/docs/sonification/oe-10-ambi": [15,[2]],
		"/docs/sonification/oe-10-dfam": [16,[2]],
		"/docs/sonification/oe-10": [14,[2]],
		"/docs/user-manual": [17,[2]],
		"/oe-10-ambi": [19,[4]],
		"/oe-10-dfam": [20,[5]],
		"/oe-10": [18,[3]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';