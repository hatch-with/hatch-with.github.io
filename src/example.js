import React from 'react';
import Chart from './Charts2';
import { thisExpression } from '@babel/types';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {name: 'select', week: 'select', submitted: false};


    }


    Home() {
      return (
        <div>
          <Chart active_student="fia" active_week="1"/>
        </div>
      );
    }
    
    About() {
      return (
        <div>
          <h2>About</h2>
        </div>
      );
    }
    
    Topics({ match }) {
      return (
        <div>
          <h2>Topics</h2>
          <ul>
            <li>
              <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
              <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
              <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
          </ul>
    
          <Route path={`${match.path}/:topicId`} component={this.Topic} />
          <Route
            exact
            path={match.path}
            render={() => <h3>Please select a topic.</h3>}
          />
        </div>
      );
    }


    render() {
      return (
        <Router>
          <div>
            <ul>
              {/* <li>
                <Link to="/">Home</Link>
              </li> */}
              <li>
                <Link to="/about">About</Link>
              </li>
              
            </ul>

            <hr />

            {/* <Route exact path="/" component={this.Home} /> */}
            <Route path="/about" component={this.About} />
          </div>
        </Router>
      );
    }
  }

  export default NameForm;








