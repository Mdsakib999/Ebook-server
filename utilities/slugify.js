/* eslint-disable no-useless-escape */
// utils/slugify.js
export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces -> hyphens
    .replace(/[^\w\-]+/g, "")    // remove invalid chars
    .replace(/\-\-+/g, "-")      // collapse multiple hyphens
    .replace(/^-+|-+$/g, "");    // trim leading/trailing hyphens
}
