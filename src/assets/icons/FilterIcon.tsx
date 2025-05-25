import type { SVGProps } from "react"
const SvgFilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M14.667 10.667h12M5.333 21.333h13.334"
    />
    <circle
      cx={9.333}
      cy={10.667}
      r={4}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      transform="rotate(90 9.333 10.667)"
    />
    <circle
      cx={22.667}
      cy={21.333}
      r={4}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      transform="rotate(90 22.667 21.333)"
    />
  </svg>
)
export default SvgFilterIcon
