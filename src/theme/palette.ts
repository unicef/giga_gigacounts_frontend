// @ts-ignore
import lightColors from './colors/light.scss'
// @ts-ignore
import darkColors from './colors/dark.scss'
// @ts-ignore
import commonColors from './colors/common.scss'

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'

const { black, white } = commonColors

const gigaBlack = commonColors['giga-black']
const gigaLightGrey = commonColors['giga-light-grey']
const gigaGrey = commonColors['giga-grey']
const gigaDarkGrey = commonColors['giga-dark-grey']

const grey = {
  100: commonColors['grey-100'],
  125: commonColors['grey-125'],
  150: commonColors['grey-150'],
  175: commonColors['grey-175'],
  200: commonColors['grey-200'],
  250: commonColors['grey-250'],
  275: commonColors['grey-275'],
  300: commonColors['grey-300'],
  325: commonColors['grey-325'],
  330: commonColors['grey-330'],
  340: commonColors['grey-340'],
  350: commonColors['grey-350'],
  360: commonColors['grey-360'],
  375: commonColors['grey-375'],
  380: commonColors['grey-380'],
  400: commonColors['grey-400'],
  450: commonColors['grey-450'],
  500: commonColors['grey-500'],
  550: commonColors['grey-550'],
  600: commonColors['grey-600'],
  650: commonColors['grey-650'],
  700: commonColors['grey-700'],
  750: commonColors['grey-750'],
  800: commonColors['grey-800'],
  900: commonColors['grey-900']
} as const

const primary = {
  light: commonColors['primary-light'],
  main: commonColors['primary-main'],
  dark: commonColors['primary-dark'],
  contrastLight: commonColors['primary-contrast-light'],
  contrastDark: commonColors['primary-contrast-dark']
} as const

const secondary = {
  light: commonColors['secondary-light'],
  main: commonColors['secondary-main'],
  dark: commonColors['secondary-dark'],
  contrastLight: commonColors['secondary-contrast-light'],
  contrastDark: commonColors['secondary-contrast-dark']
} as const

const info = {
  light: commonColors['info-light'],
  main: commonColors['info-main'],
  dark: commonColors['info-dark'],
  contrastLight: commonColors['info-contrast-light'],
  contrastDark: commonColors['info-contrast-dark']
} as const

const success = {
  light: commonColors['success-light'],
  main: commonColors['success-main'],
  dark: commonColors['success-dark'],
  contrastLight: commonColors['success-contrast-light'],
  contrastDark: commonColors['success-contrast-dark']
} as const

const warning = {
  light: commonColors['warning-light'],
  main: commonColors['warning-main'],
  dark: commonColors['warning-dark'],
  contrastLight: commonColors['warning-contrast-light'],
  contrastDark: commonColors['warning-contrast-dark']
} as const

const error = {
  light: commonColors['error-light'],
  main: commonColors['error-main'],
  dark: commonColors['error-dark'],
  contrastLight: commonColors['error-contrast-light'],
  contrastDark: commonColors['error-contrast-dark']
} as const

const common = {
  common: { black, white },
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  divider: commonColors.divider,
  action: {
    hover: commonColors['action-hover'],
    selected: commonColors['action-selected'],
    disabled: commonColors['action-disabled'],
    disabledBackground: commonColors['action-disabled-background'],
    focus: commonColors['action-focus'],
    hoverOpacity: commonColors['action-hover-opacity'],
    disabledOpacity: commonColors['action-disabled-opacity']
  },
  gigaGrey,
  gigaLightGrey,
  gigaBlack,
  gigaDarkGrey
} as const

export default function palette(themeMode: 'white' | 'g90' | 'g100' | 'g10' | undefined) {
  const light = {
    ...common,
    mode: 'light',
    text: {
      primary: lightColors['text-primary'],
      secondary: lightColors['text-secondary'],
      disabled: lightColors['text-disabled']
    },
    background: {
      paper: lightColors['background-paper'],
      default: lightColors['background-default'],
      neutral: lightColors['background-neutral']
    },
    action: {
      ...common.action,
      active: lightColors['action-active']
    }
  } as const

  const dark = {
    ...common,
    mode: 'dark',
    text: {
      primary: darkColors['text-primary'],
      secondary: darkColors['text-secondary'],
      disabled: darkColors['text-disabled']
    },
    background: {
      paper: darkColors['background-paper'],
      default: darkColors['background-default'],
      neutral: darkColors['background-neutral']
    },
    action: {
      ...common.action,
      active: darkColors['action-active']
    }
  } as const

  return themeMode === 'white' ? light : dark
}
