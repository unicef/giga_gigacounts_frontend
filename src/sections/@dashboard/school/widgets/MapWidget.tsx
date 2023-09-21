import { Theme } from '@carbon/react'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { IDashboardSchools, MetricSnake } from 'src/@types'
import { Typography } from 'src/components/typography'
import { WidgetWrapper } from 'src/components/widgets'
import { STRING_DEFAULT } from 'src/constants'
import { useLocales } from 'src/locales'
import markerIcon from 'src/sections/@dashboard/school/widgets/images/location--filled.svg'
import userMarkerIcon from 'src/sections/@dashboard/school/widgets/images/user-location--filled.svg'
import { getMetricLabel } from 'src/utils/metrics'

const LocationMarker = () => {
  const [position, setPosition] = useState(null)
  const { translate } = useLocales()
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e: any) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    }
  })

  return position === null ? null : (
    <Marker icon={new Icon({ iconUrl: userMarkerIcon })} position={position}>
      <Popup className="map-popup">
        <Theme theme="g90">
          <Typography>{translate('widgets.map.you_are_here')}</Typography>
        </Theme>
      </Popup>
    </Marker>
  )
}

function SchoolMarker({ index, school }: { index: number; school: IDashboardSchools }) {
  const { translate } = useLocales()
  return (
    <Marker
      key={`${index}-${school.external_id}`}
      position={[parseFloat(school.lat), parseFloat(school.lng)]}
      icon={new Icon({ iconUrl: markerIcon })}
    >
      <Popup className="map-popup">
        <Theme theme="g90">
          <Typography as="h6">{`${school.name} (${school.external_id}) `}</Typography>
          <Typography>
            {translate(MetricSnake.Latency)}: {school.avg_latency?.toFixed(2) ?? STRING_DEFAULT}
            {getMetricLabel(MetricSnake.Latency)}
            <br />
            {translate(MetricSnake.Uptime)}: {school.avg_uptime?.toFixed(2) ?? STRING_DEFAULT}
            {getMetricLabel(MetricSnake.Uptime)}
            <br />
            {translate(MetricSnake.DownloadSpeed)}:{' '}
            {school.avg_dspeed?.toFixed(2) ?? STRING_DEFAULT}
            {getMetricLabel(MetricSnake.DownloadSpeed)}
            <br />
            {translate(MetricSnake.UploadSpeed)}: {school.avg_uspeed?.toFixed(2) ?? STRING_DEFAULT}
            {getMetricLabel(MetricSnake.UploadSpeed)}
          </Typography>
        </Theme>
      </Popup>
    </Marker>
  )
}

const Map = ({
  schools,
  userPosition = true
}: {
  schools?: IDashboardSchools[]
  userPosition?: boolean
}) => (
  <MapContainer
    style={{ width: '100%', height: '100%', outline: 'none', zIndex: 1 }}
    center={[1, 1]}
    zoom={2}
    maxZoom={20}
    minZoom={2}
    scrollWheelZoom
    dragging
    trackResize
    keyboard
  >
    <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {schools && (
      <MarkerClusterGroup chunkedLoading>
        {schools.map((school, index) => (
          <SchoolMarker key={school.id} index={index} school={school} />
        ))}
      </MarkerClusterGroup>
    )}
    {userPosition && <LocationMarker />}
  </MapContainer>
)

export function MapWidget({ schools }: { schools?: IDashboardSchools[] }) {
  const { translate } = useLocales()
  return (
    <WidgetWrapper title={translate('widgets.map.title')} width="100%" height="50dvh">
      <Map schools={schools} userPosition />
    </WidgetWrapper>
  )
}
