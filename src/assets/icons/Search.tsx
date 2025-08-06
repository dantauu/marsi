import type { SVGProps } from "react"
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    viewBox="0 0 34 34"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2.2}
      d="M23.386 23.732c2.797-2.38 4.561-5.863 4.561-9.743C27.947 6.816 21.915 1 14.474 1S1 6.816 1 13.99c0 7.173 6.032 12.989 13.474 12.989 3.417 0 6.537-1.226 8.912-3.247Zm0 0L33 33"
    />
  </svg>
)
export default SvgSearch
