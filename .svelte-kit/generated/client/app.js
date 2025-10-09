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
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33')
];

export const server_loads = [];

export const dictionary = {
		"/": [11],
		"/_data/open-electricity": [12],
		"/docs": [13,[2]],
		"/docs/model/oe-10": [14,[2]],
		"/docs/model/oe-dfam": [15,[2]],
		"/docs/operator-design": [16,[2]],
		"/docs/quick-start": [17,[2]],
		"/docs/sonification": [18,[2]],
		"/docs/sonification/oe-10-ambi": [20,[2]],
		"/docs/sonification/oe-10-dfam": [21,[2]],
		"/docs/sonification/oe-10": [19,[2]],
		"/docs/user-manual": [22,[2]],
		"/model": [~23,[3]],
		"/model/cw-193": [24,[3]],
		"/model/cw-193/ambi": [25,[3,4]],
		"/model/cw-193/dfam": [26,[3,5]],
		"/model/cw-193/operator": [27,[3,6]],
		"/model/ds-87": [28,[3]],
		"/model/ds-87/operator": [29,[3,7]],
		"/model/oe-10": [30,[3]],
		"/model/oe-10/ambi": [31,[3,8]],
		"/model/oe-10/dfam": [32,[3,9]],
		"/model/oe-10/operator": [33,[3,10]]
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