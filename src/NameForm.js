import React from 'react';
import Chart from './Charts';
import { thisExpression } from '@babel/types';

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Select:'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        this.state.value == 'Select:' ? alert("don't forget your name!") : <Chart />;
        // alert('name is ' + this.state.value);
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <label>
            Name<br></br>
            <select value={this.state.value} onChange={this.handleChange}>
                {/* <option selected value="">Select:</option> */}
                <option value="Select:">Select:</option>
                <option value="Belle">Belle</option>
                <option value="Fia">Fia</option>
                <option value="Joshua">Joshua</option>
                <option value="Kiefe">Kiefe</option>
                <option value="Syafii">Syafii</option>
                <option value="Syed">Syed</option>
                <option value="Wan Ning">Wan Ning</option>
            </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default NameForm;