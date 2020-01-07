import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider, Page, Card,Layout,Button,Stack, TextStyle} from '@shopify/polaris';
import Maps from './Maps.js'
import App from './App.js'
import Loader from './Loader.js'
import 'leaflet/dist/leaflet.css';
import Interpreter from './Interpreter.js';

class DashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {

             display: [],
             dbdata: []
        }
    }

    // handleClick(a,b){
    //    console.log(a,b);
    // }
    
    storeDisplay = (disval,dbval) => {
        const dbdata2=this.state.dbdata;
        console.log(dbdata2);
        const flag=dbdata2.some(val => val === dbval);
        console.log(flag);
        
        if(!flag){
          const dbdata=this.state.dbdata;
          dbdata.push(dbval);
          const display=this.state.display;
          display.push(disval);
          this.setState({
              display: display,
              dbdata: dbdata
          });
       }
    };
    clearArray = () =>{
       const display=[]
       const dbdata=[]
       this.setState({display:display,dbdata:dbdata});
    };

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
          <App onClick={(disval,dbval)=>this.storeDisplay(disval,dbval)}/>
       
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section secondary>
    <Card title="Selector">
      <Card.Section>
        <Stack spacing="loose">
        <Button primary>Generate</Button>
        <Button primary onClick={this.clearArray}>Clear</Button>
        </Stack>
      </Card.Section>
      <Card.Section>
          <Loader data={this.state.display}/>
       
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