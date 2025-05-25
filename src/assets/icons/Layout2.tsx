import * as React from "react"
import type { SVGProps } from "react"
const SvgLayout2 = (props: SVGProps<SVGSVGElement>) => (
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
      strokeWidth={3}
      d="M26 2h-6.833a2 2 0 0 0-2 2v5.838a2 2 0 0 0 2 2H26a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M26 18.162h-6.833a2 2 0 0 0-2 2V26a2 2 0 0 0 2 2H26a2 2 0 0 0 2-2v-5.838a2 2 0 0 0-2-2M10.833 2H4a2 2 0 0 0-2 2v5.838a2 2 0 0 0 2 2h6.833a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M10.833 18.162H4a2 2 0 0 0-2 2V26a2 2 0 0 0 2 2h6.833a2 2 0 0 0 2-2v-5.838a2 2 0 0 0-2-2"
    />
  </svg>
)
export default SvgLayout2
