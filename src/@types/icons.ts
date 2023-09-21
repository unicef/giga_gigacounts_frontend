import { CarbonIconProps } from '@carbon/icons-react'
import { CarbonPictogramProps, CarbonPictogramType } from '@carbon/pictograms-react'
import { ICONS } from 'src/constants/icons'

export type Icon = keyof typeof ICONS
export type IconProps = CarbonIconProps
export type Pictogram = CarbonPictogramType
export type PictogramProps = CarbonPictogramProps
