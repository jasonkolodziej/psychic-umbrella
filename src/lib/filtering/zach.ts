// $50 - below
// x>50 - 200$
// x>200$

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
	overallRating: RatingScore | null;
	// Difficulty during build
	BuildExperience: RatingScore | null;
	// After build
	PlayExperience: RatingScore | null;
	// Value for money, used as a tie breaker for the overall rating
	ValueForMoney: RatingScore | null;
}

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
