import type { SVGProps } from "react"
const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="m14 8-3 3m0 0-3 3m3-3 3 3m-3-3L8 8m13 3c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10Z"
    />
  </svg>
)
export default SvgCross
