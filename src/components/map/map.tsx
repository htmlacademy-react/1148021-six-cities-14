import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { TCity } from '../place-card/place-card.types';
import { TPoint } from './map.types';

type MapProps = {
  city: TCity;
  points: Array<TPoint>;
  selectedPoint?: TPoint | undefined;
  section?: 'cities' | 'offer';
  style?: React.CSSProperties;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

export default function Map({ city, points, selectedPoint, section = 'cities', style }: MapProps): React.ReactNode {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const { latitude, longitude, zoom } = city.location;
      map.setView([latitude, longitude], zoom);

      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker(point);

        marker
          .setIcon(
            selectedPoint && point[0] === selectedPoint[0] && point[1] === selectedPoint[1]
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, city, points, selectedPoint]);

  return <section className={`${section}__map map`} ref={mapRef} style={style}></section>;
}
