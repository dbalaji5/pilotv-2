import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup,LayersControl,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';


  class Maps extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          weight: 0.5,
          opacity: 1,
          color: '#ffcc99'
        };
      }
    
    render(){
        const L = require("leaflet");

        console.log(diss);

        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
        var style = (feature) => {
            return {
                weight: this.state.weight,
                opacity: this.state.opacity
    
            };
    
        }
        const onEachFeature = (feature,layer) => {

            console.log(feature.properties["DAUID"]);
            layer.setStyle({fillColor : this.state.color ,color:this.state.color,opacity:this.state.opacity,fillOpacity:0.3,weight:0.3})

        }
        return (
    <Map center={[44.755113, -63.320488]} zoom={9} style={{ height: "50vh" }}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
      
      <LayersControl.BaseLayer name="grayscale">
      <GeoJSON 
        ref="geojson"
        data={diss}
        style={style}
        onEachFeature={onEachFeature.bind(this)}
      />
      </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

    </Map>
  );
    
  };
}

export default Maps;
