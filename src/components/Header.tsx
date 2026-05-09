import { c, useState } from "atomico";

type Spot = {
	name: string;
	lngLat: [number, number];
	description: string;
	image?: string;
	district?: string;
};

export const Header = c(
	({ title, color, spots }) => {
		const [open, setOpen] = useState(false);

		const parsed: Spot[] = JSON.parse(spots || "[]");

		const districts = [
			...new Set(parsed.map((spot) => spot.district ?? "その他")),
		];

		const grouped: Record<string, Spot[]> = {};

		for (const district of districts) {
			grouped[district] = parsed.filter(
				(spot) => (spot.district ?? "その他") === district,
			);
		}

		return (
			<host>
				<header
					style={{
						background: color,
					}}
				>
					<button
						type="button"
						onclick={() => setOpen(true)}
						aria-label="メニューを開く"
					>
						☰
					</button>

					<strong
						style={{
							padding: "10px",
						}}
					>
						{title}
					</strong>
				</header>

				{open && (
					<>
						<div
							onclick={() => setOpen(false)}
							style={{
								position: "fixed",
								inset: 0,
								background: "rgba(0,0,0,0.4)",
								zIndex: 100,
							}}
						/>

						<aside
							style={{
								position: "fixed",
								top: 0,
								left: 0,
								width: "min(600px, 100vw)",
								height: "100dvh",
								overflowY: "auto",
								background: "var(--pico-background-color)",
								padding: "1rem",
								zIndex: 101,
							}}
						>
							<header
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<strong>スポット一覧</strong>

								<button
									type="button"
									onclick={() => setOpen(false)}
									aria-label="閉じる"
								>
									✕
								</button>
							</header>

							<nav
								style={{
									margin: "1rem 0",
								}}
							>
								<ol
									style={{
										margin: 0,
										paddingLeft: "1.25rem",
										display: "grid",
										gap: ".25rem",
									}}
								>
									{districts.map((district) => (
										<li key={district}>
											<a href={`#district-${district}`}>{district}</a>
										</li>
									))}
								</ol>
							</nav>

							{districts.map((district) => (
								<section key={district} id={`district-${district}`}>
									<h2>{district}</h2>

									{grouped[district].map((spot) => (
										<article key={spot.name}>
											<header>
												<strong>{spot.name}</strong>
											</header>

											{spot.image && (
												<img
													src={spot.image}
													alt={spot.name}
													style={{
														width: "100%",
														borderRadius: "var(--pico-border-radius)",
													}}
												/>
											)}

											<p>{spot.description}</p>
										</article>
									))}
								</section>
							))}
						</aside>
					</>
				)}
			</host>
		);
	},
	{
		props: {
			title: { type: String, value: () => "" },
			color: { type: String, value: () => "#ffffff" },
			spots: { type: String, value: () => "[]" },
		},
	},
);

customElements.define("header-component", Header);
