import React from 'react';
import { Map, TileLayer, Marker, Popup,LayersControl,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';
import {Card,Layout} from '@shopify/polaris';
import createPlotlyComponent from "react-plotlyjs";
import Plotly from 'plotly.js/dist/plotly-cartesian';
import L from "leaflet";
import ReactDOM from 'react-dom';


  class Maps extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          weight: 0.5,
          opacity: 1,
          color: '#ffcc99',
          color2: '#ff66b2',
          demref:React.createRef()
        };
      }
    componentDidMount(){


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

            const Plot = createPlotlyComponent(Plotly);

            var countnF=feature.properties.DAUID
            var popup = L.popup({minWidth:300,maxHeight:500}).setContent("<div class=\"pops\" id=\"myPop"+countnF+"\"></div>");
            layer.bindPopup(popup).openPopup();
              const element = (
                <div>
                  <h1>Hello, world!</h1>
                  <h2>It is {new Date().toLocaleTimeString()}.</h2>
                </div>
              );
              var data = [{
                x: [1999, 2000, 2001, 2002],
                y: [10, 15, 13, 17],
                type: 'scatter'
              }];
              
              var layout = {
                title: 'Sales Growth',
                xaxis: {
                  title: 'Year',
                  showgrid: false,
                  zeroline: false
                },
                yaxis: {
                  title: 'Percent',
                  showline: false
                }
              };
              // Plotly.newPlot(this.demref, data, layout);
            // ReactDOM.render(element, document.getElementById('myPop'));
            console.log(feature.properties["DAUID"]);
            layer.setStyle({fillColor : this.state.color ,color:this.state.color,opacity:this.state.opacity,fillOpacity:0.3,weight:0.3})

        }
      var style2 = (feature) => {
          return {
              weight: this.state.weight,
              opacity: this.state.opacity
  
          };
  
      }
      const onEachFeature2 = (feature,layer) => {

          console.log(feature.properties["DAUID"]);
          layer.setStyle({fillColor : this.state.color2 ,color:this.state.color2,opacity:this.state.opacity,fillOpacity:0.4,weight:0.4})

      }
        return (
          <Layout.Section oneHalf>
          <Card title="Visualization">
            <Map center={[44.755113, -63.320488]} zoom={9} style={{ height: "60vh" }}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
             
              <LayersControl position="topright">
              
              <LayersControl.BaseLayer name="Index" checked="true">
              <GeoJSON 
                ref="geojson2"
                data={diss}
                style={style}
                onEachFeature={onEachFeature.bind(this)}
              />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Interpret">
              <GeoJSON 
                ref="geojson"
                data={diss}
                style={style2}
                onEachFeature={onEachFeature2.bind(this)}
              />
              </LayersControl.BaseLayer>
              </LayersControl>
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

            </Map>
            {/* <Spinner accessibilityLabel="Spinner example" size="large" color="teal" /> */}

      </Card>
      <Card title="demo">
        <div id="te" ref={this.demref}>

        </div>
      </Card>
    </Layout.Section>
  );
    
  };
}

export default Maps;
