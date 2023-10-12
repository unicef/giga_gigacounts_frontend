import { CSSProperties } from 'react'

type Props = {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  stroke?: CSSProperties['stroke']
}

export default function NoInfo({ height, width, stroke }: Props) {
  return (
    <svg
      fill="none"
      stroke={stroke}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30.72 30.72"
    >
      <g>
        <g>
          <path d="m4.75,4.75C7.47,2.04,11.22.36,15.36.36c8.28,0,15,6.72,15,15,0,3.15-.97,6.07-2.63,8.48m-1.76,2.11c-2.72,2.72-6.47,4.41-10.62,4.41C7.08,30.36.36,23.64.36,15.36c0-3.15.97-6.07,2.62-8.48M.36.36l30,30" />
        </g>
      </g>
    </svg>
  )
}
