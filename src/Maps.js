import React from 'react';
import { Map, TileLayer,Popup,LayersControl,GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import diss from '../data/Dissemination.json';
import '@shopify/polaris/styles.css';
import {Card,Layout,Spinner} from '@shopify/polaris';
import Plot from 'react-plotly.js';
import axios from 'axios';
import BarChart from './BarChart.js';


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
          intres:{},
          gendata:[],
          intdata:[],
          genX:[],
          genY:[],
          intX:[],
          intY:[],
          ajaxload:false,
          cmpload:false
        };
      }
      componentDidUpdate(oldProps,oldState){
    
        
        if((this.props.genres !== oldState.genres && this.props.gendata!==oldState.gendata) || (this.props.intres !== oldState.intres && this.props.intdata!==oldState.intdata)  || (this.props.ajaxload!== oldState.ajaxload)){
         
        
            this.setState({
                genres:this.props.genres,
                gendata:this.props.gendata,
                gkey:geoMapClicks,
                ikey:geoMapClicks2,
                intres:this.props.intres,
                intdata:this.props.intdata,
                weight:1,
                ajaxload:this.props.ajaxload
            });
          
        }
        // if(this.props.intres !== oldState.intres && this.props.intdata!==oldState.intdata){
        //    console.log(this.props.intres);
        //    this.setState({
        //      intres:this.props.intres,
        //      intdata:this.props.intdata
        //    })
        // }
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

    onEachFeature2 = (feature,layer) => {
      //layer.setStyle({fillColor : this.state.color2 ,color:this.state.color2,opacity:this.state.opacity,fillOpacity:0.4,weight:0.4})
      if(this.state.intdata.length===0){
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
        this.setState({
           cmpload:true
        })
        axios.get('http://localhost:5000/rest/explainer/',{params:data})
        .then(result => {

          
          var rX=[]
          var rY=[]
          var rdata=result.data['exp'];
          for(var i=0;i<rdata.length;i++){
              rY.push(rdata[i][1])
              rX.push(rdata[i][0])
          }
     
          this.setState(

            {
               intX:rX,
               //support@refer.telus.com dexter hugo 
               intY:rY,
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
   

     onEachFeature = (feature,layer) => {


      var checkDauId=feature.properties.DAUID;
      layer.on('click',(e)=>{
          
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
  // if(this.state.gLoading){
  //     layer.setStyle({fillColor : this.getColor(this.state.genres[checkDauId]) ,color:this.getColor(this.state.genres[checkDauId]),opacity:1,fillOpacity:0.3,weight:1})
  // }
  }
    render(){

        

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
          //   else{
          //   return ({
                
          //       weight: this.state.weight,
          //       opacity: this.state.opacity
          //     }
          //   );
          // }
    
        }
       
      var style2 = (feature) => {
        var checkDauId=feature.properties.DAUID;
        if(this.state.intdata.length>0){
            return ({
                fillColor: this.getColor(this.state.intres[checkDauId]),
                color:this.getColor(this.state.intres[checkDauId]),
                opacity:1,
                fillOpacity:0.3,
                weight:1
            });
        }
  
      }
      // const onEachFeature2 = (feature,layer) => {

      //     console.log(feature.properties["DAUID"]);
      //     layer.setStyle({fillColor : this.state.color2 ,color:this.state.color2,opacity:this.state.opacity,fillOpacity:0.4,weight:0.4})
      //     layer.on('click',(e)=>{
            
      //       this.setState({
      //          ipopup:true,
      //          iposition:e.latlng,
      //          key:numMapClicks++,
      //          ititle:feature.properties.DAUID
      //       });
      //   })
      // }
        return (
          
          <Layout.Section oneHalf>
          <Card title="Visualization">
          {(this.state.ajaxload==false)?(
            <Map center={[44.755113, -63.320488]} zoom={9} style={{ height: "50vh" }} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
             
              <LayersControl position="topright">
              
              <LayersControl.BaseLayer name="Index" checked="true">
              <GeoJSON 
                // key={this.state.gkey}
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
                onEachFeature={(feature,layer)=>this.onEachFeature2(feature,layer)}
              />
              {this.state.ipopup && <Popup key={this.state.key} position={this.state.iposition} onClose={()=>{this.setState({ipopup:false})}}>
              <div style={{width:320+'px',height:240+'px'}}>
              {(this.state.iLoading && this.state.cmpload)?(<Plot
                    data={[
                      {type: 'bar',
                              x: this.state.intX,
                              y: this.state.intY,
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
              

            </Map>):
           <Spinner accessibilityLabel="Spinner example" size="large" color="teal" />}

      </Card>
      {/* <Card title="demo">
        <div id="te">

                 {(this.state.gLoading)?(<BarChart data={this.state.gendata}/>):<p>Waiting for Contents</p>}
        </div>
      </Card> */}
    </Layout.Section>
  );
    
  };
}

export default Maps;
