type GsiResponse = {
	results?: {
		muniCd: string;
		lv01Nm: string;
	};
};

async function reverseGeocode(latLng: number[]): Promise<string> {
	const [lat, lng] = latLng;
	const res = await fetch(
		`https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
	);
	const data: GsiResponse = await res.json();
	return data.results?.lv01Nm ?? "その他";
}

export async function fillDistricts<
	T extends { district?: string; latLng: number[] },
>(spots: T[]): Promise<T[]> {
	return Promise.all(
		spots.map((spot) =>
			spot.district
				? spot
				: reverseGeocode(spot.latLng).then((district) => ({
						...spot,
						district,
					})),
		),
	);
}
