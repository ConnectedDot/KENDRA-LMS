export interface ChildProps {
	children: JSX.Element[] | JSX.Element;
}

export type CombinedUserProps = instructorProps & userProps;
export interface instructorProps {
	_id: string;
	id: string;
	uid: string | undefined;
	gender: string;
	email: string;
	role?: string;
	emailVerified?: string;
	firstName: string;
	lastName: string;
	bio: string;
	phone_number: string;
	photo?: string;
	token: string;
	photoURL?: string;
	// user: any[];
	isApproved: boolean;
	expertise: string;
	isVerified: boolean;
	total_students: number;
	total_courses: any[];
	total_reviews: any[];
	skill_level: any[];
	website: string;
	twitter: string;
	linkedin: string;
	facebook: string;
	instagram: string;
	youtube: string;
	certification: string | null;
	status: "Pending" | "Active" | "Inactive";
}
export interface userProps {
	_id: string;
	id: string;
	uid: string | undefined;
	gender: string;
	email: string;
	role?: string;
	emailVerified?: string;
	firstName: string;
	lastName: string;
	bio: string;
	phone_number: string;
	photo?: string | File;
	courses: string[];
	isVerified: boolean;
	total_courses: any[];
	twitter: string;
	linkedin: string;
	facebook: string;
	cart: any[];
	status: "Pending" | "Active" | "Inactive";
}

export interface CourseProps {
	_id: string;
	title: string;
	image: string;
	instructor: string; // Instructor document ID
	description: string;
	rating: number;
	price: string;
	reviewsCount: number;
	learningPoints: string[];
	content: {
		title: string;
		lectures: string[];
	}[];
	videos: {
		id: number;
		title: string;
		youtubeId: string;
		thumbnailUrl: string;
		playtime: string;
		watched: boolean;
	}[];
	questions: {
		question: string;
		answer: string;
	}[];
}

export interface loginProps {
	email: string;
	password: string;
}

export interface IDecodedUser {
	_id: string;
	id: string;
	uid: string | undefined;
	gender: string;
	fullname: string;
	email: string;
	password: string;
	role?: string;
	token: string;
	user: any[];
	firstName: string;
	lastName: string;
	bio: string;
	phone_number: string;
	exp: number;
	iat: number;
	iss: string;
}

export interface IUser {
	_id: string;
	id: string;
	uid: string | undefined;
	gender: string;
	fullname: string;
	email: string;
	password: string;
	role?: string;
	token: string;
	user: any[];
	firstName: string;
	lastName: string;
	bio: string;
	phone_number: string;
}

export interface FormErrors {
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
}

export interface LoginProps {
	email: string;
	password: string;
}

export interface LayoutProps {
	children: JSX.Element[] | JSX.Element;
}

export interface AdminLayoutProps {
	children: JSX.Element[] | JSX.Element;
}

interface Lecture {
	Title: string;
	Lectures: string[];
}

interface Question {
	question: string;
	answer: string;
}

interface Video {
	id: number;
	title: string;
	youtubeId: string;
	thumbnailUrl: string;
	playtime: string;
	watched: boolean;
}
interface CategioryInfo {
	id: number;
	title: string;
}
interface SubCategioryInfo {
	id: number;
	title: string;
}

export interface Course {
	_id: string;
	id: string;
	Title: string;
	image?: any;
	Description: string;
	fullbrief: string;
	students: number;
	instructorId?: any;
	instuctor: string;
	Rating: number;
	ReviewsCount: number;
	isApproved: boolean;
	price: string;
	LearningPoints: string[];
	Content: Lecture[];
	Questions: Question[];
	Videos: Video[];
	category: CategioryInfo[];
	subcategoryId: SubCategioryInfo[];
}
