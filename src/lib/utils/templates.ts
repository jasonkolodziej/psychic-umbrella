import type { Moment } from 'moment';
import moment from 'moment';

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

//? https://spin.atomicobject.com/strongly-typed-date-string-typescript/
enum DateStrBrand {}

export type DateStr = string & DateStrBrand;

function checkValidDateStr(str: string): str is DateStr {
	return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
}

export function toDateStr(date: Date | Moment | string): DateStr {
	if (typeof date === 'string') {
		if (checkValidDateStr(date)) {
			return date;
		} else {
			throw new Error(`Invalid date string: ${date}`);
		}
	} else {
		const dateString = moment(date).format('YYYY-MM-DD');
		if (checkValidDateStr(dateString)) {
			return dateString;
		}
	}
	throw new Error(`Shouldn't get here (invalid toDateStr provided): ${date}`);
}

// export type MaybePromise<T> = T | Promise<T>;
