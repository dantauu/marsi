import type { SVGProps } from "react"
const SvgGradientPurple = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={969}
    height={942}
    fill="none"
    viewBox="0 0 969 942"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#FF559F"
        d="M635.475 583.83c-52.855 75.179-170.958 10.105-236.873 36.872-130.872-65.053-61.274-174.289-45.465-235.374 52.855-75.18 96.407-85.128 174.372-30.313 40.282 69.002 160.822 153.635 107.966 228.815"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={968.145}
        height={941.323}
        x={0.508}
        y={0.254}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_626_45"
          stdDeviation={160}
        />
      </filter>
    </defs>
  </svg>
)
export default SvgGradientPurple
