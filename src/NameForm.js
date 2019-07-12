import React from 'react';
import Chart from './Charts2';
import { thisExpression } from '@babel/types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: 'select', week: 'select', submitted: false};
  
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleWeekChange = this.handleWeekChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);


    }
  
    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleWeekChange(event) {
        this.setState({week: event.target.value});
    }
  
    handleSubmit(event) {
        (this.state.name == 'select') || (this.state.week == 'select') ? this.missingAlert() : this.state.submitted = true;
        event.preventDefault();
    }

    missingAlert() {
        this.state.submitted = false;
        alert("please fill in both your name and the week number")
    }
    renderChart() {
        return (
            <div>hi</div>
            // <Chart active_student={this.state.name} active_week={this.state.week}/>
        )
    }
    render() {
      return (
        <div>
            <form>
                <label>
                Name<br></br>
                <select value={this.state.name} onChange={this.handleNameChange}>
                    {/* <option selected value="">Select:</option> */}
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
                    {/* <option selected value="">Select:</option> */}
                    <option value="select">Select:</option>
                    <option value="1">Week 1</option>
                    <option value="2">Week 2</option>
                    <option value="3">Week 3</option>
                    <option value="4">Week 4</option>
                </select>
            </form>
            {
                (this.state.name == 'select') || (this.state.week == 'select') ? 
                ''
                :
                <div>
                    <Router>
                        <Link to ={`/${this.state.week}`} onClick={this.handleSubmit}>Let's Go!</Link>
                        <Route path={`/${this.state.week}`} component={this.renderChart} />}
                    </Router>
                </div> 
            }
        </div>
      );
    }
  }

  export default NameForm;