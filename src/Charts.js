import React from 'react';
import './App.css';
const CHAPTERS = 5;

export class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sorted: [],
      headers: [],
      loaded: false,
    }
  }

  componentDidMount() {
    let final = [];
    let all_headers = [];
    
    fetch("https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1")
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({data: json});
        console.log('hi');

        
        for (let i = 1; i < CHAPTERS; i++) {
          let segments = this.state.data.filter(item => item.chapter == i.toString());
          let header = this.state.data.filter(item => item.chapter == 'C'+i.toString())
          all_headers.push(header);
          if (segments.length> 0) {final.push(segments);}
        }
        this.setState({sorted: final});
        this.setState({headers: all_headers})
        console.log(this.state.headers);
        this.setState({loaded: true});
      });
  }


  renderData() {
    console.log('rendering')
    return this.state.sorted.map((week) => 
      <div key={week} className="week-container">
        {week.map((row) => 
          <div key={row.code} id={row.code} className="module-container">
            <p>{row.code}</p>
            <p>{row.instructions}</p>
          </div>
        )}
      </div>
    )
  }

  // renderData() {
  //     this.state.data.map((row) => 
  //     <div key={row.Module}>
  //       <p>{row.Module}</p>
  //       <p>{row.Instructions}</p>
  //     </div>
  //     )

  // }

  render() {
    return(
      <div>
        {this.state.loaded ? this.renderData() : <h2>{'Loading'}</h2>}
      </div>
    )
  }
}

