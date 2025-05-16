import React from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
	type?: AlertType;
	message: string;
}

const Alert: React.FC<AlertProps> = ({ type = "info", message }) => {
	// Configuration for different alert types
	const alertConfig = {
		success: {
			icon: CheckCircle,
			bgColor: "bg-green-500/10",
			borderColor: "border-green-500",
			textColor: "text-green-600",
			iconColor: "text-green-500",
		},
		error: {
			icon: AlertCircle,
			bgColor: "bg-red-600/15",
			borderColor: "border-red-500",
			textColor: "text-red-600",
			iconColor: "text-red-500",
		},
		warning: {
			icon: AlertTriangle,
			bgColor: "bg-yellow-50",
			borderColor: "border-yellow-500",
			textColor: "text-yellow-800",
			iconColor: "text-yellow-500",
		},
		info: {
			icon: Info,
			bgColor: "bg-blue-50",
			borderColor: "border-blue-500",
			textColor: "text-blue-800",
			iconColor: "text-blue-500",
		},
	};

	const config = alertConfig[type];
	const Icon = config.icon;

	const [isVisible, setIsVisible] = React.useState(true);

	if (!isVisible) return null;

	return (
		<div
			className={`flex items-center p-4 mb-4 rounded-lg border-l-4 ${config.bgColor} ${config.borderColor}`}
			role="alert"
		>
			<Icon className={`w-5 h-5 mr-2 shrink-0 ${config.iconColor}`} />
			<div className={`ml-3 text-sm font-medium ${config.textColor} flex-grow`}>{message}</div>
			<button
				type="button"
				className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${config.textColor} hover:bg-black/5 focus:ring-2 focus:ring-gray-300`}
				onClick={() => setIsVisible(false)}
				aria-label="Close"
			>
				<X className="w-4 h-4 shrink-0" />
			</button>
		</div>
	);
};

export default Alert;
