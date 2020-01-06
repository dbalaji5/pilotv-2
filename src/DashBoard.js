import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider, Page, Card,Layout,Button, TextStyle} from '@shopify/polaris';
import Maps from './Maps.js'
import App from './App.js'
import Loader from './Loader.js'
import 'leaflet/dist/leaflet.css';
import Interpreter from './Interpreter.js';

class DashBoard extends React.Component{
    constructor(props){
        super(props);
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
          <App/>
       
      </Card.Section>
    </Card>
  </Layout.Section>
  <Layout.Section secondary>
    <Card title="Selector">
      <Card.Section>
        <Button primary>Generate</Button>
      </Card.Section>
      <Card.Section>
          <Loader/>
       
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