import React from 'react';
import {Stack} from '@shopify/polaris';
class Interpreter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            category:[]
        }
    }

    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data && this.props.cat!==oldState.category){

            console.log(this.props.data,this.props.cat);
            this.setState({
                data:this.props.data,
                category:this.props.cat
            });

            console.log(this.state.data);

        }
    }

    render(){
        if(this.state.data.length===0){
            return (
                <h1>Waiting for the contents</h1>
            );
        }
        console.log(this.state.data);
        return(
            <div> 
                    <Stack vertical={true}>
                    {this.state.data.map(it => <p key={it}>{it}</p>)}
                    </Stack>
            </div>
        );
    }
}

export default Interpreter;