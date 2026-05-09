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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-text-align-justify-icon lucide-text-align-justify"
						>
							<title>メニューを開く</title>
							<path d="M3 5h18" />
							<path d="M3 12h18" />
							<path d="M3 19h18" />
						</svg>
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-x-icon lucide-x"
									>
										<title>メニューを閉じる</title>
										<path d="M18 6 6 18" />
										<path d="m6 6 12 12" />
									</svg>
								</button>
							</header>

							{districts.map((district) => (
								<section key={district}>
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
