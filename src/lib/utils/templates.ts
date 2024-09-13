// https://refine.dev/blog/typescript-mapped-types/#typescript-type-mapper-utility-vs-ts-mapped-type-the-difference
export type Nullable<T> = T | null;
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type Distinct<TypeSource, DistinctName> = TypeSource & { __TYPE__: DistinctName };
export type FilterOut<Source, Keys> = {
	[Property in keyof Source as Exclude<Property, Keys>]: Source[Property];
};
export type FilterIn<Source, Keys> = {
	[Property in keyof Source as Extract<Property, Keys>]: Source[Property];
};
