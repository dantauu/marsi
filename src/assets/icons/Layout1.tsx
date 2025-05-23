import type { SVGProps } from "react"
const SvgLayout1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M23 2H7a5 5 0 0 0-5 5v16a5 5 0 0 0 5 5h16a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
    />
  </svg>
)
export default SvgLayout1
