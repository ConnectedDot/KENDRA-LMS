
# Kendra LMS ![alt text](src/assets/Logo/3-re.png)

Kendra LMS is an innovative online learning platform that connects learners with instructors from around the globe. 
As the project proposes, it’s more or less a mini-Udemy-like project to provide virtual learning experience to learners, and allow instructors present their skilled program/courses to prospective learners.
This is a web-based educational platform designed to facilitate online learning through dynamic course categorization, content delivery, and personalized learning paths. The platform mimics the structure of popular online learning websites (Udemy), allowing users to navigate through courses based on categories and subcategories, enhancing their learning experience.



- Deployed: 🏠 [Homepage](https://kendra-lms.vercel.app)

- Demo Video:✨ [Demo](https://youtu.be/YhrYUb_mFTY)

## Folder Structuring

```
src/
|-- assets/
|-- axios-instance/
|   |-- Logo/
|       |-- 3-re.png
|-- components/
|   |-- Cards/
|   |-- Carousel/
|   |-- CarouselComponents/
|   |-- Footer/
|   |-- Forms/
|   |-- Loader/
|   |-- Modals/
|       |-- index.ts
|-- Firebase/
|-- hooks/
|-- interface/
|-- layouts/
|   |-- Admin/
|   |-- Instructor/
|   |-- Home/
|   |-- Learners/
    |-- index.tsx
|-- modules/
|   |-- Admin/
|       |-- Auths/
|       |-- components/
|       |-- hooks/
|       |-- management/
|       |-- index.tsx
|   |-- Auth/
|       |-- index.tsx
|   |-- Admin/
|       |-- index.tsx
|   |-- Home/
|       |-- index.tsx
|   |-- Insttructor/
|       |-- courses/
|       |-- profile/
|       |-- index.tsx
|   |-- Learners/
|       |-- courses/
|       |-- profile/
|       |-- index.tsx
|-- routes/
|       |-- index.tsx
|-- storage/
|-- utils/
|   |-- index.ts
|-- App.tsx
|-- index.tsx
```
## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation️)
5. [Usage](#usage️)
6. [Contributing](#contributing)
7. [Project Stack](#project-stack)
8. [License](#license)
9. [Contact](#contact)



## Introduction

Kendra LMS is designed to provide a seamless and engaging learning experience for both learners and instructors. The platform offers a variety of courses across different categories, allowing users to find and enroll in courses that match their interests and career goals.

## Features

- User Authentication
- Dynamic course categorization
- Personalized learning paths
- Interactive content delivery
- User-friendly navigation
- Instructor-led courses

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed the latest version of [Node.js](https://nodejs.org/)
- You have a [GitHub](https://github.com/) account
- You have installed [Yarn](https://yarnpkg.com/)

## Installation

To install the project, follow these steps:

```sh
yarn install
```

### Firebase Initialization

To initialize Firebase in your project, follow these steps:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a new web app to your Firebase project.
3. Copy the Firebase configuration object provided by Firebase.

Create a file named `firebaseConfig.js` in your project and add your Firebase configuration:

```javascript
// firebaseConfig.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

export default firebaseConfig;
```
> But it's best to create a `.env` file in the root directory and add these configurations there. This approach helps keep your sensitive information secure and separate from your codebase. 

To do this, follow these steps:

1. **Create a `.env` file**:
  Create a file named `.env` in the root directory of your project.

2. **Add your Firebase configuration**:
  Copy the Firebase configuration object and add it to the `.env` file in the following format:

  ```env
  REACT_APP_API_KEY=YOUR_API_KEY
  REACT_APP_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
  REACT_APP_DATABASE_URL=https://YOUR_PROJECT_ID.firebaseio.com
  REACT_APP_PROJECT_ID=YOUR_PROJECT_ID
  REACT_APP_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
  REACT_APP_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
  REACT_APP_APP_ID=YOUR_APP_ID
  REACT_APP_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
  ```

3. **Add `.env` to `.gitignore`**:
  To ensure that your sensitive information is not exposed in your version control system, add the `.env` file to your `.gitignore` file:

  ```sh
  echo ".env" >> .gitignore
  ```

4. **Use environment variables in your code**:
  Update your `firebaseConfig.js` file to use the environment variables:

  ```javascript
  // firebaseConfig.js

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };

  export default firebaseConfig;
  ```

By following these steps, you ensure that your sensitive configuration details are kept secure and are not accidentally shared in your code repository.


4. Initialize Firebase in your application:

```javascript
// index.js or App.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

// Now you can use Firebase services, for example:
const auth = firebase.auth();
const db = firebase.firestore();
```

Make sure to replace the placeholder values in the `firebaseConfig` object with your actual Firebase project configuration values.

## Usage

To use the project, follow these steps:

```sh
yarn run start
```

## Run tests

To run tests, use the following command:

```sh
yarn run test
```

## Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ConnectedDot/KENDRA-LMS/issues). 


## Project Stack

The Kendra LMS project utilizes a variety of technologies to deliver a robust and scalable online learning platform. Below is a list of the primary technologies used:

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for JavaScript apps.
  - Tailwind CSS: A utility-first CSS framework for rapid UI development.

- **Backend:**
  - Firebase: A platform developed by Google for creating mobile and web applications.
    - Firestore: A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
    - Firebase Storage: A powerful, simple, and cost-effective object storage service built for Google scale.

- **Authentication:**
      - Firebase Auth: For managing user authentication and authorization.

- **Deployment:**
  - Vercel: A cloud platform for static sites and Serverless Functions.

- **Testing:**
  - Jest: A delightful JavaScript Testing Framework with a focus on simplicity.
  - Enzyme: A JavaScript Testing utility for React that makes it easier to test your React Components' output.

- **Version Control:**
  - Git: A distributed version control system.
  - GitHub: A platform for version control and collaboration.

- **Package Management:**
  - Yarn: A package manager that doubles down as project manager.

This stack ensures that the platform is efficient, scalable, and maintainable, providing a seamless experience for both learners and instructors.


## License

This project is [BSD 3--Clause &#34;New&#34; or &#34;Revised&#34; License](https://github.com/ConnectedDot/KENDRA-LMS/blob/develop/LICENSE) licensed.

## Contact

👤 **Theophilus Samuel**

* Website: connecteddots.disha.page
* Twitter: [@Mc\_Samuell](https://twitter.com/Mc\_Samuell)
* LinkedIn: [@theophilus-mcsamue](https://linkedin.com/in/theophilus-mcsamue)

## Show your support

Give a ⭐️ if this project inspire you!
