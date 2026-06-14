export function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="cabsGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#cabsGrad)" />
      <text
        x="50"
        y="64"
        fontFamily="Inter, Arial"
        fontSize="34"
        fontWeight="800"
        textAnchor="middle"
        fill="white"
      >
        CB
      </text>
    </svg>
  );
}
