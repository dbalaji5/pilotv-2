import React from 'react';
import Stack from '@shopify/polaris';
class Interpreter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            category:[],
        }
    }

    componentDidUpdate(oldProps,oldState){
    
        
        if(this.props.data !== oldState.data && this.props.cat!==oldState.cat){

    
            this.setState({
                data:this.props.data,
                category:this.props.cat,
            });

            console.log(this.state.data[0]);

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
            {this.state.data.map(item => {
                <Stack>
                <p key={item}>{item}</p>
                </Stack>
            })}
            </div>
        );
    }
}

export default Interpreter;