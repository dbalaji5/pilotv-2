import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider, Page, Card,Layout, TextStyle} from '@shopify/polaris';
import Maps from './Maps.js'
import App from './App.js'
import 'leaflet/dist/leaflet.css';
ReactDOM.render(
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
    <Card title="Selector" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">Indicators</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
          <App/>
       
      </Card.Section>
    </Card>
  </Layout.Section>

  <Layout.Section oneHalf>
    <Card title="Visualization" actions={[{content: 'Manage'}]}>
      <Card.Section>
        <TextStyle variation="subdued">Map</TextStyle>
      </Card.Section>
      <Card.Section title="Items">
        
        <Maps/>
      </Card.Section>
    </Card>
  </Layout.Section>
</Layout>
</AppProvider>
  ,
  document.getElementById('root')
);
