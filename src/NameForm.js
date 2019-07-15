import React from 'react';
import Chart from './Charts';
import { thisExpression } from '@babel/types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-143284229-01', {
  debug: false,
  titleCase: false,
  gaOptions: {
    userId: 123
  }
});
ReactGA.pageview(window.location.pathname + window.location.search);

class RenderChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {  
    return <Chart active_student={this.props.name} active_week={this.props.week} />
  }
}

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: 'select', week: 'select', submitted: false};
      this.toggle= this.toggle.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleWeekChange = this.handleWeekChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleNameChange(event) {
				this.setState({submitted: false})
        this.setState({name: event.target.value});
    }

    handleWeekChange(event) {
				this.setState({submitted: false})
				this.setState({week: event.target.value});
    }
    toggle(){
      this.setState({ submitted: true }); 
    }
  
    render() {
      return (
        <div>
            <form>
                <label>
                <select value={this.state.name} onChange={this.handleNameChange}>
                    <option value="select">Select:</option>
                    <option value="belle">Belle</option>
                    <option value="fia">Fia</option>
                    <option value="joshua">Joshua</option>
                    <option value="kiefe">Kiefe</option>
                    <option value="syafii">Syafii</option>
                    <option value="syed">Syed</option>
                    <option value="wanNing">Wan Ning</option>
                </select>
                </label>
                <select value={this.state.week} onChange={this.handleWeekChange}>
                    <option value="select">Select:</option>
                    <option value="1">Week 1</option>
                    <option value="2">Week 2</option>
                    <option value="3">Week 3</option>
                    <option value="4">Week 4</option>
                </select>
            </form>
						
            {
                (this.state.name === 'select') || (this.state.week === 'select') ? 
                ''
                :
                <Router>
                    <Link to ={`/${this.state.week}`} onClick={this.toggle}><button>Let's Go!</button></Link>
                    <Route path={`/${this.state.week}`} component={() => <RenderChart name={this.state.name} week={this.state.week}/>} submitted={this.state.submitted}/>
                </Router>
            }
        </div>
      );
    }
  }

  export default NameForm;