import React from 'react';
import '@shopify/polaris/styles.css';
import { AppProvider, Layout, Card, Scrollable,Page } from '@shopify/polaris';
import Plot from 'react-plotly.js';
import './Comparator.css'
import axios from 'axios';
import MapsComp from './MapsComp';

class Comparator extends React.Component{

    constructor(props){
        
        super(props);
        this.state={
            index1:[],
            index2:[],
            weight1:[],
            variable1:[],
            weight2:[],
            variable2:[],
            valA:"",
            valB:"",
            pieLoading1:false,
            pieLoading2:false,
            compres:{},
            indres1:{},
            indres2:{},
            loading:false,
            indname1:'',
            indname2:''
        }

    }

    componentDidMount() {
        fetch("http://localhost:5000/rest/collector/")
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result.indices['index1']);
              console.log(result.indices['index2']);
              this.setState({
                index1: result.indices['index1'],
                index2: result.indices['index2']
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    
    stylesetter = (e) => {

        var n=e.target.parentElement.nextSibling;
        var p=e.target.parentElement.previousSibling;
        e.target.parentElement.style="background:#4157c559";
        while(n){
            n.style.background="white";
            n=n.nextSibling;
        }
        while(p){
            p.style.background="white";
            p=p.previousSibling;
        }

    }

    comparator =(val,cat) => {

        if(cat==='A'){
            this.setState({
                valA:val
            })
        }
        else{
            this.setState({
                valB:val
            })
        }
        if(this.state.valA!=="" && this.state.valB!==""){
            var tempArr=[];
            tempArr.push(this.state.valA);
            tempArr.push(this.state.valB);
            this.setState({
                loading:true
            })

            var param={};
            param['index']=tempArr;
            console.log(param);
            axios.get('http://localhost:5000/rest/comparisor/',{params:tempArr})
            .then(result => {
                 console.log(result.data.result);
                 this.setState({
                     compres:result.data.result,
                     loading:false
                 })
              })
        }

    }
    
    handleClick = (e) => { 
       
        this.stylesetter(e);
        var par={};
        par['value']=e.target.textContent;
       
        console.log(par);
        this.setState({
            loading:true,
            indname1:par['value']
        })
        axios.get('http://localhost:5000/rest/pie/',{params:par})
        .then(result => {
          console.log("Index1",result.data.index);
          this.setState({
            weight1: result.data.pie['weight'],
            variable1: result.data.pie['variable'],
            indres1:result.data.index,
            pieLoading1:true,
            loading:false
          });
          this.comparator(par['value'],'A');
        })
    }

    handleClick2 = (e) => {

        this.stylesetter(e);   var par={};
        par['value']=e.target.textContent;
        this.setState({
            loading:true,
            indname2:par['value']
        })
        axios.get('http://localhost:5000/rest/pie/',{params:par})
        .then(result => {
          console.log("Index2",result.data.index);
          this.setState({
            weight2: result.data.pie['weight'],
            variable2: result.data.pie['variable'],
            indres2:result.data.index,
            pieLoading2:true,
            loading:false
          });
          this.comparator(par['value'],'B');
        })

    
    }

    pieClick =(data) => {

        console.log(data.points[0].label,this.state.indname1);
    }

    pieClick2 = (data) => {
        console.log(data.points[0].label,this.state.indname2);
    }

    render(){

        return(

                <AppProvider>
                    <Page fullWidth={true} separator>
                    <Layout>
                        <Layout.Section oneThird primary> 
                                <Card title="IndexA">
                                    <Scrollable shadow style={{height: '60vh'}}>
                                    <div>
                                    <ul id="myUL">
                                    {this.state.index1.map((item)=>

                                            <li key={item+'A'}>
                                                    <span class="caret ind1" onClick={this.handleClick}>{item}</span>
                                            </li>

                                    )}
                                    </ul>
                                    </div>
                                    </Scrollable>
                                </Card>
                                <Card title="Proportion Chart">
                                <div>
                                        {(this.state.pieLoading1)?(<Plot
                                                data={[
                                                {type: 'pie',
                                                 values: this.state.weight1,
                                                 labels: this.state.variable1
    
                                                }
                                                ]}
                                                layout={ {width: 400, height: 320, title: this.state.gtitle} }
                                                onClick={(data)=>this.pieClick(data)}
                                        />):(<p>Waiting for the Selection</p>)}
                                            </div>
                                </Card>
                        </Layout.Section>
                        <Layout.Section oneThird secondary>
                            <Card title="IndexB">
                                    <Scrollable shadow style={{height: '60vh'}}>
                                    <div>
                                    <ul id="myUL">
                                    {this.state.index2.map((item)=>

                                            <li key={item+'B'}>
                                                    <span class="caret ind1" onClick={this.handleClick2}>{item}</span>
                                            </li>

                                    )}
                                    </ul>
                                    </div>
                                    </Scrollable>
                            </Card>
                            <Card title="Proportion Chart">
                                <div>
                                        {(this.state.pieLoading2)?(<Plot
                                                data={[
                                                {type: 'pie',
                                                 values: this.state.weight2,
                                                 labels: this.state.variable2
    
                                                }
                                                ]}
                                                layout={ {width: 400, height: 320, title: this.state.gtitle} }
                                                onClick={(data)=>this.pieClick2(data)}
                                        />):(<p>Waiting for the Selection</p>)}
                                            </div>
                                </Card>
                        </Layout.Section>

                        <Layout.Section oneHalf>
                            <Card title="Maps">
                                <MapsComp data={this.state.compres} indname1={this.state.indname1} indname2={this.state.indname2} idata1={this.state.indres1} idata2={this.state.indres2} loading={this.state.loading}/>
                            </Card>
                        </Layout.Section>

                    </Layout>
                    </Page>

                </AppProvider>

        );
    }

}

export default Comparator;