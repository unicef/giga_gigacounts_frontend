import {
  CirclePackChart,
  DonutChart,
  HeatmapChart,
  StackedAreaChart,
  StackedBarChart
} from '@carbon/charts-react'
import { Helmet } from 'react-helmet-async'
import { Banner } from 'src/components/banner'
import CustomJoyride from 'src/components/custom-joyride/CustomJoyride'
import { Stack } from 'src/components/stack'
import { useLocales } from 'src/locales'
import { useTheme } from 'src/theme'

export default function OldDashboard() {
  const { translate } = useLocales()
  const { palette } = useTheme()

  return (
    <>
      <Helmet>
        <title> General: App | Gigacounts</title>
      </Helmet>
      <CustomJoyride name="home" />
      <Banner title={translate('dashboard')} />
      <Stack orientation="vertical" style={{ width: '100%', height: '100%' }}>
        <Stack orientation="horizontal" style={{ width: '100%', height: '42dvh' }}>
          <HeatmapChart
            options={{
              title: 'Heatmap',
              // @ts-ignore
              axes: {
                bottom: {
                  title: 'Letters',
                  mapsTo: 'letter',
                  scaleType: 'labels'
                },
                left: {
                  title: 'Months',
                  mapsTo: 'month',
                  scaleType: 'labels'
                }
              },

              height: '100%',
              width: '33%',
              color: {
                gradient: {
                  enabled: true,
                  colors: [
                    palette.common.white,
                    palette.primary.light,
                    palette.primary.main,
                    palette.primary.dark,
                    palette.gigaBlack
                  ]
                }
              }
            }}
            data={[
              {
                letter: 'A',
                month: 'January',
                value: 41
              },
              {
                letter: 'B',
                month: 'January',
                value: 7
              },
              {
                letter: 'C',
                month: 'January',
                value: 66
              },
              {
                letter: 'D',
                month: 'January',
                value: 85
              },
              {
                letter: 'E',
                month: 'January',
                value: 70
              },
              {
                letter: 'F',
                month: 'January',
                value: 98
              },
              {
                letter: 'G',
                month: 'January',
                value: 90
              },
              {
                letter: 'H',
                month: 'January',
                value: 66
              },
              {
                letter: 'I',
                month: 'January',
                value: 0
              },
              {
                letter: 'J',
                month: 'January',
                value: 13
              },
              {
                letter: 'A',
                month: 'February',
                value: 16
              },
              {
                letter: 'B',
                month: 'February',
                value: 5
              },
              {
                letter: 'C',
                month: 'February',
                value: 6
              },
              {
                letter: 'D',
                month: 'February',
                value: 48
              },
              {
                letter: 'E',
                month: 'February',
                value: 72
              },
              {
                letter: 'F',
                month: 'February',
                value: 26
              },
              {
                letter: 'G',
                month: 'February',
                value: 70
              },
              {
                letter: 'H',
                month: 'February',
                value: 99
              },
              {
                letter: 'I',
                month: 'February',
                value: 79
              },
              {
                letter: 'J',
                month: 'February',
                value: 83
              },
              {
                letter: 'A',
                month: 'March',
                value: 62
              },
              {
                letter: 'B',
                month: 'March',
                value: 57
              },
              {
                letter: 'C',
                month: 'March',
                value: 90
              },
              {
                letter: 'D',
                month: 'March',
                value: 68
              },
              {
                letter: 'E',
                month: 'March',
                value: 84
              },
              {
                letter: 'F',
                month: 'March',
                value: 21
              },
              {
                letter: 'G',
                month: 'March',
                value: 54
              },
              {
                letter: 'H',
                month: 'March',
                value: 25
              },
              {
                letter: 'I',
                month: 'March',
                value: 42
              },
              {
                letter: 'J',
                month: 'March',
                value: 62
              },
              {
                letter: 'A',
                month: 'April',
                value: 15
              },
              {
                letter: 'B',
                month: 'April',
                value: 52
              },
              {
                letter: 'C',
                month: 'April',
                value: 15
              },
              {
                letter: 'D',
                month: 'April',
                value: 22
              },
              {
                letter: 'E',
                month: 'April',
                value: 59
              },
              {
                letter: 'F',
                month: 'April',
                value: 36
              },
              {
                letter: 'G',
                month: 'April',
                value: 5
              },
              {
                letter: 'H',
                month: 'April',
                value: 18
              },
              {
                letter: 'I',
                month: 'April',
                value: 42
              },
              {
                letter: 'J',
                month: 'April',
                value: 72
              },
              {
                letter: 'A',
                month: 'May',
                value: 30
              },
              {
                letter: 'B',
                month: 'May',
                value: 39
              },
              {
                letter: 'C',
                month: 'May',
                value: 69
              },
              {
                letter: 'D',
                month: 'May',
                value: 73
              },
              {
                letter: 'E',
                month: 'May',
                value: 2
              },
              {
                letter: 'F',
                month: 'May',
                value: 15
              },
              {
                letter: 'G',
                month: 'May',
                value: 86
              },
              {
                letter: 'H',
                month: 'May',
                value: 23
              },
              {
                letter: 'I',
                month: 'May',
                value: 65
              },
              {
                letter: 'J',
                month: 'May',
                value: 0
              },
              {
                letter: 'A',
                month: 'June',
                value: 51
              },
              {
                letter: 'B',
                month: 'June',
                value: 30
              },
              {
                letter: 'C',
                month: 'June',
                value: 7
              },
              {
                letter: 'D',
                month: 'June',
                value: 74
              },
              {
                letter: 'E',
                month: 'June',
                value: 44
              },
              {
                letter: 'F',
                month: 'June',
                value: 62
              },
              {
                letter: 'G',
                month: 'June',
                value: 65
              },
              {
                letter: 'H',
                month: 'June',
                value: 35
              },
              {
                letter: 'I',
                month: 'June',
                value: 95
              },
              {
                letter: 'J',
                month: 'June',
                value: 59
              },
              {
                letter: 'A',
                month: 'July',
                value: 89
              },
              {
                letter: 'B',
                month: 'July',
                value: 50
              },
              {
                letter: 'C',
                month: 'July',
                value: 35
              },
              {
                letter: 'D',
                month: 'July',
                value: 45
              },
              {
                letter: 'E',
                month: 'July',
                value: 93
              },
              {
                letter: 'F',
                month: 'July',
                value: 19
              },
              {
                letter: 'G',
                month: 'July',
                value: 52
              },
              {
                letter: 'H',
                month: 'July',
                value: 81
              },
              {
                letter: 'I',
                month: 'July',
                value: 72
              },
              {
                letter: 'J',
                month: 'July',
                value: 99
              },
              {
                letter: 'A',
                month: 'August',
                value: 54
              },
              {
                letter: 'B',
                month: 'August',
                value: 41
              },
              {
                letter: 'C',
                month: 'August',
                value: 75
              },
              {
                letter: 'D',
                month: 'August',
                value: 10
              },
              {
                letter: 'E',
                month: 'August',
                value: 0
              },
              {
                letter: 'F',
                month: 'August',
                value: 93
              },
              {
                letter: 'G',
                month: 'August',
                value: 3
              },
              {
                letter: 'H',
                month: 'August',
                value: 80
              },
              {
                letter: 'I',
                month: 'August',
                value: 88
              },
              {
                letter: 'J',
                month: 'August',
                value: 27
              },
              {
                letter: 'A',
                month: 'September',
                value: 81
              },
              {
                letter: 'B',
                month: 'September',
                value: 36
              },
              {
                letter: 'C',
                month: 'September',
                value: 77
              },
              {
                letter: 'D',
                month: 'September',
                value: 1
              },
              {
                letter: 'E',
                month: 'September',
                value: 45
              },
              {
                letter: 'F',
                month: 'September',
                value: 23
              },
              {
                letter: 'G',
                month: 'September',
                value: 1
              },
              {
                letter: 'H',
                month: 'September',
                value: 13
              },
              {
                letter: 'I',
                month: 'September',
                value: 61
              },
              {
                letter: 'J',
                month: 'September',
                value: 87
              },
              {
                letter: 'A',
                month: 'October',
                value: 5
              },
              {
                letter: 'B',
                month: 'October',
                value: 29
              },
              {
                letter: 'C',
                month: 'October',
                value: 49
              },
              {
                letter: 'D',
                month: 'October',
                value: 81
              },
              {
                letter: 'E',
                month: 'October',
                value: 5
              },
              {
                letter: 'F',
                month: 'October',
                value: 6
              },
              {
                letter: 'G',
                month: 'October',
                value: 3
              },
              {
                letter: 'H',
                month: 'October',
                value: 72
              },
              {
                letter: 'I',
                month: 'October',
                value: 27
              },
              {
                letter: 'J',
                month: 'October',
                value: 99
              },
              {
                letter: 'A',
                month: 'November',
                value: 25
              },
              {
                letter: 'B',
                month: 'November',
                value: 11
              },
              {
                letter: 'C',
                month: 'November',
                value: 54
              },
              {
                letter: 'D',
                month: 'November',
                value: 90
              },
              {
                letter: 'E',
                month: 'November',
                value: 21
              },
              {
                letter: 'F',
                month: 'November',
                value: 5
              },
              {
                letter: 'G',
                month: 'November',
                value: 41
              },
              {
                letter: 'H',
                month: 'November',
                value: 4
              },
              {
                letter: 'I',
                month: 'November',
                value: 31
              },
              {
                letter: 'J',
                month: 'November',
                value: 22
              },
              {
                letter: 'A',
                month: 'December',
                value: 99
              },
              {
                letter: 'B',
                month: 'December',
                value: 54
              },
              {
                letter: 'C',
                month: 'December',
                value: 85
              },
              {
                letter: 'D',
                month: 'December',
                value: 39
              },
              {
                letter: 'E',
                month: 'December',
                value: 45
              },
              {
                letter: 'F',
                month: 'December',
                value: 24
              },
              {
                letter: 'G',
                month: 'December',
                value: 87
              },
              {
                letter: 'H',
                month: 'December',
                value: 69
              },
              {
                letter: 'I',
                month: 'December',
                value: 59
              },
              {
                letter: 'J',
                month: 'December',
                value: 44
              }
            ]}
          />
          <StackedBarChart
            options={{
              title: 'Tutorial',
              width: '33%',
              height: '100%',
              axes: {
                left: {
                  mapsTo: 'value'
                },
                bottom: {
                  mapsTo: 'group',
                  // @ts-ignore
                  scaleType: 'labels'
                }
              },
              bars: {
                width: 50
              },
              color: {
                scale: {
                  Qty: palette.primary.main,
                  More: palette.warning.dark,
                  Sold: palette.secondary.main,
                  Restocking: palette.error.dark,
                  Misc: palette.success.main
                }
              }
            }}
            data={[
              { group: 'Qty', value: 65000 },
              { group: 'More', value: 29123 },
              { group: 'Sold', value: 35213 },
              { group: 'Restocking', value: 51213 },
              { group: 'Misc', value: 16932 }
            ]}
          />
          <CirclePackChart
            data={[
              {
                name: 'North America',
                children: [
                  {
                    name: 'Canada',
                    value: 800
                  },
                  {
                    name: 'United States',
                    value: 200
                  },
                  {
                    name: 'Mexico',
                    value: 100
                  }
                ]
              },
              {
                name: 'South America',
                children: [
                  {
                    name: 'Brazil',
                    value: 2800
                  },
                  {
                    name: 'Argentina',
                    value: 10000
                  },
                  {
                    name: 'G',
                    value: 500
                  },
                  {
                    name: 'DE',
                    value: 500
                  },
                  {
                    name: 'EF',
                    value: 200
                  }
                ]
              },
              {
                name: 'Asia',
                children: [
                  {
                    name: 'China',
                    value: 500
                  },
                  {
                    name: 'Thailand',
                    value: 100
                  },
                  {
                    name: 'Cambodia',
                    value: 500
                  },
                  {
                    name: 'India',
                    value: 500
                  },
                  {
                    name: 'Vietnam',
                    value: 400
                  },
                  {
                    name: 'North Korea',
                    value: 600
                  },
                  {
                    name: 'Japan',
                    value: 200
                  },
                  {
                    name: 'Indonesia',
                    value: 800
                  }
                ]
              },
              {
                name: 'Europe',
                children: [
                  {
                    name: 'France',
                    value: 2000
                  },
                  {
                    name: 'Italy',
                    value: 400
                  },
                  {
                    name: 'Greece',
                    value: 500
                  },
                  {
                    name: 'Portugal',
                    value: 100
                  },
                  {
                    name: 'Austria',
                    value: 1000
                  },
                  {
                    name: 'Ireland',
                    value: 800
                  },
                  {
                    name: 'Germany',
                    value: 700
                  },
                  {
                    name: 'Poland',
                    value: 200
                  },
                  {
                    name: 'Ukraine',
                    value: 300
                  }
                ]
              }
            ]}
            options={{
              title: 'Two Levels Hierarchy',
              // @ts-ignore
              canvasZoom: {
                enabled: true
              },
              height: '100%',
              width: '33%',
              color: {
                scale: {
                  'North America': palette.primary.main,
                  'South America': palette.warning.dark,
                  'Asia': palette.secondary.main,
                  'Europe': palette.success.main
                }
              }
            }}
          />
        </Stack>
      </Stack>
      <Stack orientation="horizontal" style={{ width: '100%', height: '42dvh' }}>
        {/* @ts-ignore */}
        <DonutChart
          options={{
            title: 'Donut (centered)',
            resizable: true,
            legend: {
              alignment: 'center'
            },
            donut: {
              center: {
                label: 'Browsers'
              },
              alignment: 'center'
            },
            height: '100%',
            width: '33%',
            color: {
              scale: {
                '2V2N 9KYPM version 1': palette.primary.main,
                'L22I P66EP L22I P66EP L22I P66EP': palette.warning.dark,
                'JQAI 2M4L1': palette.secondary.main,
                'YEL48 Q6XK YEL48': palette.error.dark,
                'Misc': palette.success.main
              }
            }
          }}
          data={[
            {
              group: '2V2N 9KYPM version 1',
              value: 20000
            },
            {
              group: 'L22I P66EP L22I P66EP L22I P66EP',
              value: 65000
            },
            {
              group: 'JQAI 2M4L1',
              value: 75000
            },

            {
              group: 'YEL48 Q6XK YEL48',
              value: 10000
            },
            {
              group: 'Misc',
              value: 25000
            }
          ]}
        />
        <StackedAreaChart
          data={[
            {
              group: 'Dataset 1',
              date: '2019-01-01T03:00:00.000Z',
              value: 10000
            },
            {
              group: 'Dataset 1',
              date: '2019-01-08T03:00:00.000Z',
              value: 10000
            },
            {
              group: 'Dataset 1',
              date: '2019-01-13T03:00:00.000Z',
              value: 49213
            },
            {
              group: 'Dataset 1',
              date: '2019-01-17T03:00:00.000Z',
              value: 51213
            },
            {
              group: 'Dataset 2',
              date: '2019-01-05T03:00:00.000Z',
              value: 25000
            },
            {
              group: 'Dataset 2',
              date: '2019-01-08T03:00:00.000Z',
              value: 60000
            },
            {
              group: 'Dataset 2',
              date: '2019-01-17T03:00:00.000Z',
              value: 55213
            },
            {
              group: 'Dataset 3',
              date: '2019-01-01T03:00:00.000Z',
              value: 30000
            },
            {
              group: 'Dataset 3',
              date: '2019-01-05T03:00:00.000Z',
              value: 20000
            },
            {
              group: 'Dataset 3',
              date: '2019-01-08T03:00:00.000Z',
              value: 40000
            },
            {
              group: 'Dataset 3',
              date: '2019-01-13T03:00:00.000Z',
              value: 60213
            },
            {
              group: 'Dataset 3',
              date: '2019-01-17T03:00:00.000Z',
              value: 25213
            }
          ]}
          options={{
            title: 'Stacked area (time series with uneven data)',
            axes: {
              left: {
                stacked: true
              },
              bottom: {
                // @ts-ignore
                scaleType: 'time',
                mapsTo: 'date'
              }
            },
            width: '66%',
            height: '100%',
            color: {
              scale: {
                'Dataset 1': palette.error.dark,
                'Dataset 3': palette.primary.main,
                'Dataset 2': palette.warning.dark
              }
            }
          }}
        />
      </Stack>
    </>
  )
}
