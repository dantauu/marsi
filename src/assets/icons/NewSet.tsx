import type { SVGProps } from "react"
const SvgNewSet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={25}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M11.625 11.625h.75m-.75.75h.75m-6.75-.75h.75m-.75.75h.75m11.25-.75h.75m-.75.75h.75M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11Zm-10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-6 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm12 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
    />
  </svg>
)
export default SvgNewSet
