import { c } from "atomico";

export const Header = c(
	({ title, color }) => (
		<host>
			<header style={{ background: color, textAlign: "center" }}>
				<p style={{ color: "black", padding: "12px" }}>{title}</p>
			</header>
		</host>
	),
	{
		props: {
			title: { type: String, value: () => "" },
			color: { type: String, value: () => "#ffffff" },
		},
	},
);

customElements.define("header-component", Header);
