type GsiResponse = {
	results?: {
		muniCd: string;
		lv01Nm: string;
	};
};

async function reverseGeocode(lngLat: number[]): Promise<string> {
	const [lng, lat] = lngLat;
	const res = await fetch(
		`https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
	);
	const data: GsiResponse = await res.json();
	return data.results?.lv01Nm ?? "その他";
}

export async function fillDistricts<
	T extends { district?: string; lngLat: number[] },
>(spots: T[]): Promise<T[]> {
	return Promise.all(
		spots.map((spot) =>
			spot.district
				? spot
				: reverseGeocode(spot.lngLat).then((district) => ({
						...spot,
						district,
					})),
		),
	);
}
