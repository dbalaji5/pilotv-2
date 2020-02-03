import React from 'react';
import Ranger from './Ranger.js'
import axios from 'axios';

// function RangeSliderExample() {
//     const [rangeValue, setRangeValue] = useState(32);
  
//     const handleRangeSliderChange = useCallback(
//       (value) => setRangeValue(value),
//       [],
//     );
  
//     return (
//       <Card sectioned title="Background color">
//         <RangeSlider
//           label="Opacity percentage"
//           value={rangeValue}
//           onChange={handleRangeSliderChange}
//           output
//         />
//       </Card>
//     );
//   }
  
class Severity extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            error:null,
            min:0,
            max:0
        }
    }
   
    componentDidMount(){

        var trans = [];
        trans.push(this.props.attr);
        console.log(trans);
        console.log("***************",this.props.cat);
        if(this.props.cat==="crime"){
            console.log("in");

            axios.get('http://localhost:5000/rest/severity/',{params:{param2:trans}})
                .then(result => {
                console.log(result.data['min']);
                const min=result.data['min'];
                const max=result.data['max'];
                this.props.setRange(max);
                    this.setState({

                        isLoaded:true,
                        min:min,
                        max:max
                    });
                    
                })
        }
        else{
            this.props.setRange(100);
            this.setState({
                isLoaded:true,
                min:0,
                max:100
            })
        }
    }

   

    render(){
          if(this.state.isLoaded){
            return(
                <Ranger min={0} max={this.state.max} onChange={(value)=>this.props.onChange(value)}/>
            );
          }
          return(<p>error</p>);
  

    }
    
};

export default Severity;

