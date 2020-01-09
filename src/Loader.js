import React from 'react';
import {Stack,Button} from '@shopify/polaris';
import {ArrowUpMinor,ArrowDownMinor} from '@shopify/polaris-icons';
import Severity from './Severity.js';

class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            source:[],
            src:[],
            category:[],
            range:[]
        }
    }


    changeSource=(i)=>{

        var source=this.state.source;
        var src=this.state.src;
        if(source[i] === ArrowUpMinor){
            source[i]=ArrowDownMinor;
            src[i]=-1;
        }
        else{
            source[i]=ArrowUpMinor
            src[i]=1;
        }
        this.setState({
            source:source,
            src:src
        });
        this.props.onSourceChange(this.state.src);
    }

    onRangeChange=(value,index)=>{
        var range=this.state.range;
        range[index]=value;
        this.setState({
            range:range
        });
        this.props.onRangeChange(this.state.range);
        
    }

    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data && this.props.src!==oldState.source){

    
            this.setState({
                data:this.props.data,
                source:this.props.src,
                category:this.props.cat,
                src:this.props.source,
                range:this.props.range
            });
            

        }
    }
    render(){
        if(this.state.data.length===0){
            return (
                <h1>Waiting for the contents</h1>
            );
        }
        return(
            <div> 
            {this.state.data.map((item,index) => 
                <Stack distribution="equalSpacing">
                <p key={item}>{item}</p>
                <Severity attr={item} cat={this.state.category[index]} setRange={(ivalue)=>this.onRangeChange(ivalue,index)} onChange={(value)=>this.onRangeChange(value,index)}/> 
                <Button icon={this.state.source[index]} onClick={()=>this.changeSource(index)}/>
                </Stack>
            )}
            </div>
        );
    }
}

export default Loader;