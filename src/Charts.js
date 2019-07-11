import React from 'react';
import './App.css';
const CHAPTERS = [5, 3]
const APIS = [
  "https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1",
  "https://api.sheety.co/8a980111-20a6-4c83-bc7a-596335e640c2"
]

export class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekone: [],
      weektwo: [],
      sorted: [],
      headers: [],
      oneloaded: false,
      twoloaded: false,
    }
  }

  componentDidMount() {
    let final = [];
    let all_headers = [];

    // for (let i = 0; i < 4; i++) {
    //   let link = APIS[i];
    //   let week_data = [];

    //   fetch(link)
    //     .then((response) => {
    //       return response.json()
    //     }).then((json) => {
    //       week_data.push(json);

    //       let group = [];
    //       let group_headers = [];
    //       for (let x = 1; x < CHAPTERS[i]; x++) {
    //         let segments = week_data.filter(item => item.chapter == i.toString());
    //         let header = week_data.filter(item => item.chapter == 'C'+i.toString());
            
    //         group.push(segments);
    //         group_headers.push(header);
    //       }

    //       final.push(group);
    //       all_headers.push(group_headers);
    //     })
    // }
    
    fetch("https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1")
      .then((response) => {
        return response.json()
      }).then((one) => {
        this.setState({weekone: one});
        let group = []
        
        for (let i = 1; i < CHAPTERS[0]; i++) {
          let segments = this.state.weekone.filter(item => item.chapter == i.toString());
          let header = this.state.weekone.filter(item => item.chapter == 'C'+i.toString())
          all_headers.push(header);
          group.push(segments)
          
          // if (segments.length> 0) {final.push(segments);}
        }
        final.push(group);
        this.setState({oneloaded: true});

      });

    fetch("https://api.sheety.co/8a980111-20a6-4c83-bc7a-596335e640c2")
      .then((response) => {
        return response.json()
      }).then((two) => {
        this.setState({weektwo: two});
        let group = []

        for (let i = 1; i < CHAPTERS[1]; i++) {
          let segments = this.state.weektwo.filter(item => item.chapter == i.toString());
          let header = this.state.weektwo.filter(item => item.chapter == 'C'+i.toString())
          all_headers.push(header);
          group.push(segments);
        }

        final.push(group);
        this.setState({twoloaded: true});

      });

    this.setState({sorted: final});
    this.setState({headers: all_headers})
  }


  // renderData() {
  //   console.log('rendering')
  //   return this.state.sorted.map((week) => 
  //     <div key={week} className="week-container">
  //       {week.map((row) => 
  //         <div key={row.code} id={row.code} className="module-container">
  //           <p>{row.code}</p>
  //           <p>{row.instructions}</p>
  //         </div>
  //       )}
  //     </div>
  //   )
  // }

  renderData() {
    return this.state.sorted.map((week, index) => 
      <div key={index} className="week-container" id={index+1}>
        {week.map((chapter, index) => 
          <div key={index} className="chapter-container" id={chapter[0].chapter}>
            {chapter.map((mods, index) => 
              <div key={index} className="module-container">
              {/* {mods.code} */}
                <a href={mods.code}>
                  <img className="card-img" src={mods.picture}></img>
                </a> 
              </div>  
            )}
          </div>
          )}
      </div>
    )
  }


  render() {
    return(
      <div>
        {this.state.oneloaded && this.state.twoloaded ? this.renderData() : <h2>{'Loading'}</h2>}
      </div>
    )
  }
}

