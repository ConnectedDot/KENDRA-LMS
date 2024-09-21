type Subcategory = {
	id: number;
	name: string;
};

type Category = {
	id: number;
	name: string;
	subcategories: Subcategory[];
};

export const categories: Category[] = [
	{
		id: 1,
		name: "Development",
		subcategories: [
			{id: 1, name: "Web Development"},
			{id: 2, name: "Mobile Development"},
			{id: 3, name: "Game Development"},
		],
	},
	{
		id: 2,
		name: "Business",
		subcategories: [
			{id: 4, name: "Finance"},
			{id: 5, name: "Entrepreneurship"},
			{id: 6, name: "Management"},
		],
	},
	{
		id: 3,
		name: "Design",
		subcategories: [
			{id: 7, name: "Web Design"},
			{id: 8, name: "Graphic Design"},
			{id: 9, name: "UX/UI Design"},
		],
	},
	{
		id: 4,
		name: "Marketing",
		subcategories: [
			{id: 10, name: "SEO"},
			{id: 11, name: "Social Media"},
			{id: 12, name: "Content Marketing"},
		],
	},
	{
		id: 5,
		name: "IT & Software",
		subcategories: [
			{id: 13, name: "Networking"},
			{id: 14, name: "Hardware"},
			{id: 15, name: "Operating Systems"},
		],
	},
	{
		id: 6,
		name: "Personal Development",
		subcategories: [
			{id: 16, name: "Leadership"},
			{id: 17, name: "Productivity"},
			{id: 18, name: "Communication Skills"},
		],
	},
	// Add more categories and subcategories as needed
];
