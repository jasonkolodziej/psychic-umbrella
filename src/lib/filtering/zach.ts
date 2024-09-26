// $50 - below
// x>50 - 200$
// x>200$

import type { FuseResult } from 'fuse.js';
import type { Picture } from './blog';

export interface PricingFilters {
	// Price range $ 50 and below
	FiftyAndBelow: boolean;
	// Price range ($ 50 to $ 200]
	OverFiftyToTwoHundred: boolean;
	// Price range ($ 200 and above)
	OverTwoHundred: boolean;
}

// Overall reviews
// Sections
// 1> Overall Rating 1-5
// 1a> Build experience (difficulty during build)
// 1b> Play experience (after build)
// 1c> Value for money (tie out)

export type RatingScore = 1 | 2 | 3 | 4 | 5;
export interface Review {
	// Based on the sub sections of the review
	overallRating?: RatingScore | number | null;
	// Total number of reviews
	totalReviews?: number;
	// Description of the overall rating
	overallRatingDescription?: string;
	// Criteria for the review
	criteria: Array<ReviewCriteria>;
}

export interface ReviewCriteria {
	// Difficulty during build
	Build_Experience: RatingScore | null;
	// After build
	Play_Experience: RatingScore | null;
	// Value for money, used as a tie breaker for the overall rating
	Value_For_Money: RatingScore | null;
}

const legoColors = {
	red: {
		50: '#f7cccc',
		100: '#f3b3b3',
		200: '#ef9999',
		300: '#eb8080',
		400: '#e76666',
		500: '#e34d4d',
		600: '#df3333',
		700: '#d70000',
		800: '#c20000',
		900: '#ac0000'
	},
	blue: {
		50: '#c0dbf8',
		100: '#abcff5',
		200: '#96c3f3',
		300: '#80b6f1',
		400: '#6baaee',
		500: '#2c86e7',
		600: '#236bb9',
		700: '#1f5ea2',
		800: '#1a508b',
		900: '#164374'
	},
	green: {
		50: '#99f2c9',
		100: '#80efbb',
		200: '#66ecad',
		300: '#4de9a0',
		400: '#33e592',
		500: '#00df77',
		600: '#00b25f',
		700: '#009c53',
		800: '#008647',
		900: '#00703c'
	},
	yellow: {
		50: '#ffe280',
		100: '#ffdc66',
		200: '#ffd64d',
		300: '#ffd033',
		400: '#ffca1a',
		500: '#ffc400',
		600: '#e6b000',
		700: '#cc9d00',
		800: '#b38900',
		900: '#997600'
	},
	gray: {
		hexLight: '#DBD7C3',
		hex: '#B7BDB1',
		hexDark: '#586561'
	}
};

// Lego Set
// SKU id
// Name
// Release Date
// Price
// Theme / Category
// Pictures
// => Picture
// ==> Description
// Size
// Rating

export interface Price {
	Value: number;
	Currency: string;
}

export interface LegoKit {
	// Unique identifier for the set
	SKU: string | number;
	// Name of the set
	Name: string;
	// Release date of the set
	ReleaseDate?: Date;
	// Price of the set
	Price?: Price;
	// Theme or category of the set
	theme?: string;
	// Function to get the category/theme of the set
	Category(): string;
	// Pictures of the set
	Pictures?: Picture[];
	// Number of pieces
	Size?: number;
	// Rating of the set
	Rating?: Review;
}

export type LegoSetOverview = {
	set_num: string; // '76902-1';
	name: string; // 'McLaren Elva';
	year: number; // 2021,
	theme_id: number; // 601,
	//* added for ease of use
	theme?: LegoTheme | FuseResult<LegoTheme>;
	num_parts: number; // 266,
	set_img_url: URL; // 'https://cdn.rebrickable.com/media/sets/76902-1/87822.jpg',
	set_url: URL; // 'https://rebrickable.com/sets/76902-1/mclaren-elva/',
	last_modified_dt: DateConstructor; // '2021-05-14T14:03:09.089614Z'
};

export type LegoTheme = {
	id: number; // 601,
	name: string; // 'Speed Champions',
	parent_id: number; // 1,
	parent_name?: string; // 'Modern day',
	// 'https://cdn.rebrickable.com/media/themes/601-Speed-Champions.jpg',
	image_url?: URL;
};

export class LegoSet implements LegoKit {
	SKU: string | number;
	Name: string;
	Pictures?: Picture[];
	Size?: number;
	Rating?: Review;

	Category(): string {
		return this.theme ?? 'Miscellaneous';
	}

	constructor(SKU: string | number, Name: string) {
		this.SKU = SKU;
		this.Name = Name;
		// this.ReleaseDate = undefined;
	}

	set theme(theme: string) {
		this.theme = theme;
	}

	get theme(): string | undefined {
		return this.theme;
	}

	public AddPictures(pics: Picture | Picture[]) {
		if (this.Pictures === undefined) {
			this.Pictures = new Array<Picture>();
		}
		if (Array.isArray(pics)) {
			this.Pictures.push(...pics);
		} else {
			this.Pictures.push(pics);
		}
	}

	set Price(price: Price) {
		this.Price = price;
	}

	set ReleaseDate(d: Date) {
		this.ReleaseDate = d;
	}

	get ReleaseDate(): Date | undefined {
		return this.ReleaseDate;
	}

	public AddReview(r: Review) {
		this.Rating = r;
	}
}

// Search bar to cover all of the above
