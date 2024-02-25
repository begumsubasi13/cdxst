import React, { useRef } from 'react';
import { Layout, Space , InputNumber, Button, notification } from 'antd';
import { Component, useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper,Circle } from 'google-maps-react';
import NearbyPlacesService from "../services/NearbyPlacesService";
import { GoogleMap, InfoWindow, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import './HomePage.css';

      const { Header, Footer, Sider, Content } = Layout;

      export default function HomePage(props) {

      // These three parameters can be defined in a single object,
      // but they are defined this way because the relevant method is required to accept three separate parameters.
      const [latitude, setLatitude] = useState();
      const [longitude, setLongitude] = useState();
      const [radius, setRadius] = useState();

      const [places, setPlaces] = useState([]);

      const [map, setMap] = useState(null);

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'xxx',
      });
      const [activeMarker, setactiveMarker] = useState(null);

      const [center, setCenter] = useState({ lat: 40.93363, lng: 29.32694 });

      const centerMarkerIcon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        // scaledSize: new window.google.maps.Size(40, 40), 
      };

      const openSuccessNotification = () => {
        notification.open({
          message: 'Notification',
          description:
            'Success!',
          onClick: () => {
          },
        });
      };

      const openFailNotification = (error) => {
        if (error && error.data && error.data.errorDesc) {
          const errorStatus = error.data.errorCode;
          const errorMessage = error.data.errorDesc;
          notification.open({
            message: "Error Code: "+ errorStatus,
            description: errorMessage,
            onClick: () => {
            },
          });
        } else {
          notification.open({
            message: "Error",
            description: "Error!",
            onClick: () => {
            },
          });
        }
      };

      const handleActiveMarker = (marker) => {
        if(marker === activeMarker){
            return;
        }
        setactiveMarker(marker);
      };

      const isCenterMarker = (markerLat, markerLng) => {
        
        
        if(markerLat === latitude && markerLng === longitude){
          // console.log(markerLat,markerLng);
           return true;
        }
        else {
          return false;
        }
      };

      const handleOk = async () => {
        try {
          const response = await NearbyPlacesService.getLocation(latitude, longitude, radius);
          const parsedPlaces = JSON.parse(response?.data?.apiResp)

          openSuccessNotification();
          setPlaces(parsedPlaces);
          setCenter({ lat: latitude, lng: longitude });

        } catch (error) {
          console.error('Error fetching nearby places:', error);
          openFailNotification(error.data);
        }
      };

      useEffect(() => {
        onLoad();
      },[handleOk]);

      const handleClear = () => {
        setLatitude('');
        setLongitude('');
        setRadius('');
      };

      const onLoad = map => {
        setMap(map);
      };
    
return (
  <Layout style={{ minHeight: '100vh' }}>
    <Header className="header">Header</Header>
    <Content className="content">
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sider width="20%" className="sider">
          Sider
        </Sider>
        <Content>
        <Space direction="vertical" align="center" style={{ width: '100%', padding: '20px' }}>
            <InputNumber
              placeholder="Latitude"
              style={{ width: '100%' }}
              step={0.1}
              min={-90}
              max={90}
              precision={5}
              value={latitude}
              onChange={value => setLatitude(value)}
            />
            <InputNumber
              placeholder="Longitude"
              style={{ width: '100%' }}
              step={0.1}
              min={-180}
              max={180}
              precision={5}
              value={longitude}
              onChange={value => setLongitude(value)}
            />
            <InputNumber
              placeholder="Radius(m)"
              style={{ width: '100%' }}
              min={0}
              max={50000}
              value={radius}
              onChange={value => setRadius(value)}
            />
          </Space>
      <Button 
      style={{
      width: 300,
      marginBottom:20,}} 
      onClick={() => handleOk()}>Get Nearby Places</Button> 
      
      <Button 
      style={{
      width: 100,
      marginLeft:20,}} 
      onClick={handleClear}>Clear</Button>

{isLoaded && (
    <GoogleMap
    mapContainerClassName="map-container"
    zoom={13}
    center={center}
    onLoad={onLoad}
    onClick={() => setactiveMarker(null)}
  >
    {places && places.results?.length > 0 && (places?.results?.map(place => (
      <MarkerF
        key={place.place_id}
        position={{ lat: place.geometry.location.lat , lng: place.geometry.location.lng }}
        onClick={() => handleActiveMarker(place.place_id)}
        icon={isCenterMarker(place.geometry.location.lat,place.geometry.location.lng) ? centerMarkerIcon : undefined}
      >
        {
        activeMarker === place.place_id ? <InfoWindowF onCloseClick={() => setactiveMarker(null)}>
        <div style={{ color: 'black' }}>{place.name}</div>
        </InfoWindowF> : null 
        }
        </MarkerF>
    )))}

  </GoogleMap>
  )}

        </Content>
      </Layout>
    </Content>
    <Footer className="footer">@ 2024 - Begüm SUBAŞI </Footer>
  </Layout>
);

      }


