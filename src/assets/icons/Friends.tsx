import type { SVGProps } from "react"
const SvgFriends = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    stroke="#0007"
    strokeWidth={3}
    viewBox="0 0 64 64"
    {...props}
  >
    <circle cx={22.83} cy={22.57} r={7.51} />
    <path d="M38 49.94a15.2 15.2 0 0 0-15.21-15.2 15.2 15.2 0 0 0-15.2 15.2Z" />
    <circle cx={44.13} cy={27.22} r={6.05} />
    <path d="M42.4 49.94h14A12.24 12.24 0 0 0 44.13 37.7a12.2 12.2 0 0 0-5.75 1.43" />
  </svg>
)
export default SvgFriends
