import React from 'react';
import {Stack,Button} from '@shopify/polaris';
import {ArrowUpMinor,ArrowDownMinor} from '@shopify/polaris-icons';

class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            source:[]
        }
    }


    changeSource=(i)=>{

        var source=this.state.source;
        (source[i] == ArrowUpMinor)?source[i]=ArrowDownMinor:source[i]=ArrowUpMinor
        this.setState({
            source:source
        });
    }

    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data != oldState.data && this.props.src!=oldState.source){

    
            this.setState({
                data:this.props.data,
                source:this.props.src
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
                <Stack>
                <p key={item}>{item}</p>
                <Button icon={this.state.source[index]} onClick={()=>this.changeSource(index)}/>
                </Stack>
            )}
            </div>
        );
    }
}

export default Loader;