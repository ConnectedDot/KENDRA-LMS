// import { v4 as uuidv4 } from 'uuid';

export const testimonials = [
	{
		id: 1,
		text: "I am proud to say that after a few months of taking this course... I passed my exam and am now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.",
		author: "Will A",
	},
	{
		id: 2,
		text: "This course helped me freshen up on my product manager skills and land a job at Facebook! Thanks guys :)",
		author: "Ron F",
	},
	{
		id: 3,
		text: "One of the best courses on management and leadership I have come across so far. The advice is practical, and examples highly relatable. Would help anyone become a better manager.",
		author: "Philip W",
	},
	// {
	// 	id: 4,
	// 	text: "The web development course was comprehensive and easy to follow. I now feel confident in my ability to build and deploy web applications.",
	// 	author: "Sarah K",
	// },
	// {
	// 	id: 5,
	// 	text: "Thanks to this course, I was able to switch careers and become a successful mobile app developer. The instructors were knowledgeable and supportive.",
	// 	author: "James L",
	// },
	// {
	// 	id: 6,
	// 	text: "The game development course was a game-changer for me. I learned so much and was able to create my own game from scratch. Highly recommend!",
	// 	author: "Emily R",
	// },
	// {
	// 	id: 7,
	// 	text: "The finance course provided me with the skills I needed to manage my personal finances better. The lessons were clear and practical.",
	// 	author: "Michael B",
	// },
	// {
	// 	id: 8,
	// 	text: "I took the graphic design course and it was fantastic. The projects were engaging and I learned a lot about design principles and tools.",
	// 	author: "Jessica M",
	// },
	// {
	// 	id: 9,
	// 	text: "The SEO course helped me improve my website's ranking on search engines. The tips and strategies were very effective.",
	// 	author: "David P",
	// },
	// {
	// 	id: 10,
	// 	text: "The networking course was very informative. I now have a solid understanding of networking concepts and can troubleshoot network issues with confidence.",
	// 	author: "Laura T",
	// },
];

export const learnersAreViewing = [
	{
		image: "https://picsum.photos/id/237/400",
		title: "100 Days of Code: The Complete Python Pro Bootcamp",
		instructor: "Dr. Angela Yu",
		rating: "4.7 ★ (313,685)",
		price: "₦41,900",
	},
	{
		image: "https://picsum.photos/id/238/400",
		title: "The Complete 2024 Web Development Bootcamp",
		instructor: "Dr. Angela Yu",
		rating: "4.7 ★ (393,841)",
		price: "₦41,900",
	},
	{
		image: "https://picsum.photos/id/239/400",
		title: "The Complete Python Bootcamp From Zero to Hero",
		instructor: "Jose Portilla",
		rating: "4.6 ★ (513,434)",
		price: "₦41,900",
	},
	{
		image: "https://picsum.photos/id/240/400",
		title: "Ultimate AWS Certified Cloud Practitioner CLF-CO2",
		instructor: "Stephane Maarek",
		rating: "4.7 ★ (230,186)",
		price: "₦41,900",
	},
	{
		image: "https://picsum.photos/id/241/400",
		title: "Ultimate AWS Certified Solutions Architect Associate",
		instructor: "Stephane Maarek",
		rating: "4.7 ★ (214,437)",
		price: "₦41,900",
	},
];

// export const categories = [
// 	"Python",
// 	"Microsoft Excel",
// 	"Web Development",
// 	"JavaScript",
// 	"Data Science",
// 	"Amazon AWS",
// 	"Drawing",
// ];

export const category = [
	{
		id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		title: "Development",
		subcategory: [
			{
				id: "ad1234567891",
				title: "Web Development",
			},
			{
				id: "ad1234567892",
				title: "Mobile Development",
			},
			{
				id: "ad1234567893",
				title: "Game Development",
			},
			{
				id: "ad1234567894",
				title: "Data Science",
			},
		],
	},
	{
		id: "3f1e7a9b-9b1b-4c7d-ad4f-3c7e9f94c1bd",
		title: "Business",
		subcategory: [
			{
				id: "bu2345678910",
				title: "Entrepreneurship",
			},
			{
				id: "bu2345678911",
				title: "Management",
			},
			{
				id: "bu2345678912",
				title: "Sales",
			},
			{
				id: "bu2345678913",
				title: "Leadership",
			},
		],
	},
	{
		id: "5e1f8f7a-2c2d-4a9d-bf5e-7f6e2d91a8fc",
		title: "Finance",
		subcategory: [
			{
				id: "fi3456789120",
				title: "Accounting",
			},
			{
				id: "fi3456789121",
				title: "Investing",
			},
			{
				id: "fi3456789122",
				title: "Personal Finance",
			},
			{
				id: "fi3456789123",
				title: "Cryptocurrency",
			},
		],
	},
	{
		id: "7f2d6e9b-3d3d-4b9e-af5f-9f6c3e92a7bd",
		title: "Marketing",
		subcategory: [
			{
				id: "ma4567891230",
				title: "Digital Marketing",
			},
			{
				id: "ma4567891231",
				title: "SEO",
			},
			{
				id: "ma4567891232",
				title: "Content Marketing",
			},
			{
				id: "ma4567891233",
				title: "Branding",
			},
		],
	},
	{
		id: "9f3e9c8a-4d4e-5f7a-be6f-0g7d4f91c9db",
		title: "Design",
		subcategory: [
			{
				id: "de5678912340",
				title: "Graphic Design",
			},
			{
				id: "de5678912341",
				title: "User Experience (UX)",
			},
			{
				id: "de5678912342",
				title: "User Interface (UI)",
			},
			{
				id: "de5678912343",
				title: "3D Design",
			},
		],
	},
	{
		id: "0g4f9d7b-5e5f-6g7b-ce7e-1h8f5g93d1af",
		title: "Health & Fitness",
		subcategory: [
			{
				id: "he6789123450",
				title: "Fitness",
			},
			{
				id: "he6789123451",
				title: "Nutrition",
			},
			{
				id: "he6789123452",
				title: "Mental Health",
			},
			{
				id: "he6789123453",
				title: "Yoga",
			},
		],
	},
	{
		id: "2h5g0e9c-6g6h-7i8c-de8f-2i9g6h94e2bg",
		title: "Personal Development",
		subcategory: [
			{
				id: "pe7891234560",
				title: "Self Improvement",
			},
			{
				id: "pe7891234561",
				title: "Productivity",
			},
			{
				id: "pe7891234562",
				title: "Time Management",
			},
			{
				id: "pe7891234563",
				title: "Motivation",
			},
		],
	},
	{
		id: "3i6h1f0d-7h7i-8j9d-fe9g-3j0h7i95f3ch",
		title: "Photography",
		subcategory: [
			{
				id: "ph8912345670",
				title: "Photography Basics",
			},
			{
				id: "ph8912345671",
				title: "Photo Editing",
			},
			{
				id: "ph8912345672",
				title: "Lighting",
			},
			{
				id: "ph8912345673",
				title: "Portrait Photography",
			},
		],
	},
	{
		id: "4j7i2g1e-8i8j-9k0e-ge0h-4k1i8j06g4di",
		title: "Music",
		subcategory: [
			{
				id: "mu9123456780",
				title: "Music Production",
			},
			{
				id: "mu9123456781",
				title: "Guitar",
			},
			{
				id: "mu9123456782",
				title: "Piano",
			},
			{
				id: "mu9123456783",
				title: "Vocal Training",
			},
		],
	},
	{
		id: "5k8j3h2f-9j9k-0l1f-he1i-5l2j9k17h5ej",
		title: "Lifestyle",
		subcategory: [
			{
				id: "li1234567890",
				title: "Home Improvement",
			},
			{
				id: "li1234567891",
				title: "Gardening",
			},
			{
				id: "li1234567892",
				title: "Interior Design",
			},
			{
				id: "li1234567893",
				title: "Travel",
			},
		],
	},
	{
		id: "6m9k3l2f-1k0l-2m1f-if2j-6l3k2m18i6fk",
		title: "Technology",
		subcategory: [
			{
				id: "te1345678900",
				title: "Artificial Intelligence",
			},
			{
				id: "te1345678901",
				title: "Blockchain",
			},
			{
				id: "te1345678902",
				title: "Cloud Computing",
			},
			{
				id: "te1345678903",
				title: "Cybersecurity",
			},
		],
	},
	{
		id: "7n0l4m3g-2l1m-3n2g-jg3k-7m4l3n29j7gl",
		title: "Art & Humanities",
		subcategory: [
			{
				id: "ah1456789010",
				title: "Philosophy",
			},
			{
				id: "ah1456789011",
				title: "History",
			},
			{
				id: "ah1456789012",
				title: "Literature",
			},
			{
				id: "ah1456789013",
				title: "Art History",
			},
		],
	},
	{
		id: "8o1m5n4h-3m2n-4o3h-hk4l-8n5m4o30k8mn",
		title: "Language Learning",
		subcategory: [
			{
				id: "la1567890120",
				title: "Spanish",
			},
			{
				id: "la1567890121",
				title: "French",
			},
			{
				id: "la1567890122",
				title: "German",
			},
			{
				id: "la1567890123",
				title: "Japanese",
			},
		],
	},
];
export const languages = [
	{value: "English", label: "English"},
	{value: "Spanish", label: "Spanish"},
	{value: "French", label: "French"},
	{value: "German", label: "German"},
	{value: "Chinese (Simplified)", label: "Chinese (Simplified)"},
	{value: "Chinese (Traditional)", label: "Chinese (Traditional)"},
	{value: "Japanese", label: "Japanese"},
	{value: "Korean", label: "Korean"},
	{value: "Portuguese", label: "Portuguese"},
	{value: "Russian", label: "Russian"},
	{value: "Italian", label: "Italian"},
	{value: "Dutch", label: "Dutch"},
	{value: "Arabic", label: "Arabic"},
	{value: "Hindi", label: "Hindi"},
	{value: "Bengali", label: "Bengali"},
	{value: "Turkish", label: "Turkish"},
	{value: "Vietnamese", label: "Vietnamese"},
	{value: "Polish", label: "Polish"},
	{value: "Ukrainian", label: "Ukrainian"},
	{value: "Persian", label: "Persian"},
];

export const tagOptions = [
	{value: "web-development", label: "Web Development"},
	{value: "data-science", label: "Data Science"},
	{value: "machine-learning", label: "Machine Learning"},
	{value: "artificial-intelligence", label: "Artificial Intelligence"},
	{value: "cloud-computing", label: "Cloud Computing"},
	{value: "cyber-security", label: "Cyber Security"},
	{value: "blockchain", label: "Blockchain"},
	{value: "mobile-development", label: "Mobile Development"},
	{value: "game-development", label: "Game Development"},
	{value: "digital-marketing", label: "Digital Marketing"},
	{value: "graphic-design", label: "Graphic Design"},
	{value: "photography", label: "Photography"},
	{value: "video-editing", label: "Video Editing"},
	{value: "business-management", label: "Business Management"},
	{value: "entrepreneurship", label: "Entrepreneurship"},
	{value: "finance", label: "Finance"},
	{value: "accounting", label: "Accounting"},
	{value: "human-resources", label: "Human Resources"},
	{value: "project-management", label: "Project Management"},
	{value: "leadership", label: "Leadership"},
	{value: "communication-skills", label: "Communication Skills"},
	{value: "public-speaking", label: "Public Speaking"},
	{value: "writing", label: "Writing"},
	{value: "language-learning", label: "Language Learning"},
	{value: "personal-development", label: "Personal Development"},
	{value: "health-and-fitness", label: "Health and Fitness"},
	{value: "yoga", label: "Yoga"},
	{value: "meditation", label: "Meditation"},
	{value: "nutrition", label: "Nutrition"},
	{value: "cooking", label: "Cooking"},
	{value: "music", label: "Music"},
	{value: "guitar", label: "Guitar"},
	{value: "piano", label: "Piano"},
	{value: "photography", label: "Photography"},
	{value: "art", label: "Art"},
	{value: "drawing", label: "Drawing"},
	{value: "painting", label: "Painting"},
	{value: "diy", label: "DIY"},
	{value: "home-improvement", label: "Home Improvement"},
	{value: "gardening", label: "Gardening"},
	{value: "travel", label: "Travel"},
	{value: "lifestyle", label: "Lifestyle"},
	{value: "fashion", label: "Fashion"},
	{value: "beauty", label: "Beauty"},
	{value: "makeup", label: "Makeup"},
	{value: "skincare", label: "Skincare"},
	{value: "parenting", label: "Parenting"},
	{value: "relationships", label: "Relationships"},
	{value: "self-care", label: "Self Care"},
	{value: "mental-health", label: "Mental Health"},
	{value: "productivity", label: "Productivity"},
	{value: "time-management", label: "Time Management"},
	{value: "career-development", label: "Career Development"},
	{value: "job-search", label: "Job Search"},
	{value: "resume-writing", label: "Resume Writing"},
	{value: "interview-skills", label: "Interview Skills"},
	{value: "freelancing", label: "Freelancing"},
	{value: "remote-work", label: "Remote Work"},
	{value: "sales", label: "Sales"},
	{value: "customer-service", label: "Customer Service"},
	{value: "real-estate", label: "Real Estate"},
	{value: "investing", label: "Investing"},
	{value: "stocks", label: "Stocks"},
	{value: "cryptocurrency", label: "Cryptocurrency"},
	{value: "forex", label: "Forex"},
	{value: "economics", label: "Economics"},
	{value: "politics", label: "Politics"},
	{value: "history", label: "History"},
	{value: "philosophy", label: "Philosophy"},
	{value: "psychology", label: "Psychology"},
	{value: "sociology", label: "Sociology"},
	{value: "anthropology", label: "Anthropology"},
	{value: "literature", label: "Literature"},
	{value: "science", label: "Science"},
	{value: "biology", label: "Biology"},
	{value: "chemistry", label: "Chemistry"},
	{value: "physics", label: "Physics"},
	{value: "mathematics", label: "Mathematics"},
	{value: "statistics", label: "Statistics"},
	{value: "engineering", label: "Engineering"},
	{value: "architecture", label: "Architecture"},
	{value: "astronomy", label: "Astronomy"},
	{value: "geography", label: "Geography"},
	{value: "environmental-science", label: "Environmental Science"},
	{value: "agriculture", label: "Agriculture"},
	{value: "veterinary", label: "Veterinary"},
	{value: "medicine", label: "Medicine"},
	{value: "nursing", label: "Nursing"},
	{value: "pharmacy", label: "Pharmacy"},
	{value: "dentistry", label: "Dentistry"},
	{value: "public-health", label: "Public Health"},
	{value: "social-work", label: "Social Work"},
	{value: "law", label: "Law"},
	{value: "criminology", label: "Criminology"},
	{value: "forensics", label: "Forensics"},
	{value: "education", label: "Education"},
	{value: "teaching", label: "Teaching"},
	{value: "special-education", label: "Special Education"},
	{value: "early-childhood-education", label: "Early Childhood Education"},
	{value: "higher-education", label: "Higher Education"},
	{value: "e-learning", label: "E-Learning"},
	{value: "instructional-design", label: "Instructional Design"},
	{value: "curriculum-development", label: "Curriculum Development"},
	{value: "training-and-development", label: "Training and Development"},
	{value: "research", label: "Research"},
	{value: "writing-and-publishing", label: "Writing and Publishing"},
	{value: "journalism", label: "Journalism"},
	{value: "media", label: "Media"},
	{value: "film", label: "Film"},
	{value: "television", label: "Television"},
	{value: "radio", label: "Radio"},
	{value: "podcasting", label: "Podcasting"},
	{value: "animation", label: "Animation"},
	{value: "3d-modeling", label: "3D Modeling"},
	{value: "virtual-reality", label: "Virtual Reality"},
	{value: "augmented-reality", label: "Augmented Reality"},
	{value: "robotics", label: "Robotics"},
	{value: "internet-of-things", label: "Internet of Things"},
	{value: "wearable-technology", label: "Wearable Technology"},
	{value: "smart-home", label: "Smart Home"},
	{value: "automotive", label: "Automotive"},
	{value: "aviation", label: "Aviation"},
	{value: "marine", label: "Marine"},
	{value: "space-exploration", label: "Space Exploration"},
	{value: "military", label: "Military"},
	{value: "emergency-management", label: "Emergency Management"},
	{value: "disaster-recovery", label: "Disaster Recovery"},
	{value: "public-safety", label: "Public Safety"},
	{value: "firefighting", label: "Firefighting"},
	{value: "law-enforcement", label: "Law Enforcement"},
	{value: "security", label: "Security"},
	{value: "intelligence", label: "Intelligence"},
	{value: "counter-terrorism", label: "Counter-Terrorism"},
	{value: "homeland-security", label: "Homeland Security"},
	{value: "defense", label: "Defense"},
	{value: "diplomacy", label: "Diplomacy"},
	{value: "international-relations", label: "International Relations"},
	{value: "global-studies", label: "Global Studies"},
	{value: "cultural-studies", label: "Cultural Studies"},
	{value: "gender-studies", label: "Gender Studies"},
	{value: "ethnic-studies", label: "Ethnic Studies"},
	{value: "religious-studies", label: "Religious Studies"},
	{value: "theology", label: "Theology"},
	{value: "philosophy-of-science", label: "Philosophy of Science"},
	{value: "ethics", label: "Ethics"},
	{value: "logic", label: "Logic"},
	{value: "metaphysics", label: "Metaphysics"},
	{value: "epistemology", label: "Epistemology"},
	{value: "aesthetics", label: "Aesthetics"},
	{value: "existentialism", label: "Existentialism"},
	{value: "phenomenology", label: "Phenomenology"},
	{value: "hermeneutics", label: "Hermeneutics"},
	{value: "structuralism", label: "Structuralism"},
	{value: "post-structuralism", label: "Post-Structuralism"},
	{value: "deconstruction", label: "Deconstruction"},
	{value: "postmodernism", label: "Postmodernism"},
	{value: "critical-theory", label: "Critical Theory"},
	{value: "marxism", label: "Marxism"},
	{value: "feminism", label: "Feminism"},
	{value: "queer-theory", label: "Queer Theory"},
	{value: "postcolonialism", label: "Postcolonialism"},
	{value: "psychoanalysis", label: "Psychoanalysis"},
	{value: "behaviorism", label: "Behaviorism"},
	{value: "cognitive-science", label: "Cognitive Science"},
	{value: "neuroscience", label: "Neuroscience"},
	{value: "artificial-life", label: "Artificial Life"},
	{value: "bioinformatics", label: "Bioinformatics"},
	{value: "biotechnology", label: "Biotechnology"},
	{value: "genetics", label: "Genetics"},
	{value: "genomics", label: "Genomics"},
	{value: "proteomics", label: "Proteomics"},
	{value: "systems-biology", label: "Systems Biology"},
	{value: "synthetic-biology", label: "Synthetic Biology"},
	{value: "nanotechnology", label: "Nanotechnology"},
	{value: "quantum-computing", label: "Quantum Computing"},
	{value: "quantum-physics", label: "Quantum Physics"},
	{value: "string-theory", label: "String Theory"},
	{value: "cosmology", label: "Cosmology"},
	{value: "astrophysics", label: "Astrophysics"},
	{value: "geophysics", label: "Geophysics"},
];

export const featuredCourses = [
	{
		id: 1,
		image: "https://picsum.photos/400/?grayscale",
		title: "The Complete Python Bootcamp From Zero to Hero",
		instructor: "Jose Portilla",
		rating: "4.6 ★ (513,434)",
		price: "$99.99",
		description:
			"Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
		level: "Beginner",
		fullBrief:
			"This course will take you from zero to hero in Python programming. You will learn everything from the basics to advanced topics, including web development, data science, and machine learning.",
		videos: [
			{title: "Introduction to Python", duration: "10:00"},
			{title: "Python Basics", duration: "20:00"},
			{title: "Advanced Python", duration: "30:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 2,
		image: "https://picsum.photos/400/600/?grayscale",
		title: "100 Days of Code: The Complete Python Pro Bootcamp",
		instructor: "Dr. Angela Yu",
		rating: "4.7 ★ (313,685)",
		price: "$99.99",
		description:
			"Master Python by building 100 projects in 100 days. Learn data science, automation, and web development.",
		level: "Intermediate",
		fullBrief:
			"This course is designed to take you from a beginner to a professional Python developer. You will build 100 projects in 100 days, covering a wide range of topics including data science, automation, and web development.",
		videos: [
			{title: "Day 1: Introduction", duration: "15:00"},
			{title: "Day 2: Python Basics", duration: "25:00"},
			{title: "Day 3: Project 1", duration: "35:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 3,
		image: "https://picsum.photos/400/300/?grayscale",
		title: "Automate the Boring Stuff with Python Programming",
		instructor: "Al Sweigart",
		rating: "4.6 ★ (113,846)",
		price: "$99.99",
		description:
			"Learn how to use Python to automate tasks and save time. No programming experience required.",
		level: "Beginner",
		fullBrief:
			"This course will teach you how to use Python to automate tasks and save time. You will learn how to write scripts to automate tasks such as web scraping, file manipulation, and data analysis.",
		videos: [
			{title: "Introduction to Automation", duration: "12:00"},
			{title: "Automating Web Scraping", duration: "22:00"},
			{title: "Automating File Manipulation", duration: "32:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 4,
		image: "https://picsum.photos/400/700/?grayscale",
		title: "Python for Data Science and Machine Learning Bootcamp",
		instructor: "Jose Portilla",
		rating: "4.6 ★ (144,760)",
		price: "$99.99",
		description:
			"Learn how to use Python for data science and machine learning. Includes hands-on projects and real-world examples.",
		level: "Advanced",
		fullBrief:
			"This course will teach you how to use Python for data science and machine learning. You will learn how to analyze data, build machine learning models, and deploy them to production.",
		videos: [
			{title: "Introduction to Data Science", duration: "14:00"},
			{title: "Machine Learning Basics", duration: "24:00"},
			{title: "Building a Machine Learning Model", duration: "34:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 5,
		image: "https://picsum.photos/400/600/?grayscale",
		title: "Python Programming - From Basics to Advanced level",
		instructor: "EdYoda for Business, Dipesh Sharma",
		rating: "4.4 ★ (7,267)",
		price: "$59.99",
		description:
			"Learn Python programming from basics to advanced level. Includes hands-on projects and real-world examples.",
		level: "All Levels",
		fullBrief:
			"This course will take you from the basics of Python programming to advanced topics. You will learn how to write Python scripts, build applications, and work with data.",
		videos: [
			{title: "Python Basics", duration: "16:00"},
			{title: "Advanced Python", duration: "26:00"},
			{title: "Python Projects", duration: "36:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 6,
		image: "https://picsum.photos/400/800/?grayscale",
		title: "Advanced Python Programming",
		instructor: "John Doe",
		rating: "4.8 ★ (50,000)",
		price: "$129.99",
		description:
			"Take your Python skills to the next level with advanced programming techniques and best practices.",
		level: "Advanced",
		fullBrief:
			"This course is designed for experienced Python developers who want to take their skills to the next level. You will learn advanced programming techniques, best practices, and how to write efficient and maintainable code.",
		videos: [
			{title: "Advanced Data Structures", duration: "18:00"},
			{title: "Design Patterns in Python", duration: "28:00"},
			{title: "Optimizing Python Code", duration: "38:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 7,
		image: "https://picsum.photos/400/900/?grayscale",
		title: "Python for Web Development",
		instructor: "Jane Smith",
		rating: "4.7 ★ (75,000)",
		price: "$89.99",
		description:
			"Learn how to use Python for web development. Build web applications using Django and Flask.",
		level: "Intermediate",
		fullBrief:
			"This course will teach you how to use Python for web development. You will learn how to build web applications using popular frameworks like Django and Flask, and how to deploy them to production.",
		videos: [
			{title: "Introduction to Web Development", duration: "20:00"},
			{title: "Building a Web App with Django", duration: "30:00"},
			{title: "Building a Web App with Flask", duration: "40:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 8,
		image: "https://picsum.photos/400/1000/?grayscale",
		title: "Python for Finance",
		instructor: "Michael Johnson",
		rating: "4.5 ★ (60,000)",
		price: "$79.99",
		description:
			"Learn how to use Python for financial analysis and algorithmic trading.",
		level: "Advanced",
		fullBrief:
			"This course will teach you how to use Python for financial analysis and algorithmic trading. You will learn how to analyze financial data, build trading algorithms, and backtest your strategies.",
		videos: [
			{title: "Introduction to Financial Analysis", duration: "22:00"},
			{title: "Building Trading Algorithms", duration: "32:00"},
			{title: "Backtesting Strategies", duration: "42:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 9,
		image: "https://picsum.photos/400/1100/?grayscale",
		title: "Python for Machine Learning",
		instructor: "Sarah Johnson",
		rating: "4.6 ★ (70,000)",
		price: "$89.99",
		description:
			"Learn how to use Python for machine learning. Build machine learning models and deploy them to production.",
		level: "Intermediate",
		fullBrief:
			"This course will teach you how to use Python for machine learning. You will learn how to build machine learning models, train them on data, and deploy them to production.",
		videos: [
			{title: "Introduction to Machine Learning", duration: "24:00"},
			{title: "Building ML Models", duration: "34:00"},
			{title: "Deploying ML Models", duration: "44:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 10,
		image: "https://picsum.photos/400/1200/?grayscale",
		title: "Python for Cybersecurity",
		instructor: "David Williams",
		rating: "4.7 ★ (80,000)",
		price: "$99.99",
		description:
			"Learn how to use Python for cybersecurity. Build security tools and automate security tasks.",
		level: "Intermediate",
		fullBrief:
			"This course will teach you how to use Python for cybersecurity. You will learn how to build security tools, automate security tasks, and protect your systems from cyber threats.",
		videos: [
			{title: "Introduction to Cybersecurity", duration: "26:00"},
			{title: "Building Security Tools", duration: "36:00"},
			{title: "Automating Security Tasks", duration: "46:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 11,
		image: "https://picsum.photos/400/1300/?grayscale",
		title: "Python for Data Analysis",
		instructor: "Emily Davis",
		rating: "4.6 ★ (90,000)",
		price: "$79.99",
		description:
			"Learn how to use Python for data analysis. Analyze data, build visualizations, and draw insights.",
		level: "Intermediate",
		fullBrief:
			"This course will teach you how to use Python for data analysis. You will learn how to analyze data, build visualizations, and draw insights from data using popular libraries like Pandas and Matplotlib.",
		videos: [
			{title: "Introduction to Data Analysis", duration: "28:00"},
			{title: "Building Visualizations", duration: "38:00"},
			{title: "Drawing Insights", duration: "48:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
	{
		id: 12,
		image: "https://picsum.photos/400/1400/?grayscale",
		title: "Python for Artificial Intelligence",
		instructor: "James Brown",
		rating: "4.7 ★ (100,000)",
		price: "$99.99",
		description:
			"Learn how to use Python for artificial intelligence. Build AI models and deploy them to production.",
		level: "Advanced",
		fullBrief:
			"This course will teach you how to use Python for artificial intelligence. You will learn how to build AI models, train them on data, and deploy them to production.",
		videos: [
			{title: "Introduction to AI", duration: "30:00"},
			{title: "Building AI Models", duration: "40:00"},
			{title: "Deploying AI Models", duration: "50:00"},
		],
		category: {
			title: "Development",
			id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		},
		subcategoryId: {title: "Web Development", id: "ad1234567891"},
	},
];
const getRandomElement = (arr: any[]) =>
	arr[Math.floor(Math.random() * arr.length)];

const availablecategory = [
	{
		title: "Development",
		id: "1f0e7f9b-1b1b-4c9d-bd4e-1c3e6e93a6df",
		subcategories: [
			{id: "ad1234567891", title: "Web Development"},
			{id: "ad1234567892", title: "Mobile Development"},
			{id: "ad1234567893", title: "Game Development"},
		],
	},
	{
		title: "IT & Software",
		id: "2f0e7f9b-2b2b-4c9d-bd4e-2c3e6e93a6df",
		subcategories: [
			{id: "ad1234567894", title: "Networking"},
			{id: "ad1234567895", title: "Hardware"},
			{id: "ad1234567896", title: "Operating Systems"},
		],
	},
];

featuredCourses.forEach(course => {
	const category = getRandomElement(availablecategory);
	const subcategoryId = getRandomElement(category.subcategories);
	course.category = {title: category.title, id: category.id};
	course.subcategoryId = {title: subcategoryId.title, id: subcategoryId.id};
});

// Example usage
console.log(featuredCourses);

featuredCourses.push(
	{
		id: 13,
		image: "https://picsum.photos/400/1500/?grayscale",
		title: "Introduction to Networking",
		instructor: "Alice Johnson",
		rating: "4.5 ★ (50,000)",
		price: "$79.99",
		description:
			"Learn the basics of networking, including protocols, topologies, and hardware.",
		level: "Beginner",
		fullBrief:
			"This course will teach you the fundamentals of networking. You will learn about different network protocols, topologies, and hardware components.",
		videos: [
			{title: "Networking Basics", duration: "10:00"},
			{title: "Network Protocols", duration: "20:00"},
			{title: "Network Topologies", duration: "30:00"},
		],
		category: {
			title: "IT & Software",
			id: "2f0e7f9b-2b2b-4c9d-bd4e-2c3e6e93a6df",
		},
		subcategoryId: {title: "Networking", id: "ad1234567894"},
	},
	{
		id: 14,
		image: "https://picsum.photos/400/1600/?grayscale",
		title: "Advanced Operating Systems",
		instructor: "Bob Smith",
		rating: "4.7 ★ (40,000)",
		price: "$99.99",
		description:
			"Deep dive into operating systems, covering advanced topics and concepts.",
		level: "Advanced",
		fullBrief:
			"This course covers advanced topics in operating systems. You will learn about process management, memory management, and file systems.",
		videos: [
			{title: "Process Management", duration: "15:00"},
			{title: "Memory Management", duration: "25:00"},
			{title: "File Systems", duration: "35:00"},
		],
		category: {
			title: "IT & Software",
			id: "2f0e7f9b-2b2b-4c9d-bd4e-2c3e6e93a6df",
		},
		subcategoryId: {title: "Operating Systems", id: "ad1234567896"},
	}
);
