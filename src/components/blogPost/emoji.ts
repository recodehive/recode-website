/** Drops a leading emoji from heading text. New headings are stripped when the post is built; this also covers older builds. */
const LEADING_EMOJI = /^[\s‍️]*(?:\p{Extended_Pictographic}[‍️\u{1F3FB}-\u{1F3FF}]*\s*)+/u;

export const noEmoji = (t: string): string => t.replace(LEADING_EMOJI, '');
