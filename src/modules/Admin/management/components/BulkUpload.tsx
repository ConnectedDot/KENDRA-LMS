import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {faker} from "@faker-js/faker";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../../../Firebase";
import {doc, setDoc} from "firebase/firestore";
import {message} from "antd";

interface User {
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	isVerified: boolean;
	password: string;
	gender: string;
	photo: string;
	registeredAt?: Date | string;
}

const generateRandomUsers = (count: number): User[] => {
	const roles = ["Admin", "Instructor", "Student"];
	const users: User[] = [];

	for (let i = 0; i < count; i++) {
		users.push({
			email: faker.internet.email(),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			registeredAt: faker.date.past(),
			photo: faker.image.avatar(),
			role: roles[Math.floor(Math.random() * roles.length)],
			isVerified: faker.datatype.boolean(),
			password: faker.internet.password({length: 8}),
			gender: faker.person.gender(), // Generate a random gender
		});
	}

	return users;
};

const createAndStoreUsers = async (usersData: User[]) => {
	try {
		const createdUsers: {
			uid: string;
			email: string;
			firstName: string;
			lastName: string;
			role: string;
			gender: string;
			isVerified: boolean;
			photo: string;
			registeredAt: any;
		}[] = [];

		for (const userData of usersData) {
			// Create a new user in Firebase Authentication
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			);
			const user = userCredential.user;

			// Store user data in Firestore
			const userDocData = {
				uid: user.uid,
				email: userData.email,
				displayName: `${userData.firstName} ${userData.lastName}`,
				role: userData.role,
				isVerified: userData.isVerified,
				photo: userData.photo,
				registeredAt: userData.registeredAt,
				firstName: userData.firstName,
				lastName: userData.lastName,
				gender: userData.gender,
			};

			if (user) {
				await setDoc(doc(db, "KLMS-USER", user.uid), userDocData);
				console.log(userDocData, "userDocData");
				createdUsers.push(userDocData);
			} else {
				message.error("User not authenticated.");
			}
		}

		console.log("Successfully created and stored users:", createdUsers);
		message.success("Successfully created and stored users:");
	} catch (error) {
		console.error("Error creating users:", error);
		message.error("Error creating users.");
	}
};

const BulkUpload: React.FC = () => {
	const handleButtonClick = () => {
		const usersData = generateRandomUsers(30);
		createAndStoreUsers(usersData);
	};

	return (
		<div>
			<button onClick={handleButtonClick} className="btn btn-primary">
				Create and Store Users
			</button>
		</div>
	);
};

export default BulkUpload;
