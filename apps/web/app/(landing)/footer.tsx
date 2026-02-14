"use client";

import React from "react";
import LinkArrow from "./linkArrow";
import Link from "next/link";

function Footer() {
	return (
		<footer className="mt-20 w-full md:flex overflow-y-hidden items-center justify-between gap-4 px-8 py-8 text-sm text-zinc-500 overflow-hidden text-center">
			<p>© 2026 Cyberbard LTD</p>
			<div className="flex gap-5 justify-around my-2">
				<button
					className="group/cookie flex items-center cursor-pointer"
					onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
				>
					Cookies{" "}
					<LinkArrow classname="group-hover/cookie:opacity-100 opacity-0 transition hidden md:block" />
				</button>
				<Link
					className="group/twit flex items-center"
					href="/tos"
				>
					Service{" "}
					<LinkArrow classname="group-hover/twit:opacity-100 opacity-0 transition hidden md:block" />
				</Link>
				<Link
					className="group/git flex items-center"
					href="/privacy"
				>
					Privacy{" "}
					<LinkArrow classname="group-hover/git:opacity-100 opacity-0 transition hidden md:block" />
				</Link>
				<Link
					className="group/contact flex items-center"
					href="/contact"
				>
					Contact{" "}
					<LinkArrow classname="group-hover/contact:opacity-100 opacity-0 transition hidden md:block" />
				</Link>
			</div>
		</footer>
	);
}

export default Footer;
