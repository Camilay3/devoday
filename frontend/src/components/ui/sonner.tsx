import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: "cn-toast",

					success: "!bg-green-100 !text-green-800 !border-green-300",
					info: "!bg-blue-100 !text-blue-800 !border-blue-300",
					warning: "!bg-yellow-100 !text-yellow-800 !border-yellow-300",
					error: "!bg-red-100 !text-red-800 !border-red-300",
					loading: "!bg-gray-100 !text-gray-800 !border-gray-300",

					title: "!font-bold !opacity-100",
					description: "!font-medium !opacity-100 !text-inherit",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
