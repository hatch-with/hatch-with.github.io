import React from 'react';
import ReactGA from 'react-ga';
import {withRouter} from 'react-router-dom';

class ContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      // module: this.props.module
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  getData() {
    return (
      <div>
        {console.log('data is here ', this.props.data, 'location is ', this.props.path)}
        <div className="info-container">
          <img className="info-card" src={this.props.data.picture}></img>
          <h5 className="info-title">{this.props.data.title}</h5>
          <p><u>Instructions:</u> {this.props.data.instructions}</p>
          <p><u>Completion requirement:</u> {this.props.data.completionRequirement}</p>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div>{this.getData()}</div>
    )
  }
}

export default ContentPage;