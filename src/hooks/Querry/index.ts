import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

import { query, where } from 'firebase/firestore'; // Import the necessary functions

export function useFetchCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRef = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesRef);
        const coursesData = coursesSnapshot.docs.map((doc) => doc.data());
        setCourses(coursesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}

// Fetch courses for a specific instructor
export const fetchInstructorDatas = async (instructorId: string) => {
  const firestore = getFirestore(); // Initialize Firestore
  const instructorRef = doc(firestore, 'instructors', instructorId); // Get the instructor document

  // Use getDoc to retrieve the document
  const instructorDoc = await getDoc(instructorRef);

  if (instructorDoc.exists()) {
    // Check if the document exists
    const instructorData = instructorDoc.data();

    const coursesRef = collection(firestore, 'courses');
    const coursesQuery = query(coursesRef, where('instructor', '==', instructorId));
    const coursesSnapshot = await getDocs(coursesQuery);
    const courses = coursesSnapshot.docs.map((doc) => doc.data());

    return {
      ...instructorData,
      courses,
    };
  }

  return null;
};

// Update instructor obj for newly added course
export async function addCourseToInstructor(instructorId: string, courseId: string) {
  const firestore = getFirestore();
  const instructorRef = doc(firestore, 'instructors', instructorId);

  // Get the current instructor document
  const instructorDoc = await getDoc(instructorRef);
  const instructorData = instructorDoc.data();

  // Add the new course reference to the courses array
  if (instructorData) {
    const updatedCourses = [...instructorData.courses, courseId]; // Add the new course ID to the array
    await updateDoc(instructorRef, { courses: updatedCourses });
  }
}

// Fetch Instructor's data with course references
export async function fetchInstructorData(instructorId: string) {
  const firestore = getFirestore();
  const instructorRef = doc(firestore, 'instructors', instructorId);
  const instructorDoc = await getDoc(instructorRef);

  if (instructorDoc.exists()) {
    const instructorData = instructorDoc.data();

    // Fetch courses based on references
    const courses = await Promise.all(
      instructorData.courses.map(async (courseId: string) => {
        const courseRef = doc(firestore, 'courses', courseId);
        const courseDoc = await getDoc(courseRef);
        return courseDoc.data();
      })
    );

    return {
      ...instructorData,
      courses,
    };
  }

  return null;
}
