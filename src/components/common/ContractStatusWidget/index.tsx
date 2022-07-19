import { useEffect, useRef } from 'react'

const clamp = (a: number) => {
  return Math.min(Math.max(a, 0), 100)
}
const rad = (val: number) => {
  return -Math.PI / 2 + ((2 * Math.PI) / 100) * val
}

interface DialOptions {
  diameter: number
  stroke: number
  color: string
  percent: number
  start?: number
}

const dial = (canvas: HTMLCanvasElement, { diameter, stroke, color, percent, start = 0 }: DialOptions) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null || stroke === 0) {
    return
  }

  ctx.beginPath()
  ctx.lineWidth = stroke
  ctx.strokeStyle = color
  ctx.arc(
    canvas.clientWidth / 2,
    canvas.clientHeight / 2,
    (diameter - stroke) / 2,
    rad(clamp(start)),
    rad(clamp(percent)),
  )
  ctx.stroke()
}

interface DrawChartOptions {
  selected?: boolean
  expired?: boolean
  showOnly?: string
  average?: number
  good?: number
  payments?: number
}

const drawChart = (
  canvas: HTMLCanvasElement,
  { selected = false, expired = false, showOnly = undefined, average = 0, good = 0, payments = 0 }: DrawChartOptions,
) => {
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    return
  }

  ctx.fillStyle = '#fff' // this BG color may change on card selection
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

  const blankColor = selected ? '#7DAFFF' : '#E6E6E6'
  const blueColor = selected ? '#FFFFFF' : '#6FA6FE'
  const redColor = selected ? '#FF7575' : '#F94B4B'
  const orangeColor = selected ? '#F9BF68' : '#FF9F40'
  const greenColor = selected ? '#6FE883' : '#46C66D'

  let budgetStroke, chartSpacing, innerChartWidth

  switch (showOnly) {
    case 'schools':
      budgetStroke = 0
      chartSpacing = 0
      innerChartWidth = Math.min(canvas.clientWidth, canvas.clientHeight)
      break
    case 'payments':
      budgetStroke = 4
      chartSpacing = 0
      innerChartWidth = 0
      break
    default:
      budgetStroke = 3
      chartSpacing = 3
      innerChartWidth = Math.min(canvas.clientWidth, canvas.clientHeight) - budgetStroke * 2 - chartSpacing * 2
  }

  if (expired) {
    // Schools Dial

    dial(canvas, {
      diameter: innerChartWidth,
      stroke: innerChartWidth / 2,
      color: redColor,
      percent: 100,
      start: average + good,
    })

    dial(canvas, {
      diameter: innerChartWidth,
      stroke: innerChartWidth / 2,
      color: blankColor,
      percent: average + good,
    })

    // Budget Dial

    dial(canvas, {
      diameter: Math.min(canvas.clientWidth, canvas.clientHeight),
      stroke: budgetStroke,
      color: redColor,
      percent: 100,
      start: payments,
    })

    dial(canvas, {
      diameter: Math.min(canvas.clientWidth, canvas.clientHeight),
      stroke: budgetStroke,
      color: blankColor,
      percent: payments,
    })
  } else {
    // Schools Dial

    dial(canvas, {
      diameter: innerChartWidth,
      stroke: innerChartWidth / 2,
      color: redColor,
      percent: 100,
      start: average + good,
    })

    dial(canvas, {
      diameter: innerChartWidth,
      stroke: innerChartWidth / 2,
      color: orangeColor,
      percent: average + good,
      start: good,
    })

    dial(canvas, {
      diameter: innerChartWidth,
      stroke: innerChartWidth / 2,
      color: greenColor,
      percent: good,
    })

    // Budget Dial

    dial(canvas, {
      diameter: Math.min(canvas.clientWidth, canvas.clientHeight),
      stroke: budgetStroke,
      color: blankColor,
      percent: 100,
      start: payments,
    })

    dial(canvas, {
      diameter: Math.min(canvas.clientWidth, canvas.clientHeight),
      stroke: budgetStroke,
      color: blueColor,
      percent: payments,
    })
  }
}

interface ContractStatusWidgetProps {
  selected?: boolean
  expired?: boolean
  showOnly?: string
  average?: number
  good?: number
  payments?: number
}

const ContractStatusWidget = ({
  selected = false,
  expired = false,
  showOnly,
  average = 0,
  good = 1,
  payments = 2,
}: ContractStatusWidgetProps): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawChart(canvas, { selected, expired, showOnly, average, good, payments })
      }
    }
  }, [selected, expired, showOnly, average, good, payments])

  return <canvas width="42" height="42" ref={canvasRef} />
}

export default ContractStatusWidget
