import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip internals, files with an extension and generated metadata images,
  // which are served directly (no locale redirect in front of a crawler).
  matcher: "/((?!api|_next|_vercel|icon|apple-icon|.*opengraph-image|.*\\..*).*)",
};
