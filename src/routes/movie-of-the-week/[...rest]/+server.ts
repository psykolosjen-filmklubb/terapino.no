import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

/** Old English path, kept during a transition period. Remove once old links have died out. */
export const GET: RequestHandler = ({ params, url }) => {
	redirect(308, `/ukens-film${params.rest ? `/${params.rest}` : ""}${url.search}`);
};
