import type { SVGProps } from "react"
const SvgGradientBrown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={949}
    height={924}
    fill="none"
    viewBox="0 0 949 924"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#FF9068"
        d="M616.722 568.622c-49.429 70.305-160.59 8.946-222.437 33.833-123.159-61.378-58.106-163.554-43.441-220.762 49.429-70.305 90.316-79.496 163.736-27.877 38.059 64.802 151.571 144.501 102.142 214.806"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={948.405}
        height={922.759}
        x={0.575}
        y={0.976}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_626_49"
          stdDeviation={160}
        />
      </filter>
    </defs>
  </svg>
)
export default SvgGradientBrown
