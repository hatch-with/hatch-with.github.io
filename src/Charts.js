import React from 'react';
import './App.css';
import ContentPage from './ContentPage';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

var mod;

const CHAPTERS = [4, 3]
const APIS = ["https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1",
"https://api.sheety.co/8a980111-20a6-4c83-bc7a-596335e640c2"]

class RenderInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props.code);
    // {this.props.context.setState({info: this.props.data})}
  }

  render() {
    return (
      <div>
        {console.log('entered render info')}
        <ContentPage data={this.props.info} />
      </div>
    )
  }
}

export class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sorted: [],
      headers: [],
      loaded: false,
      info: false,
      mod: '',
      clicked: false
    }
    this.changeState = this.changeState.bind(this);
  }

  organiseData() {
    if (this.state.data) {
      for (let i = 1; i < CHAPTERS[this.props.active_week-1]; i++) {
        let segments = this.state.data.filter(item => item.chapter == i.toString());
        let header = this.state.data.filter(item => item.chapter == 'C'+i.toString())
        this.state.headers.push(header);
        this.state.sorted.push(segments)
      }
      this.setState({loaded: true});
    }
  }

  componentDidMount() {
    let API = APIS[this.props.active_week-1];
    ReactGA.pageview(window.location.pathname + window.location.search);

    fetch(API)
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({data: json});
        this.organiseData()
      })
  }

  getInfo(e, code) {
    // e.stopPropagation();
    // this.setState({mod: code})
    mod = code
    this.setState({mod: 2})    
    console.log(this.state.mod);

  }

  changeState() {
    let state = this.state.clicked
    this.setState({clicked: !state})
  }
  
  renderData() {
    return ( 
    <div>
      {this.state.sorted.map((chapter, index) =>
        <div key={index} className="chapter-container" id={chapter[0].chapter}>
          <div style={{display: this.state.clicked ? 'none' : 'block'}} className="chapter-header">{this.state.headers[index][0].title}</div>
          {chapter.map((mods, index) => 
            <div key={index} className="module-container">
            <Link to ={`/${mods.code}`}><img className={`card-img ${mods[this.props.active_student] ? '': 'grey'}`} src={mods.picture} style={{display: this.state.clicked ? 'none' : 'block'}}
onClick={this.changeState}></img></Link> 
            <Route path={`/${mods.code}`} component={() => this.state.clicked ? <RenderInfo info={chapter[index]} context={this} /> : '' } />           
          </div>
          )}
        </div>
      )}      
      <button style={{display: this.state.clicked ? 'block' : 'none'}}  onClick={this.changeState}>go back</button>
    </div>
    )
  }

  render() {
    return(
      <div>
        <Router>
          {this.renderData()}
        </Router>
      </div>
    )
  }
}



export default Charts;