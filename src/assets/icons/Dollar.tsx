import type { SVGProps } from "react"
const SvgDollar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={32}
    fill="none"
    viewBox="0 0 24 40"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M12.637 1v38m8.939-30.327C17.649 3.679 2.785 3.157 2.785 11.909s21.399 4.565 20.164 14.872C21.918 35.374 5.816 35.492 1 28.633"
    />
  </svg>
)
export default SvgDollar
