import type { SVGProps } from "react"
const SvgCheckSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width={32} height={32} fill="#421052" rx={6} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M5.334 13.889 13.194 24 26.666 6.667"
    />
  </svg>
)
export default SvgCheckSvg
