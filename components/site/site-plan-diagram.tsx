export function SitePlanDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Schematic of a site with two workshops and three warehouses, not to scale"
        className="w-full"
      >
        <rect x="8" y="8" width="384" height="284" fill="none" stroke="#12303f" strokeOpacity="0.35" strokeDasharray="4 6" />
        <g fill="#dbe6e8" stroke="#24566d" strokeWidth="1.5">
          <rect x="32" y="32" width="150" height="110" />
          <rect x="198" y="32" width="170" height="110" />
        </g>
        <g fill="#f6f2ea" stroke="#12303f" strokeOpacity="0.55" strokeWidth="1.2">
          <rect x="32" y="178" width="100" height="84" />
          <rect x="150" y="178" width="100" height="84" />
          <rect x="268" y="178" width="100" height="84" />
        </g>
        <g stroke="#d9661f" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M44 120h126" />
          <path d="M210 120h146" strokeDasharray="2 8" />
        </g>
        <g fontFamily="var(--font-display), sans-serif" fontSize="11" fill="#12303f" letterSpacing="1.5">
          <text x="44" y="58">WORKSHOP 1</text>
          <text x="210" y="58">WORKSHOP 2</text>
          <text x="44" y="204">WAREHOUSE 1</text>
          <text x="162" y="204">WAREHOUSE 2</text>
          <text x="280" y="204">WAREHOUSE 3</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Schematic of the verified counts only: two workshops and three warehouses on a 3,000 m² site.
      </figcaption>
    </figure>
  )
}
