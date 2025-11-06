import type { SVGProps } from "react"
const SvgArrowPath = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={29}
    fill="none"
    viewBox="0 0 17 29"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M15 2.09c-17.216 16.3-17.16 8.3-.174 24.84"
    />
  </svg>
)
export default SvgArrowPath
