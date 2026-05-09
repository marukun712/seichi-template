import z from "zod";

export const Spot = z.object({
	name: z.string(),
	lngLat: z.array(z.number()).length(2),
	description: z.string(),
	image: z.string().optional(),
});

export const Data = z.object({
	title: z.string(),
	color: z.string(),
	about: z.string(),
	author: z.string(),
	links: z.array(z.string()),
	spots: z.array(Spot),
});
