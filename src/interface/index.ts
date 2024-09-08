export interface ChildProps {
  children: JSX.Element[] | JSX.Element;
}
export interface instructorProps {
  _id: string;
  id: string;
  uid: string | undefined;
  gender: string;
  email: string;
  password: string;
  role?: string;
  token: string;
  photo?: string;
  photoURL?: string;
  emailVerified?: string;
  // user: any[];
  firstName: string;
  lastName: string;
  bio: string;
  phone_number: string;
  expertise: string;
  courses: string[];
  isVerified: boolean;
  profile_picture: string;
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
  status: 'Pending' | 'Active' | 'Inactive';
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
  courses: string[];
  isVerified: boolean;
  profile_picture: string;
  total_courses: any[];
  twitter: string;
  linkedin: string;
  facebook: string;

  status: 'Pending' | 'Active' | 'Inactive';
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

export interface LoginProps {
  email: string;
  password: string;
}

export interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
  // Heading: string;
  // Background: string;
}

export interface AdminLayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export interface Coord {
  lon: number;
  lat: number;
}
export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Main {
  temp: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Clouds {
  all: number;
}
export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}
