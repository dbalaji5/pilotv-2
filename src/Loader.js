import React from 'react';

class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidUpdate(oldProps,oldState){
        if(this.props.data !== oldState.data){
            this.setState({
                data:this.props.data
            });
        }
    }
    render(){
        if(this.state.data.length==0){
            return (
                <h1>Waiting for the contents</h1>
            );
        }
        return(
            <div> 
            {this.state.data.map(item => 
                <h1 key={item}>{item}</h1>    
                
            )}
            </div>
        );
    }
}

export default Loader;