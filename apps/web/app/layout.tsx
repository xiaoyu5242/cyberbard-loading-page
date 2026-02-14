import "@repo/tailwind-config/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@repo/ui/lib/utils";
import { CookieConsent } from "./_components";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
	metadataBase: new URL("https://cyberbard.dev"),
	title: "Cyberbard - Automated Vibe Testing for Everyone",
	description:
		"Cyberbard empowers Vibe Coding users with fully automated vibe testing. Automatically explore, test, and fix your web applications without writing a single line of code.",
	keywords: [
		"automated testing",
		"vibe testing",
		"QA automation",
		"web app testing",
		"bug detection",
		"bug fixing",
		"developer tools",
	],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		url: "https://cyberbard.dev/",
		siteName: "Cyberbard",
		locale: "en_GB",
		images: [
			{
				url: "https://cyberbard.dev/og-image.png",
				width: 1608,
				height: 500,
				alt: "Cyberbard - Automated Vibe Testing for Everyone",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "https://cyberbard.dev",
		creator: "https://cyberbard.dev",
		title: "Cyberbard - Automated Vibe Testing for Everyone",
		description:
			"Cyberbard empowers Vibe Coding users with fully automated vibe testing. Automatically explore, test, and fix your web applications without writing a single line of code.",
		images: [
			{
				url: "https://cyberbard.dev/og-image.png",
				width: 1608,
				height: 500,
				alt: "Cyberbard - Automated Vibe Testing for Everyone",
			},
		],
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
			<head>
				{/* Cloudflare web analytics */}
				{/* <script
					defer
					src="https://static.cloudflareinsights.com/beacon.min.js"
					data-cf-beacon='{"token": "16d76ebb82c74d9983b71d09ab6617bc"}'
				></script> */}
			</head>
			{/* TODO: when lightmode support is added, remove the 'dark' class from the body tag */}
			<body
				className={cn(
					`${inter.className} dark`,
					GeistMono.variable,
					GeistSans.variable,
				)}
			>
				{children}
				<CookieConsent />
				<Toaster />
			</body>
		</html>
	);
}
