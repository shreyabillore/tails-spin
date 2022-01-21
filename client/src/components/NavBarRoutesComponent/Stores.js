import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import MainLayout from '../Layouts/MainLayout';
import './Store.css'

export default function Stores() {
    const position = [47.842,28.03146]
    return (
      <MainLayout>
    <div id='map'>
    <MapContainer center={[43.842,27.03146]} zoom={4} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
     <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[45.842,22.03046]}>
        <Popup>
          test <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[40.842,25.03346]}>
        <Popup>
          test <br /> Easily customizable.
        </Popup>
      </Marker>  
    </MapContainer>
     </div>
    </MainLayout>
    )
}
