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
             gdata:[],
             stat:"generate"
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
      console.log(this.state.display);
      console.log(this.state.dbdata);
      console.log(this.state.src);
      console.log(this.state.range);
      console.log(this.state.category);
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
        axios.get('http://localhost:5000/rest/'+cat+'/',{params:res})
        .then(result => {
          console.log(result.data['resu2']);
          console.log(result.data);
          console.log(result.data['valX']);
          this.setState(

            {
               gresult:result.data['resu2'],
               gdata:result.data['sums'],
            }
          )
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
      console.log(stat);
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
        <Button primary>Interpret</Button>
      </Card.Section>
      <Card.Section>
          <Interpreter data={this.state.idisplay} cat={this.state.icategory} />
       
      </Card.Section>
    </Card>
  </Layout.Section>

      
  <Maps genres={this.state.gresult} gendata={this.state.gdata}/>
     
</Layout>
</AppProvider>
   );
  }
}

export default DashBoard;