/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primaryColor: "rgb(99, 102, 241)",
				secondaryColor: "rgb(161, 163, 247)",
				primaryText: "rgb(255,255,255)",
				secondaryText: "rgb(174, 178, 183)",
				bgDark1: "rgb(31, 32, 35)",
				bgDark2: "rgb(38, 39, 43)",
				bgDark3: "rgb(48, 49, 54)",
				bgDark3Hover: "rgb(55, 56, 62)",
				bgDarkTransparent: "rgb(31, 32, 35, 0.7)",
				bgDarkTransparentDarker: "rgb(0,0,0,0.5)",
				bgDarkTransparentLighter: "rgb(48, 49, 54, 0.7)",
				mainBorder: "rgb(255,255,255,0.15)",
				mainBorderDarker: "rgb(255,255,255,0.07)",
				quoteIconColor: "rgb(178, 184, 205)",
				teal: {
					100: "#ccffeb",
					200: "#99ffd9",
					300: "#66ffcc",
					400: "#33ffbf",
					500: "#00ff99",
				},
				cyan: {
					100: "#ccffff",
					200: "#99ffff",
					300: "#66ffff",
					400: "#33ffff",
					500: "#00ffff",
				},
				gray: {
					100: "#f8f9fa",
					200: "#e9ecef",
					300: "#dee2e6",
					400: "#ced4da",
					500: "#adb5bd",
					600: "#6c757d",
					700: "#495057",
					800: "#343a40",
					900: "#212529",
				},
				black: "#000",
				white: "#fff",
			},
			fontFamily: {
				Inter: "Inter",
			},
			screens: {
				xs: "530px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
		},
	},
	plugins: [],
};

// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
