
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/open-electricity" | "/data" | "/data/climate-watch" | "/data/climate-watch/adaptation" | "/data/climate-watch/historical-emissions" | "/data/climate-watch/ndc-content" | "/data/climate-watch/pledge" | "/data/climate-watch/socio-economics" | "/data/open-electricity" | "/docs" | "/docs/design" | "/docs/model" | "/docs/model/oe-10" | "/docs/model/oe-dfam" | "/docs/quick-start" | "/docs/sonification" | "/docs/sonification/oe-10-ambi" | "/docs/sonification/oe-10-dfam" | "/docs/sonification/oe-10" | "/docs/user-manual" | "/oe-10-ambi" | "/oe-10-dfam" | "/oe-10";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/open-electricity": Record<string, never>;
			"/data": Record<string, never>;
			"/data/climate-watch": Record<string, never>;
			"/data/climate-watch/adaptation": Record<string, never>;
			"/data/climate-watch/historical-emissions": Record<string, never>;
			"/data/climate-watch/ndc-content": Record<string, never>;
			"/data/climate-watch/pledge": Record<string, never>;
			"/data/climate-watch/socio-economics": Record<string, never>;
			"/data/open-electricity": Record<string, never>;
			"/docs": Record<string, never>;
			"/docs/design": Record<string, never>;
			"/docs/model": Record<string, never>;
			"/docs/model/oe-10": Record<string, never>;
			"/docs/model/oe-dfam": Record<string, never>;
			"/docs/quick-start": Record<string, never>;
			"/docs/sonification": Record<string, never>;
			"/docs/sonification/oe-10-ambi": Record<string, never>;
			"/docs/sonification/oe-10-dfam": Record<string, never>;
			"/docs/sonification/oe-10": Record<string, never>;
			"/docs/user-manual": Record<string, never>;
			"/oe-10-ambi": Record<string, never>;
			"/oe-10-dfam": Record<string, never>;
			"/oe-10": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/open-electricity" | "/api/open-electricity/" | "/data" | "/data/" | "/data/climate-watch" | "/data/climate-watch/" | "/data/climate-watch/adaptation" | "/data/climate-watch/adaptation/" | "/data/climate-watch/historical-emissions" | "/data/climate-watch/historical-emissions/" | "/data/climate-watch/ndc-content" | "/data/climate-watch/ndc-content/" | "/data/climate-watch/pledge" | "/data/climate-watch/pledge/" | "/data/climate-watch/socio-economics" | "/data/climate-watch/socio-economics/" | "/data/open-electricity" | "/data/open-electricity/" | "/docs" | "/docs/" | "/docs/design" | "/docs/design/" | "/docs/model" | "/docs/model/" | "/docs/model/oe-10" | "/docs/model/oe-10/" | "/docs/model/oe-dfam" | "/docs/model/oe-dfam/" | "/docs/quick-start" | "/docs/quick-start/" | "/docs/sonification" | "/docs/sonification/" | "/docs/sonification/oe-10-ambi" | "/docs/sonification/oe-10-ambi/" | "/docs/sonification/oe-10-dfam" | "/docs/sonification/oe-10-dfam/" | "/docs/sonification/oe-10" | "/docs/sonification/oe-10/" | "/docs/user-manual" | "/docs/user-manual/" | "/oe-10-ambi" | "/oe-10-ambi/" | "/oe-10-dfam" | "/oe-10-dfam/" | "/oe-10" | "/oe-10/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.DS_Store" | "/assets/img/data-operator.svg" | "/assets/img/favicon.png" | "/css/.DS_Store" | "/css/_core/global.css" | "/css/module/data-operator/docs/et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot" | "/css/module/data-operator/docs/et-book/et-book-bold-line-figures/et-book-bold-line-figures.svg" | "/css/module/data-operator/docs/et-book/et-book-bold-line-figures/et-book-bold-line-figures.ttf" | "/css/module/data-operator/docs/et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff" | "/css/module/data-operator/docs/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot" | "/css/module/data-operator/docs/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.svg" | "/css/module/data-operator/docs/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.ttf" | "/css/module/data-operator/docs/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.woff" | "/css/module/data-operator/docs/et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot" | "/css/module/data-operator/docs/et-book/et-book-roman-line-figures/et-book-roman-line-figures.svg" | "/css/module/data-operator/docs/et-book/et-book-roman-line-figures/et-book-roman-line-figures.ttf" | "/css/module/data-operator/docs/et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff" | "/css/module/data-operator/docs/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot" | "/css/module/data-operator/docs/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.svg" | "/css/module/data-operator/docs/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.ttf" | "/css/module/data-operator/docs/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.woff" | "/css/module/data-operator/docs/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.eot" | "/css/module/data-operator/docs/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.svg" | "/css/module/data-operator/docs/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.ttf" | "/css/module/data-operator/docs/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.woff" | "/css/module/data-operator/docs/style.css" | "/css/module/data-operator/docs/tufte.css" | "/css/module/data-operator/style.css" | "/data/open-electricity/open-electricity.csv" | "/data/strudel.json" | "/data/tidal-drum-machines.json" | "/fonts/et-book/et-book-bold-line-figures/et-book-bold-line-figures.eot" | "/fonts/et-book/et-book-bold-line-figures/et-book-bold-line-figures.svg" | "/fonts/et-book/et-book-bold-line-figures/et-book-bold-line-figures.ttf" | "/fonts/et-book/et-book-bold-line-figures/et-book-bold-line-figures.woff" | "/fonts/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.eot" | "/fonts/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.svg" | "/fonts/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.ttf" | "/fonts/et-book/et-book-display-italic-old-style-figures/et-book-display-italic-old-style-figures.woff" | "/fonts/et-book/et-book-roman-line-figures/et-book-roman-line-figures.eot" | "/fonts/et-book/et-book-roman-line-figures/et-book-roman-line-figures.svg" | "/fonts/et-book/et-book-roman-line-figures/et-book-roman-line-figures.ttf" | "/fonts/et-book/et-book-roman-line-figures/et-book-roman-line-figures.woff" | "/fonts/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.eot" | "/fonts/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.svg" | "/fonts/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.ttf" | "/fonts/et-book/et-book-roman-old-style-figures/et-book-roman-old-style-figures.woff" | "/fonts/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.eot" | "/fonts/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.svg" | "/fonts/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.ttf" | "/fonts/et-book/et-book-semi-bold-old-style-figures/et-book-semi-bold-old-style-figures.woff" | "/robots.txt" | string & {};
	}
}