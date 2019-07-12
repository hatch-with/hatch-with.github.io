import React from 'react';
import './App.css';
import { ftruncateSync } from 'fs';
const CHAPTERS = [4, 3]
const APIS = ["https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1",
"https://api.sheety.co/8a980111-20a6-4c83-bc7a-596335e640c2"]

export class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sorted: [],
      headers: [],
      loaded: false,
      // active_student: this.active_student.bind(this),
      // active_week: this.active_week.bind(this)
    }
  }

  organiseData() {
    console.log(this.state.data)

    //filter according to chapters and students and push the relevant data into the state, set loaded state to true
    // this.state.active_student ? this.getData: 
    if (this.state.data) {
      for (let i = 1; i < CHAPTERS[this.props.active_week-1]; i++) {
        console.log(this.state.data);
        let segments = this.state.data.filter(item => item.chapter == i.toString());
        let header = this.state.data.filter(item => item.chapter == 'C'+i.toString())
        this.state.headers.push(header);
        this.state.sorted.push(segments)
      }

      this.setState({loaded: true});
    }
    console.log(this.state.data)

  }

  // abortController = new AbortController();

  componentDidMount() {
    //fetch the data from api according to which week is active
    //push the full data into the state 
    //run organiseData function after everything is done, to sort data out
    // active_student ? this.getData : '';

      let API = APIS[this.props.active_week-1];
      console.log(API);

      fetch(API)
        .then((response) => {
          return response.json()
        }).then((json) => {
          this.setState({data: json});
          this.organiseData()
          console.log(json)
          console.log(this.state.data)
          // this.props.active_week ? this.organiseData() : '';
        })
        

        
    }
    // componentWillUnmount() {
    //   console.log('aborting')
    //   this.abortController.abort()
    // }
    
  //   fetch("https://api.sheety.co/3664fce7-19ab-434d-865c-fbe5034cdfa1")
  //     .then((response) => {
  //       return response.json()
  //     }).then((one) => {
  //       this.setState({weekone: one});
  //       let group = []
        
  //       for (let i = 1; i < CHAPTERS[0]; i++) {
  //         let segments = this.state.weekone.filter(item => item.chapter == i.toString());
  //         let header = this.state.weekone.filter(item => item.chapter == 'C'+i.toString())
  //         all_headers.push(header);
  //         group.push(segments)
          
  //         // if (segments.length> 0) {final.push(segments);}
  //       }
  //       final.push(group);
  //       this.setState({oneloaded: true});

  //     });

  //   fetch("https://api.sheety.co/8a980111-20a6-4c83-bc7a-596335e640c2")
  //     .then((response) => {
  //       return response.json()
  //     }).then((two) => {
  //       this.setState({weektwo: two});
  //       let group = []

  //       for (let i = 1; i < CHAPTERS[1]; i++) {
  //         let segments = this.state.weektwo.filter(item => item.chapter == i.toString());
  //         let header = this.state.weektwo.filter(item => item.chapter == 'C'+i.toString())
  //         all_headers.push(header);
  //         group.push(segments);
  //       }

  //       final.push(group);
  //       this.setState({twoloaded: true});

  //     });

  //   this.setState({sorted: final});
  //   this.setState({headers: all_headers})
  // }


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
    // console.log(this.state.sorted)
    return this.state.sorted.map((chapter, index) =>
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
    )
  }

  // renderData() {
  //   return this.state.sorted.map((week, index) => 
  //     <div key={index} className="week-container" id={index+1}>
  //       {week.map((chapter, index) => 
  //         <div key={index} className="chapter-container" id={chapter[0].chapter}>
  //           {chapter.map((mods, index) => 
  //             <div key={index} className="module-container">
  //             {/* {mods.code} */}
  //               <a href={mods.code}>
  //                 <img className="card-img" src={mods.picture}></img>
  //               </a> 
  //             </div>  
  //           )}
  //         </div>
  //         )}
  //     </div>
  //   )
  // }


  render() {
    return(
      <div>
        {this.state.loaded ? this.renderData() : <h2>{'Loading'}</h2>}
      </div>
    )
  }
}

export default Charts;