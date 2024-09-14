import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import 'react-toastify/dist/ReactToastify.css';
import AuthContextProvider from "./context";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./react-query";
import {ConfigProvider} from "antd";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<QueryClientProvider client={queryClient}>
		<ConfigProvider>
			<AuthContextProvider>
				<Suspense>
					{/* <DarkModeProvider> */}
					<App />
					{/* </DarkModeProvider>{" "} */}
				</Suspense>
			</AuthContextProvider>
		</ConfigProvider>
	</QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
