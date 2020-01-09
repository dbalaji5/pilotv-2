import React from 'react';
import './App.css';

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

  overClick=(e)=>{

      e.target.style="cursor:pointer;text-decoration:underline;"
  }

  handleClicker=(e)=>{
      
      var disval=e.target.textContent;
      var dbval=e.target.parentElement.getAttribute("title");
      var category=e.target.getAttribute("title");
      this.props.onValueChange(disval,dbval,category);
  }

  handleClicker2=(e)=>{
      
    var disval=e.target.textContent;
    var dbval=e.target.parentElement.getAttribute("title");
    var category=e.target.getAttribute("title");
    this.props.onValueChange(disval,dbval,category);
  }

  handleClick=(e)=>{
    e.target.parentElement.querySelector(".nested").classList.toggle("active");
    e.target.classList.toggle("caret-down");
    //this.props.onClick(e.target.parentElement.getAttribute("title"));
  }

  handleClick2=(e)=>{
    e.target.parentElement.querySelector(".nested").classList.toggle("active");
    e.target.classList.toggle("caret-down");
  }

  outClick=(e)=>{
      e.target.style="text-decoration:none";
      
  }

  render() {

    var ligen=((item,txt) => {
 
      return Object.keys(item).map((element) => {
       return (element==="none") ? 
          item["none"].map( el => <li key={el} title={txt.concat('|',el)}><span class="caret" title='demographics' onClick={this.handleClicker} onMouseOver={this.overClick} onMouseOut={this.outClick}>{el}</span></li>)
        :
         <li key={element} title={(txt!=='')?txt.concat('|',element):element}><span class="caret" onClick={this.handleClick} onMouseOver={this.overClick} onMouseOut={this.outClick}>{element}</span><ul class="nested">{ligen(item[element],(txt!=='')?txt.concat('|',element):element)}</ul></li>;
        
      })
    })
    var ligen2=((item,cat) => {

      return Object.keys(item).map((element) => {

          return (element==="none") ?
            item[element].map( el => <li key={el} title={el}><span class="caret" title={cat} onClick={this.handleClicker2} onMouseOver={this.overClick} onMouseOut={this.outClick}>{el}</span></li>)
          :
          <li key={element}><span class="caret" onClick={this.handleClick} onMouseOver={this.overClick} onMouseOut={this.outClick}>{element}</span><ul class="nested">{(Array.isArray(item[element]))?item[element].filter(el => el!==" ").map( el => <li key={el} title={el}><span class="caret" title={cat} onClick={this.handleClicker2} onMouseOver={this.overClick} onMouseOut={this.outClick}>{el}</span></li>):ligen2(item[element],cat)}</ul></li>;
      })
    })
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var list1=ligen(items['dem'],'')
      var list2=ligen2(items['inc'],'incident')
      var list3=ligen2(items['ret'],'crime')
      return (
      <div>
      <ul>
        
        <li title="demo"><span class="caret" onClick={this.handleClick} onMouseOver={this.overClick} onMouseOut={this.outClick}>Demographics</span>
        
            <ul class="nested">
              
               {list1}
              
            </ul>
        
        </li>
        {list2}
        <li><span class="caret" onClick={this.handleClick2} onMouseOver={this.overClick} onMouseOut={this.outClick}> Crime</span>
            <ul class="nested">

              {list3}
              
            </ul>

        </li>
        </ul>
        </div>
      )
    }
  }
}

export default App;
