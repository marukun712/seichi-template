import { c } from "atomico";

export const Footer = c(
	({ author, links }) => {
		const parsedLinks: string[] = JSON.parse(links || "[]");
		return (
			<host>
				<footer>
					<p>
						このサイトは、{author}
						によって作成されました。誤り等ありましたら、DMまでご連絡ください。
					</p>
					<p>関連リンク:</p>
					{parsedLinks.length > 0 && (
						<ul>
							{parsedLinks.map((link) => (
								<li key={link}>
									<a href={link}>{link}</a>
								</li>
							))}
						</ul>
					)}
				</footer>
			</host>
		);
	},
	{
		props: {
			author: { type: String, value: () => "" },
			links: { type: String, value: () => "[]" },
		},
	},
);

customElements.define("footer-component", Footer);
