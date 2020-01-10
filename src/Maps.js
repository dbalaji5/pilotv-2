import React from 'react';
import { Map, TileLayer,Popup,LayersControl,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';
import {Card,Layout,Spinner} from '@shopify/polaris';
import Plot from 'react-plotly.js';


let numMapClicks = 0
let geoMapClicks=0
let geoMapClicks2=0

  class Maps extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          weight: 0.5,
          opacity: 1,
          color: '#ffcc99',
          color2: '#ff66b2',
          gpopup: false,
          ipopup:false,
          position:[],
          iposition:[],
          gtitle:'',
          ititle:'',
          key:numMapClicks++,
          gkey:geoMapClicks++,
          ikey:geoMapClicks2,
          gLoading:false,
          iLoading:false,
          genres:{},
          gendata:[],
          genX:[],
          genY:[]
        };
      }
      componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.genres !== oldState.genres && this.props.gendata!==oldState.gendata){
          console.log(this.props.gendata);
        
            this.setState({
                genres:this.props.genres,
                gendata:this.props.gendata,
                gkey:geoMapClicks,
                ikey:geoMapClicks2,
                weight:1,
            });
          
        }
    }

     getColor = (val) => {

      console.log(val);

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
   

     onEachFeature = (feature,layer) => {


      var checkDauId=feature.properties.DAUID;
      layer.on('click',(e)=>{
          console.log(e);
          this.setState({
             gpopup:true,
             position:e.latlng,
             key:numMapClicks++,
             
          });
          if(this.state.gendata.length===0){
              this.setState({
                  gLoading:false
              })
          }
          else{
              this.setState({
                  gLoading:true
              })
          }
          if(this.state.gLoading){
            for(var i=0;i<this.state.gendata.length;i++){

                if(this.state.gendata[i].DAUID===checkDauId){
                    const title='Index:'+this.state.gendata[i].Index;
                    this.setState(

                      {
                         genX:this.state.gendata[i].X,
                         genY:this.state.gendata[i].Y,
                         gtitle:title
                      }
                    )
                    
                    break;
                }
            }
          }
      });
    if(this.state.gendata.length===0){
      this.setState({
          gLoading:false
      })
  }
  else{
      this.setState({
          gLoading:true
      })
  }
  if(this.state.gLoading){
      layer.setStyle({fillColor : this.getColor(this.state.genres[checkDauId]) ,color:this.getColor(this.state.genres[checkDauId]),opacity:1,fillOpacity:0.3,weight:1})
  }
  }
    render(){

        console.log(diss);

        var style = (feature) => {
            var checkDauId=feature.properties.DAUID;
            if(this.state.gendata.length>0){
                return ({
                    fillColor: this.getColor(this.state.genres[checkDauId]),
                    color:this.getColor(this.state.genres[checkDauId]),
                    opacity:1,
                    fillOpacity:0.3,
                    weight:1
                });
            }
            else{
            return ({
                
                weight: this.state.weight,
                opacity: this.state.opacity
              }
            );
          }
    
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
          layer.on('click',(e)=>{
            console.log(e);
            this.setState({
               ipopup:true,
               iposition:e.latlng,
               key:numMapClicks++,
               ititle:feature.properties.DAUID
            });
        })
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
                key={this.state.gkey}
                ref="geojson2"
                data={diss}
                style={style}
                onEachFeature={(feature,layer)=>this.onEachFeature(feature,layer)}
              />
            
               {this.state.gpopup && <Popup key={this.state.key} position={this.state.position} onClose={()=>{this.setState({popup:false})}}>
               <div style={{width:320+'px',height:240+'px'}}>
               {(this.state.gLoading)?(<Plot
                    data={[
                      {type: 'bar',
                              x: this.state.genX,
                              y: this.state.genY,
                              marker: {
                                  color: '#74C67A',
                                  line: {
                                      width: 2.5
                                        }
                               }
                       }
                    ]}
                    layout={ {width: 320, height: 240, title: this.state.gtitle} }
               />):(<Spinner accessibilityLabel="Spinner example" size="large" color="teal" />)}
                  </div>
                </Popup>
                
                }
            
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Interpret">
              <GeoJSON 
                key={this.state.ikey}
                ref="geojson"
                data={diss}
                style={style2}
                onEachFeature={onEachFeature2.bind(this)}
              />
              {this.state.ipopup && <Popup key={this.state.key} position={this.state.iposition} onClose={()=>{this.setState({ipopup:false})}}>
              <div style={{width:320+'px',height:240+'px'}}>
              {(this.state.iLoading)?(<Plot
                    data={[
                      {type: 'bar',
                              x: ['A','B','C'],
                              y: [12,23,34],
                              marker: {
                                  color: '#C8A2C8',
                                  line: {
                                      width: 2.5
                                        }
                               }
                       }
                    ]}
                    layout={ {width: 320, height: 240, title: this.state.ititle} }
                  />):(<Spinner accessibilityLabel="Spinner example" size="large" color="teal" />)}
                  </div>
                </Popup>}
            
              </LayersControl.BaseLayer>
              </LayersControl>
              

            </Map>
            {/* <Spinner accessibilityLabel="Spinner example" size="large" color="teal" /> */}

      </Card>
      <Card title="demo">
        <div id="te">

        </div>
      </Card>
    </Layout.Section>
  );
    
  };
}

export default Maps;
