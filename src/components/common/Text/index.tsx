import { HTMLAttributes } from 'react'
import styled from 'styled-components/macro'

export interface FontSizeProps {
  fontSize?: string
}

export interface TextAlignProps {
  textAlign?: 'left' | 'center' | 'right'
}
export interface ColorProps {
  color?: string
}

export interface FontWeightProps {
  bold?: boolean
}

export type TextProps = HTMLAttributes<HTMLSpanElement> & FontWeightProps & ColorProps & TextAlignProps & FontSizeProps

const StyledSpan = styled.span<TextProps>`
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  ${({ color }) => color && { color }}
  ${({ textAlign }) => textAlign && { textAlign }}
  ${({ fontSize: textSize }) => textSize && { fontSize: textSize }}
`

const Text = ({ children, ...props }: TextProps) => {
  return <StyledSpan {...props}>{children}</StyledSpan>
}

export default Text
