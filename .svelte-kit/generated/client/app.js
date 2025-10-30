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
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36')
];

export const server_loads = [];

export const dictionary = {
		"/": [13],
		"/_data/open-electricity": [14],
		"/docs": [15,[2]],
		"/docs/model/oe-10": [16,[2]],
		"/docs/model/oe-dfam": [17,[2]],
		"/docs/operator-design": [18,[2]],
		"/docs/quick-start": [19,[2]],
		"/docs/sonification": [20,[2]],
		"/docs/sonification/oe-10-ambi": [22,[2]],
		"/docs/sonification/oe-10-dfam": [23,[2]],
		"/docs/sonification/oe-10": [21,[2]],
		"/docs/user-manual": [24,[2]],
		"/model/cw-193": [25,[3]],
		"/model/cw-193/ambi": [26,[3,4]],
		"/model/cw-193/dfam": [27,[3,5]],
		"/model/cw-193/operator": [28,[3,6]],
		"/model/idp-86": [29,[3]],
		"/model/idp-86/ambi": [30,[3,7]],
		"/model/idp-86/dfam": [31,[3,8]],
		"/model/idp-86/operator": [32,[3,9]],
		"/model/oe-10": [33,[3]],
		"/model/oe-10/ambi": [34,[3,10]],
		"/model/oe-10/dfam": [35,[3,11]],
		"/model/oe-10/operator": [36,[3,12]]
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