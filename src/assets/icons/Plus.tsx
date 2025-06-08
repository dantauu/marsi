import type { SVGProps } from "react"
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      stroke="#FF559F"
      strokeLinecap="round"
      strokeWidth={3}
      d="M20 2v36m18-18H2"
    />
  </svg>
)
export default SvgPlus
