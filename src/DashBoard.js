import React from 'react';
import '@shopify/polaris/styles.css';
import {AppProvider,Card,Layout,Button,Stack,Scrollable, TextStyle} from '@shopify/polaris';
import Maps from './Maps.js'
import App from './App.js'
import Loader from './Loader.js'
import 'leaflet/dist/leaflet.css';
import Interpreter from './Interpreter.js';
import {ArrowUpMinor} from '@shopify/polaris-icons';
import axios from 'axios'
import Setting from './Setting.js'
class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             idisplay: [],
             idbdata: [],
             icategory: [],
             display: [],
             dbdata: [],
             source: [],
             category: [],
             src:[],
             range:[],
             gendic:[],
             gresult:{},
             iresult:{},
             gdata:[],
             idata:[],
             stat:"generate",
             ajaxLoading:false
        }
    }

    componentDidMount(){

        
    }

    // handleClick(a,b){
    //    console.log(a,b);
    // }
    
    storeDisplay = (disval,dbval,cat) => {

        if(this.state.stat==="generate"){
    
            const dbdata2=this.state.dbdata;
            const flag=dbdata2.some(val => val === dbval);
            console.log(flag);

            
            if(!flag){
              const dbdata=this.state.dbdata;
              dbdata.push(dbval);
              const source=this.state.source;
              source.push(ArrowUpMinor)
              const display=this.state.display;
              display.push(disval);
              const category2=this.state.category;
              category2.push(cat);
              const src=this.state.src;
              src.push(1);
              const range=this.state.range;
              range.push(0);
              this.setState({
                  display: display,
                  dbdata: dbdata,
                  source:source,
                  src:src,
                  category:category2,
                  range:range
              });
          }
      }
      else{
          
          const idbdata=this.state.idbdata;
          const flag2=idbdata.some(val => val === dbval);
          if(!flag2){
              const idbdata=this.state.idbdata;
              idbdata.push(dbval);
              const idisplay=this.state.idisplay;
              idisplay.push(disval);
              const icategory=this.state.icategory;
              icategory.push(cat);
              this.setState({
                 idbdata:idbdata,
                 idisplay:idisplay,
                 icategory:icategory
              });
          }
          console.log(this.state.idisplay,this.state.icategory);

      }
      
     
    };
    clearArray = () =>{
       console.log(this.state.src);
       console.log(this.state.range);
       const display=[];
       const dbdata=[];
       const source=[];
       const category=[];
       const src=[];
       const range=[];
       const gresult={};
       const gdata=[];
       this.setState({display:display,dbdata:dbdata,source:source,category:category,src:src,range:range,gresult:gresult,gdata:gdata});
    };

    generateArray = () => {
   
      var res={};
      for(var i=0;i<this.state.dbdata.length;i++){
          res[this.state.dbdata[i]]=(this.state.range[i])*(this.state.src[i]);
      }
      console.log(res);
      var cat="index";
      if(this.state.category[0]==="incident"){
          cat="incident"
      }
      if(this.state.category[0]==="demographics"){
          cat="dindex"
      }
      this.setState({
          ajaxLoading:true
      })
        axios.get('http://localhost:5000/rest/'+cat+'/',{params:res})
        .then(result => {
     
          this.setState(

            {
               ajaxLoading:false,
               gresult:result.data['resu2'],
               gdata:result.data['sums'],
            }
          )
        })

    };

    interpretArray = () => {
      var result={};
      for(var j=0;j<this.state.idbdata.length;j++){

          result[this.state.idbdata[j]]=1;

      }
      var cat1="interpreter3";
      if(this.state.icategory[0]==="incident"){
          cat1="interpreter2"
      }
      if(this.state.icategory[0]==="demographics"){
          cat1="interpreter1"
      }
      this.setState({
        ajaxLoading:true
      })
      axios.get('http://localhost:5000/rest/'+cat1+'/',{params:result})
        .then(result => {
          this.setState({
              ajaxLoading:false,
              iresult:result.data['pred'],
              idata:result.data['sums']
          });

        })

    };

    mutateSource =(src) => {

      this.setState({
        source:src
      });
    }
    mutateRange =(range) => {

       this.setState({
          range:range
       });
    }

    setStat = (value) => {
      const stat=value;
     
       this.setState({
          stat:stat
       });
    }

  render(){
   
   return(
  <AppProvider>
  
  <Layout>
  <Layout.Section oneThird>
    
    <Card title="Indicators" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">Choose Indicators</TextStyle>
        
        
        <Setting onClick={(value)=>this.setStat(value)}/>
      </Card.Section>
      <Card.Section title="Items">
      <Scrollable shadow style={{height: '60vh'}}>
          <App onValueChange={(disval,dbval,cat)=>this.storeDisplay(disval,dbval,cat)}/>
       </Scrollable>
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird secondary>
    <Card title="Selector">
      <Card.Section>
        <Stack spacing="loose">
        <Button primary onClick={this.generateArray}>Generate</Button>
        <Button primary onClick={this.clearArray}>Clear</Button>
        </Stack>
      </Card.Section>
      <Card.Section>
         <Loader data={this.state.display} src={this.state.source} cat={this.state.category} source={this.state.src} range={this.state.range} onSourceChange={(src)=>this.mutateSource(src)} onRangeChange={(range)=> this.mutateRange(range)}/>
       
      </Card.Section>
    </Card>
    <Card title="Interpreters">
      <Card.Section>
        <Button primary onClick={this.interpretArray}>Interpret</Button>
      </Card.Section>
      <Card.Section>
          <Interpreter data={this.state.idisplay} cat={this.state.icategory} />
       
      </Card.Section>
    </Card>
  </Layout.Section>

      
  <Maps genres={this.state.gresult} gendata={this.state.gdata} ajaxload={this.state.ajaxLoading} intres={this.state.iresult} intdata={this.state.idata}/>
     
</Layout>
</AppProvider>
   );
  }
}

export default DashBoard;