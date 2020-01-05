import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Collapse} from 'react-collapse';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }


  componentDidMount() {
    fetch("http://localhost:5000/rest/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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

  handleClick(e){

     alert(e);
  }

  render() {

    var ligen=((item,txt) => {
 
      return Object.keys(item).map((element) => {
       return (element=="none") ? 
          item["none"].map( el => <li key={el} value={txt.concat('|',el)}>{el}</li>)
        :
         <li key={element} value={(txt!='')?txt.concat('|',element):element}>{element}<ul>{ligen(item[element],(txt!='')?txt.concat('|',element):element)}</ul></li>;
        
      })
    })
    var ligen2=(item => {

      return Object.keys(item).map((element) => {

          return (element=="none") ?
            item[element].map( el => <li key={el}>{el}</li>)
          :
          <li key={element}>{element}<ul>{(Array.isArray(item[element]))?item[element].filter(el => el!=" ").map( el => <li key={el}>{el}</li>):ligen2(item[element])}</ul></li>;
      })
    })
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var list1=ligen(items['dem'],'')
      var list2=ligen2(items['inc'])
      var list3=ligen2(items['ret'])
      return (
      
      <ul>
        
        <li onClick={this.handleClick()}>Demographics
        
            <ul>
              
               {list1}
              
            </ul>
        
        </li>
        {list2}
        <li> Crime
            <ul>

              {list3}
            </ul>

        </li>
        </ul>
      )
    }
  }
}

export default App;
