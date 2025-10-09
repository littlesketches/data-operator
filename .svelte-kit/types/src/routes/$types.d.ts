import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/_data/open-electricity" | "/docs" | "/docs/model/oe-10" | "/docs/model/oe-dfam" | "/docs/operator-design" | "/docs/quick-start" | "/docs/sonification" | "/docs/sonification/oe-10" | "/docs/sonification/oe-10-ambi" | "/docs/sonification/oe-10-dfam" | "/docs/user-manual" | "/model" | "/model/cw-193" | "/model/cw-193/ambi" | "/model/cw-193/dfam" | "/model/cw-193/operator" | "/model/ds-87" | "/model/ds-87/operator" | "/model/oe-10" | "/model/oe-10/ambi" | "/model/oe-10/dfam" | "/model/oe-10/operator" | null
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof PageParentData & EnsureDefined<PageServerData>> & OptionalUnion<EnsureDefined<PageParentData & EnsureDefined<PageServerData>>>>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutLoad<OutputData extends OutputDataShape<LayoutParentData> = OutputDataShape<LayoutParentData>> = Kit.Load<LayoutParams, LayoutServerData, LayoutParentData, OutputData, LayoutRouteId>;
export type LayoutLoadEvent = Parameters<LayoutLoad>[0];
export type LayoutData = Expand<Omit<LayoutParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+layout.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+layout.js').load>>>>>>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }