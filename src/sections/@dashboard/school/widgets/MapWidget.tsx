import { Theme } from '@carbon/react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { IDashboardSchools } from 'src/@types';
import { Typography } from 'src/components/typography';
import { WidgetWrapper } from 'src/components/widgets';
import { useLocales } from 'src/locales';
import userMarkerIcon from 'src/sections/@dashboard/school/widgets/images/location--current.svg';
import markerIcon from 'src/sections/@dashboard/school/widgets/images/location--filled.svg';
import { getMetricLabel } from 'src/utils/metrics';

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
      <Popup>{translate('widgets.map.you_are_here')}</Popup>
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
            {translate('latency')}: {school.avg_latency}{getMetricLabel('latency')}
          </Typography>
          <Typography>
            {translate('uptime')}: {school.avg_uptime}{getMetricLabel('uptime')}
          </Typography>
          <Typography>
            {translate('download_speed')}: {school.avg_dspeed}{getMetricLabel('download_speed')}
          </Typography>
          <Typography>
            {translate('upload_speed')}: {school.avg_uspeed}{getMetricLabel('upload_speed')}
          </Typography>
        </Theme>
      </Popup>
    </Marker>
  )
}
const Map = ({
  schools,
  userPosition = false
}: {
  schools?: IDashboardSchools[]
  userPosition?: boolean
}) => (
  <MapContainer
    style={{ width: '100%', height: '100%', outline: 'none', zIndex: 1 }}
    center={[10.32424, 5.84978]}
    zoom={13}
    maxZoom={20}
    minZoom={2}
    scrollWheelZoom
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

export function MapWidget({
  schools,
  userPosition = false
}: {
  schools?: IDashboardSchools[]
  userPosition?: boolean
}) {
  const { translate } = useLocales()
  return (
    <WidgetWrapper title={translate('widgets.map.title')} width="100%" height="50dvh">
      <Map schools={schools} userPosition={userPosition} />
    </WidgetWrapper>
  )
}
