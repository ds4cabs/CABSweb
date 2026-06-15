// CABS wordmark — teal letters with a small orange accent on the "A",
// matching cabsweb.org. Pairs with the bilingual society name in the header.
export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 140 56"
      height={size}
      width={(size * 140) / 56}
      role="img"
      aria-label="CABS"
    >
      <text
        x="0"
        y="42"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="46"
        fontWeight="800"
        letterSpacing="-1"
        fill="#1c9aa8"
      >
        CABS
      </text>
      {/* orange accent stroke under the wordmark */}
      <rect x="2" y="50" width="58" height="3" rx="1.5" fill="#e8861e" />
    </svg>
  );
}
