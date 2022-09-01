import React, { CSSProperties } from 'react'
import { syncedHistory } from 'src/config/syncedHistory'
import { ButtonComponent } from './styles'

export interface ButtonPropType {
  link?: string
  className?: string
  label?: string
  isDisabled?: boolean
  children?: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
}

export const Button: React.FC<ButtonPropType> = ({
  onClick,
  link,
  className = '',
  label = '',
  isDisabled = false,
  children = null,
  type = 'button',
}) => {
  const clickHandler = (e: React.SyntheticEvent) => {
    if (onClick && !isDisabled) {
      onClick()
    }

    if (link && !isDisabled) {
      e.stopPropagation()
      e.preventDefault()
      syncedHistory.push(link)
    }
  }

  const style: CSSProperties = {}
  if (isDisabled) {
    style.pointerEvents = 'none'
  }

  return (
    <ButtonComponent style={style} className={className} onClick={clickHandler} disabled={isDisabled} type={type}>
      {children}
      <span>{label}</span>
    </ButtonComponent>
  )
}
