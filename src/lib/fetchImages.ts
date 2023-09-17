import type { ImagesResults } from "@/models/Images";
import { ImagesSchemaWithPhotos } from "@/models/Images";
import env from "./env";

export default async function fetchImages(
  url: string
): Promise<ImagesResults | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.NEXT_PUBLIC_PEXELS_API_KEY,
      },
    });

    if (!res.ok) throw new Error("Fetch Images Error!\n");

    const imagesResults: ImagesResults = await res.json();
    // console.log(imagesResults);

    // Parse data with Zod schema
    const parsedData = ImagesSchemaWithPhotos.parse(imagesResults);

    if (parsedData.total_results === 0) return undefined;

    return parsedData;
  } catch (error) {
    // will show in terminal console
    if (error instanceof Error) console.log(error.stack);
  }
}
