import type { SVGProps } from "react"
const SvgLongArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={36}
    fill="none"
    viewBox="0 0 66 36"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={3}
      d="M2 18.07h58.211M40.808 2l21.298 13.229c2.526 1.569 2.526 4.112 0 5.681L40.807 34.14"
    />
  </svg>
)
export default SvgLongArrow
