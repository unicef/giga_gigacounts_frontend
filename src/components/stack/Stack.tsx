import { CSSProperties } from 'react'

type StackProps = {
  orientation?: 'horizontal' | 'vertical'
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  justifyItems?: CSSProperties['justifyItems']
  alignContent?: CSSProperties['alignContent']
  alignSelf?: CSSProperties['alignSelf']
  justifySelf?: CSSProperties['justifySelf']
  gap?: CSSProperties['gap']
  children: React.ReactNode
  style?: CSSProperties
}

export default function Stack({
  children,
  orientation,
  justifyContent,
  alignItems,
  alignContent,
  justifySelf,
  justifyItems,
  alignSelf,
  gap,
  style
}: StackProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent,
        alignItems,
        alignContent,
        justifyItems,
        alignSelf,
        justifySelf,
        gap,
        ...style
      }}
    >
      {children}
    </div>
  )
}
