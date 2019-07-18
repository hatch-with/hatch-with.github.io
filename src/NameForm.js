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
    return  (
      <div>
     {/* {console.log(this.props.data)} */}
    <Chart active_student={this.props.name} order={this.props.week} data={this.props.data}/> 
    </div>
    )
  }
}

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: 'select', week: 'select', submitted: false, data: []};
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
        this.setState({url: this.state.data[event.target.value-1].url})

    }
    toggle(){
      this.setState({ submitted: true }); 
    }

    componentWillMount() {
      fetch("https://api.sheety.co/bf043b2f-df70-4bab-8f9c-bc87a9d929c8")
      .then((response) => {
        return response.json()
      }).then((json) => {
        this.setState({data: json});
        console.log(this.state.data)
      })
    }
  
    render() {
      return (
        <div>
            <form>
                <label>
                <select value={this.state.name} onChange={this.handleNameChange}>
                    <option value="select">Select:</option>
                    {this.state.data.map((student)=><option value={student.students_lower} key={student.students_lower}>{student.students}</option>)}
                </select>
                </label>
                <select value={this.state.week} onChange={this.handleWeekChange}>
                    <option value="select">Select:</option>
                    {this.state.data.map((info, index) => info.apis ? <option key={index} value={info.week_order}>{`${info.dropdown_title}`}</option> : '')}
                </select>
            </form>
						
            {
                (this.state.name === 'select') || (this.state.week === 'select') ? 
                ''
                :
                <Router>
                    <Link to ={`/${this.state.name}/${this.state.url}`} onClick={this.toggle}><button>Let's Go!</button></Link>
                    <Route path={`/${this.state.name}/${this.state.url}`} component={() => <RenderChart name={this.state.name} week={this.state.week} data={this.state.data} />} />
                </Router>
            }
        </div>
      );
    }
  }

  export default NameForm;