import * as React from "react"
import type { SVGProps } from "react"
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    viewBox="0 0 13 13"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={2}
      d="M1 6.04h10.328M7.885 1l3.779 4.149c.448.492.448 1.29 0 1.782L7.885 11.08"
    />
  </svg>
)
export default SvgArrow
