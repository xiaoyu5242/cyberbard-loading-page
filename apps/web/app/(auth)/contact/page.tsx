import React from "react";
import Markdown from "react-markdown";
import { BackButton } from "../../_components/back-button";

function Page() {
	return (
		<div className="flex flex-col items-center justify-center mt-8">
			<BackButton />
			<div className="max-w-3xl prose prose-invert">
				<Markdown>
					{`
# Contact Us

We'd love to hear from you! Whether you have a question about our features, pricing, need a demo, or anything else, our team is ready to answer all your questions.

### Cyberbard LTD

**Email:** [support@cyberbard.dev](mailto:support@cyberbard.dev)

`}
				</Markdown>
			</div>
		</div>
	);
}

export default Page;
