import React, {useState, useEffect} from "react";
import {OfflinePage} from "./offlinepage";

const Offlinepagefunction = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	const updateOnlineStatus = () => {
		setIsOnline(navigator.onLine);
	};

	useEffect(() => {
		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, []);

	if (!isOnline) {
		return <OfflinePage />;
	}

	return null;
};

export default Offlinepagefunction;
