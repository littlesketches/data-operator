import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/model';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageServerParentData = Omit<EnsureDefined<import('../$types.js').LayoutServerData>, keyof LayoutServerData> & EnsureDefined<LayoutServerData>;
type PageParentData = Omit<EnsureDefined<import('../$types.js').LayoutData>, keyof LayoutData> & EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/model" | "/model/cw-193" | "/model/cw-193/ambi" | "/model/cw-193/dfam" | "/model/cw-193/operator" | "/model/ds-87" | "/model/ds-87/operator" | "/model/oe-10" | "/model/oe-10/ambi" | "/model/oe-10/dfam" | "/model/oe-10/operator"
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<import('../$types.js').LayoutData>;

export type PageServerLoad<OutputData extends OutputDataShape<PageServerParentData> = OutputDataShape<PageServerParentData>> = Kit.ServerLoad<RouteParams, PageServerParentData, OutputData, RouteId>;
export type PageServerLoadEvent = Parameters<PageServerLoad>[0];
export type ActionData = unknown;
export type PageServerData = Expand<OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../../src/routes/model/+page.server.js').load>>>>>>;
export type PageData = Expand<Omit<PageParentData, keyof PageServerData> & EnsureDefined<PageServerData>>;
export type Action<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Action<RouteParams, OutputData, RouteId>
export type Actions<OutputData extends Record<string, any> | void = Record<string, any> | void> = Kit.Actions<RouteParams, OutputData, RouteId>
export type PageProps = { params: RouteParams; data: PageData; form: ActionData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }
export type RequestEvent = Kit.RequestEvent<RouteParams, RouteId>;