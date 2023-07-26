import {
  Toggletip,
  ToggletipContent,
  ToggletipActions,
  Button,
  ToggletipButton
} from '@carbon/react'
import { forwardRef } from 'react'
import { TooltipRenderProps } from 'react-joyride'

const TooltipCustom = forwardRef<HTMLDivElement, TooltipRenderProps>(
  (
    { continuous, index, step, backProps, skipProps, closeProps, primaryProps, tooltipProps },
    ref
  ) => (
    <div {...tooltipProps}>
      <Toggletip defaultOpen>
        <ToggletipButton>
          <div style={{ width: 0 }} />
        </ToggletipButton>
        <ToggletipContent>
          {step.content}
          <ToggletipActions>
            {index > 0 && <Button {...backProps}>{backProps.title}</Button>}
            {continuous && (
              <>
                <Button kind="ghost" {...skipProps}>
                  {skipProps.title}
                </Button>
                <Button {...primaryProps}>{primaryProps.title}</Button>
              </>
            )}
            {!continuous && <Button {...closeProps}>Skip</Button>}
          </ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </div>
  )
)

export default TooltipCustom
