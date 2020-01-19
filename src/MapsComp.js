import React from 'react';
import { Map, TileLayer,LayersControl,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';

class MapsComp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data){
          console.log(this.props.data);
        
            this.setState({
                data:this.props.data,
            });
          
        }
       
    }
    getColor = (val) => {


        return val>=-1 && val < -0.75? '#67001f':
               val>=-0.75 && val < -0.6 ? '#b2182b':
               val>=-0.6 && val < -0.4 ? '#d6604d':
               val>=-0.4 && val < -0.2 ? '#f4a582':
               val>=-0.2 && val < 0 ? '#fddbc7':
               val>=0.01   &&  val <0.1 ? '#d1e5f0':
               val>=0.1 && val < 0.3 ? '#92c5de':
               val>=0.3 && val < 0.5 ? '#4393c3':
               val>=0.5 && val < 0.75 ? '#2166ac':
               val >= 0.75 && val <= 1 ? '#053061':
               val>=0 && val <0.01 ? '#ffffff':
                                     '#000000';
  
      };

      

    render(){

        var style = (feature) => {
            var checkDauId=feature.properties.DAUID;
            if(Object.keys(this.state.data).length>0){
                return ({
                    fillColor: this.getColor(this.state.data[checkDauId]),
                    color:this.getColor(this.state.data[checkDauId]),
                    opacity:1,
                    fillOpacity:0.3,
                    weight:0.5
                });
            }
        }

        return (

          <Map center={[44.755113, -63.320488]} zoom={9} style={{ height: "80vh" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
         
          <LayersControl position="topright">
          
          <LayersControl.BaseLayer name="Indcmp" checked="true">
          <GeoJSON 
                // key={this.state.gkey}
                ref="geojson"
                data={diss}
                style={style}
              />
          </LayersControl.BaseLayer>
            
          </LayersControl>
          </Map>
        );
    }

}

export default MapsComp;