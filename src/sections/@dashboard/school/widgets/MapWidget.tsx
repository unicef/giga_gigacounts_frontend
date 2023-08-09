import { useState } from 'react'
import { Icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { WidgetWrapper } from 'src/components/widgets'
import { ICONS } from 'src/constants'
import { useTheme } from 'src/theme'
import { IDashboardSchools } from 'src/@types'
import markerIcon from 'src/sections/@dashboard/school/widgets/images/marker-icon.png'
import 'src/sections/@dashboard/school/widgets/Map.css'
import 'leaflet/dist/leaflet.css'

const Map = ({ schools, userPosition = false }: { schools?: IDashboardSchools[], userPosition?: boolean }) => {
  const LocationMarker = () => {
    const [position, setPosition] = useState(null)
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
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  function SchoolMarker({ index, school }: { index: number; school: IDashboardSchools }) {
    return (
      <Marker
        key={`${index}-${school.external_id}`}
        position={[parseFloat(school.lat), parseFloat(school.lng)]}
        icon={new Icon({iconUrl: markerIcon})}
      >
        <Popup>
          <strong>{`${school.name} (${school.external_id}) `}</strong> <br />
          <br />
          avg. Latency: {school.avg_latency} <br />
          avg. Uptime: {school.avg_uptime} <br />
          avg. D. Speed: {school.avg_dspeed} <br />
          avg. U. Speed: {school.avg_uspeed} <br />
        </Popup>
      </Marker>
    )
  }

  return (
    <MapContainer center={[10.32424, 5.84978]} zoom={13} maxZoom={20} minZoom={2} scrollWheelZoom>
      <TileLayer attribution="" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        {schools && schools.map((school, index) => <SchoolMarker index={index} school={school} />)}
      </MarkerClusterGroup>
      {userPosition && <LocationMarker />}
    </MapContainer>
  )
}

export function MapWidget({ schools, userPosition = false }: { schools?: IDashboardSchools[], userPosition?: boolean }) {
  const { palette } = useTheme()

  return (
    <WidgetWrapper
      Icon={ICONS.Payment}
      iconColor={palette.error.main}
      title="Schools Map"
      width="100%"
      height="100%"
    >
      <Map schools={schools} userPosition={userPosition} />
    </WidgetWrapper>
  )
}
