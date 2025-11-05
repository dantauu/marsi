import type { SVGProps } from "react"
const SvgMessage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.2}
      d="M6 8h8m-8 4h4m9-2a9 9 0 0 1-9 9H1.724a.5.5 0 0 1-.467-.677l.893-2.359c.23-.605.138-1.277-.158-1.852A9 9 0 1 1 19 10Z"
    />
  </svg>
)
export default SvgMessage
