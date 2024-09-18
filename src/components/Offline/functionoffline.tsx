import React, {useState, useEffect} from "react";
import {OfflinePageUpdate} from ".";

const OfflineFunction = () => {
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
		return <OfflinePageUpdate />;
	}

	return null;
};

export default OfflineFunction;
