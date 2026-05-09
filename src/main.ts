import type { AlpineComponent } from "alpinejs";
import Alpine from "alpinejs";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { z } from "zod";
import { fillDistricts } from "./geocode";
import { Data } from "./schema";
import "./components/Header";
import "./components/Footer";

type AppData = {
	data: z.infer<typeof Data> | null;
	error: string | null;
	init(): Promise<void>;
	initMap(el: HTMLElement): void;
};

Alpine.data(
	"app",
	(): AlpineComponent<AppData> => ({
		data: null,
		error: null,

		async init() {
			try {
				const res = await fetch("data.json");
				const json = await res.json();
				const result = Data.safeParse(json);
				if (!result.success) {
					this.error = "データの形式が正しくありません";
					console.error(result.error);
					return;
				}
				this.data = result.data;

				const filled = await fillDistricts(result.data.spots);
				this.data = { ...this.data, spots: filled };
			} catch {
				this.error = "データの読み込みに失敗しました";
			}
		},

		initMap(el) {
			if (!this.data || this.data.spots.length === 0) return;

			const map = new maplibregl.Map({
				container: el,
				style: "https://tiles.openfreemap.org/styles/liberty",
				center: [this.data.spots[0].latLng[1], this.data.spots[0].latLng[0]],
				zoom: 11,
			});

			for (const spot of this.data.spots) {
				new maplibregl.Marker({ color: this.data.color })
					.setLngLat([spot.latLng[1], spot.latLng[0]])
					.setPopup(
						new maplibregl.Popup({ offset: 25 }).setHTML(
							`<strong>${spot.name}</strong><p>${spot.description}</p>`,
						),
					)
					.addTo(map);
			}
		},
	}),
);

Alpine.start();
