import React from 'react';
import { Map, TileLayer,Popup,LayersControl,GeoJSON } from "react-leaflet";
import {Spinner} from '@shopify/polaris';
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';
import axios from "axios"
import Plot from "react-plotly.js"

let numMapClicks = 0
class MapsComp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            idata1:[],
            idata2:[],
            int1X:[],
            int2X:[],
            int1Y:[],
            int2Y:[],
            indname1:'',
            indname2:'',
            loading:false,
            ipopup:false,
            iLoading:false,
            key:numMapClicks++,
            iposition:[],
            ititle:''

        }
    }
    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data || this.props.loading !== oldState.loading || this.props.idata1 !== oldState.idata1 || this.props.idata2 !== oldState.idata2){
          console.log(this.props.data);
        
            this.setState({
                data:this.props.data,
                idata1:this.props.idata1,
                idata2:this.props.idata2,
                indname1:this.props.indname1,
                indname2:this.props.indname2,
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

      onEachFeature2 = (feature,layer) => {
        //layer.setStyle({fillColor : this.state.color2 ,color:this.state.color2,opacity:this.state.opacity,fillOpacity:0.4,weight:0.4})
        if(this.state.idata1.length===0){
          this.setState({
              iLoading:false
          })
          }
          else{
              this.setState({
                  iLoading:true
              })
          }
        layer.on('click',(e)=>{
         
          if(this.state.iLoading){
          var data={}
          data['DAUID']=feature.properties.DAUID;
          data['indexname1']=this.state.indname1;
          data['indexname2']=this.state.indname2;
          this.setState({
             cmpload:false
          })
          axios.get('http://localhost:5000/rest/compareprop/',{params:data})
          .then(result => {
  
            
            var rX=result.data['indices']['indx1'];
            var rY=result.data['indices']['indy1'];
           
            var iX=result.data['indices']['indx2'];
            var iY=result.data['indices']['indy2'];
           
       
            this.setState(
  
              {
                 int1X:rX, 
                 int1Y:rY,
                 int2X:iX,
                 int2Y:iY,
                 cmpload:true
              }
            )
          });
        }
          this.setState({
             ipopup:true,
             iposition:e.latlng,
             key:numMapClicks++,
             ititle:feature.properties.DAUID
          });
      });
    }

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

        var style1 = (feature) => {
            var checkDauId=feature.properties.DAUID;
            if(Object.keys(this.state.idata1).length>0){
                return ({
                    fillColor: this.getColor(this.state.idata1[checkDauId]),
                    color:this.getColor(this.state.idata1[checkDauId]),
                    opacity:1,
                    fillOpacity:0.3,
                    weight:0.5
                });
            }
        }

        var style2 = (feature) => {
            var checkDauId=feature.properties.DAUID;
            if(Object.keys(this.state.idata2).length>0){
                return ({
                    fillColor: this.getColor(this.state.idata2[checkDauId]),
                    color:this.getColor(this.state.idata2[checkDauId]),
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
                onEachFeature={(feature,layer)=>this.onEachFeature2(feature,layer)}
              />
              {this.state.ipopup && <Popup key={this.state.key} position={this.state.iposition} onClose={()=>{this.setState({ipopup:false})}}>
              <div style={{width:320+'px',height:240+'px'}}>
              {(this.state.iLoading && this.state.cmpload)?(<Plot
                    data={[
                      {type: 'bar',
                              x: this.state.int1X,
                              y: this.state.int1Y,
                              name: 'Index 1',
                              marker: {
                                  color: '#000080',
                                  line: {
                                      width: 2.5
                                        }
                               }
                       },
                       {
                        type: 'bar',
                        x: this.state.int2X,
                        y: this.state.int2Y,
                        name: 'Index 2',
                        marker: {
                            color: '#0F52BA',
                            opacity: 0.4,
                            line: {
                                width: 2.5
                                  }
                         }
                       }
                    ]}
                    layout={ {barmode:'overlay',bargap:0.01,width: 320, height: 240, title: this.state.ititle} }
                  />):(<Spinner accessibilityLabel="Spinner example" size="large" color="teal" />)}
                  </div>
                </Popup>}
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Index1">
          <GeoJSON
                ref="geoindex1"
                data={diss}
                style={style1}
          />    
          </LayersControl.BaseLayer> 
          <LayersControl.BaseLayer name="Index2">
          <GeoJSON
                ref="geoindex2"
                data={diss}
                style={style2}
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