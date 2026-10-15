/**
 * Build-time feature flags. Set them in Netlify (Site configuration >
 * Environment variables) and redeploy; the site is a static export, so a
 * flag only changes after a new build.
 */

/**
 * GCC companies directory (/gcc-companies and its 350 profiles).
 * Off: the pages still build (static export needs them) but carry noindex
 * and stay out of the sitemap and IndexNow, so only people with the link
 * see them. On: GCC_DIRECTORY_LIVE=true makes them indexable and listed.
 */
export const gccDirectoryLive = process.env.GCC_DIRECTORY_LIVE === "true";

/** Robots value for pages behind a flag that is still off. */
export const UNLISTED_ROBOTS = "noindex, nofollow";
