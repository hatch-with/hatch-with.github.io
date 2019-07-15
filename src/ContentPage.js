import React from 'react';
import ReactGA from 'react-ga';
import {withRouter} from 'react-router-dom';
import Linkify from 'react-linkify';

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
        <div className="info-container">
          <img className="info-card" src={this.props.data.picture}></img>
          {/* <h5 className="info-title">{this.props.data.title}</h5> */}
          {this.props.data.instructions ? <p><strong><u>Instructions:</u></strong> <Linkify>{this.props.data.instructions}</Linkify></p> : ''}
          {this.props.data.instructionsImage ? <img src={this.props.data.instructionsImage} className="instructions-image"></img>: ''}
          <p><strong><u>Completion requirement:</u></strong> {this.props.data.completionRequirement}</p>
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