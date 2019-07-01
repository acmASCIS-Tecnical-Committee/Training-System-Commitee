import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div className="landing">
        <div >
          <div >
            <div >
              <div >
                <h1>Training</h1>
                <p className="lead">
                  {' '}
                  Create a Training Committee profile.
                </p>
                <hr />
                <Link to="/register">
                  Sign Up
                </Link>
                <Link to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
