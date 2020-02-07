import React from 'react';
import { Map, TileLayer,LayersControl,GeoJSON } from "react-leaflet";
import {Spinner} from '@shopify/polaris';
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';

class MapsComp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            loading:false
        }
    }
    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data || this.props.loading !== oldState.loading){
          console.log(this.props.data);
        
            this.setState({
                data:this.props.data,
                loading:this.props.loading
            });
          
        }
       
    }
    getColor = (val) => {


        return val>=-1 && val < -0.75? '#a50026':
                val>=-0.75 && val < -0.6 ? '#d73027':
                val>=-0.6 && val < -0.4 ? '#f46d43':
                val>=-0.4 && val < -0.2 ? '#fdae61':
                val>=-0.2 && val < 0 ? '#fee08b':
                val>=0.01   &&  val <0.1 ? '#d9ef8b':
                val>=0.1 && val < 0.3 ? '#a6d96a':
                val>=0.3 && val < 0.5 ? '#66bd63':
                val>=0.5 && val < 0.75 ? '#1a9850':
                val >= 0.75 && val <= 1 ? '#006837':
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
          <React.Fragment>
          {(this.state.loading===false)?(
          <Map center={[44.755113, -63.320488]} zoom={9} style={{ height: "90vh" }}>
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
          ):(<Spinner accessibilityLabel="Spinner example" size="large" color="teal" />)}
          </React.Fragment>
        );
    }

}

export default MapsComp;