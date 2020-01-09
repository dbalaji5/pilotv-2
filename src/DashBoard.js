import React from 'react';
import '@shopify/polaris/styles.css';
import {AppProvider,Card,Layout,Button,Stack,Scrollable, TextStyle} from '@shopify/polaris';
import Maps from './Maps.js'
import App from './App.js'
import Loader from './Loader.js'
import 'leaflet/dist/leaflet.css';
import Interpreter from './Interpreter.js';
import {ArrowUpMinor} from '@shopify/polaris-icons';

class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

             display: [],
             dbdata: [],
             source: [],
             category: [],
             src:[],
             range:[]
        }
    }

    // handleClick(a,b){
    //    console.log(a,b);
    // }
    
    storeDisplay = (disval,dbval,cat) => {
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
       this.setState({display:display,dbdata:dbdata,source:source,category:category,src:src,range:range});
    };

    generateArray = () => {
      console.log(this.state.display);
      console.log(this.state.dbdata);
      console.log(this.state.src);
      console.log(this.state.range);
      console.log(this.state.category);
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

  render(){
   return(
  <AppProvider>
  
  <Layout>
  <Layout.Section oneThird>
    
    <Card title="Indicators" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">Choose Indicators</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
      <Scrollable shadow style={{height: '60vh'}}>
          <App onValueChange={(disval,dbval,cat)=>this.storeDisplay(disval,dbval,cat)}/>
       </Scrollable>
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section oneThird>
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
          <Interpreter/>
       
      </Card.Section>
    </Card>
  </Layout.Section>

      
  <Maps/>
     
</Layout>
</AppProvider>
   );
  }
}

export default DashBoard;