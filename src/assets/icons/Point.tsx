import type { SVGProps } from "react"
const SvgPoint = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      cx={12}
      cy={10}
      r={3}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9.75C19 15.375 12 21 12 21S5 15.375 5 9.75C5 6.022 8.134 3 12 3s7 3.022 7 6.75"
    />
  </svg>
)
export default SvgPoint
