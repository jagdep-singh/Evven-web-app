/**
 * DiceBear avatar helpers.
 *
 * only one style is offered app-wide ("notionists-neutral").
 * Variety comes entirely from randomized seeds, not from switching styles.
 * If that ever changes, this is the single place to add a `style` param.
 */

const DICEBEAR_VERSION = "9.x";
const AVATAR_STYLE = "notionists-neutral";

export function buildAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/${DICEBEAR_VERSION}/${AVATAR_STYLE}/svg?seed=${encodeURIComponent(
    seed
  )}`;
}

export function randomAvatarSeed(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

/**
 * True if a URL looks like one of our generated DiceBear avatars
 * (as opposed to a custom/imported picture, e.g. from Google sign-in).
 */
export function isDicebearAvatarUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.startsWith(`https://api.dicebear.com/`) && url.includes(`/${AVATAR_STYLE}/`);
}