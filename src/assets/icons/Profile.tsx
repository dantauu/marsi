import type { SVGProps } from "react"
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    fill="none"
    viewBox="0 0 38 38"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M31.667 33.25v-3.167a6.333 6.333 0 0 0-6.334-6.333H12.667a6.334 6.334 0 0 0-6.334 6.333v3.167M19 17.417A6.333 6.333 0 1 0 19 4.75a6.333 6.333 0 0 0 0 12.667"
    />
  </svg>
)
export default SvgProfile
