import {useQuery} from "react-query";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../Firebase";

interface Course {
	id: string;
	title: string;
	description: string;
	instructor: string;
	// Add other course fields as needed
}

const fetchCourses = async (): Promise<Course[]> => {
	const coursesCollection = collection(db, "courses");
	const coursesSnapshot = await getDocs(coursesCollection);
	const coursesList = coursesSnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data(),
	})) as Course[];
	return coursesList;
};

const useFetchCourses = () => {
	return useQuery<Course[], Error>("courses", fetchCourses);
};

export default useFetchCourses;
