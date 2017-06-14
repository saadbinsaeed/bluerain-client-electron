import React from 'react';
import './profile.css';
// import $ from 'jquery';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCliked: 'tab1',
    };
    this.handleNavTabs = this.handleNavTabs.bind(this);
  }
  // componentDidMount() {
  //   $(document).ready(function() {
  //     $(".btn-pref .btn").click(function () {
  //         $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
  //         $(this).removeClass("btn-default").addClass("btn-primary");
  //     });
  //   });
  // }
  handleNavTabs(value) {
    console.log('Button clicked is : ', value);
    this.setState({ buttonCliked: value });
  }

  render() {
    const { buttonCliked } = this.state;
    return (
      <div className="profile">
        <div className="profile-card hovercard">
          <div className="card-background">
            <img className="card-bkimg" alt="" src="http://lorempixel.com/100/100/people/9/" />
          </div>
          <div className="useravatar">
            <img alt="" src="http://lorempixel.com/100/100/people/9/" />
          </div>
          <div className="profile-card-info">
            <span className="card-title">Pamela Anderson</span>

          </div>
        </div>
        <div className="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button id="stars" className={buttonCliked === 'tab1' ? 'btn btn-default active' : 'btn btn-default'} onClick={() => this.handleNavTabs('tab1')} href="#tab1" data-toggle="tab">
              <span className="glyphicon glyphicon-star" aria-hidden="true" />
              <div className="hidden-xs">Stars</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button id="favorites" className={buttonCliked === 'tab2' ? 'btn btn-default active' : 'btn btn-default'} onClick={() => this.handleNavTabs('tab2')} href="#tab2" data-toggle="tab">
              <span className="glyphicon glyphicon-heart" aria-hidden="true" />
              <div className="hidden-xs">Favorites</div>
            </button>
          </div>
          <div className="btn-group" role="group">
            <button id="following" className={buttonCliked === 'tab3' ? 'btn btn-default active' : 'btn btn-default'} onClick={() => this.handleNavTabs('tab3')} href="#tab3" data-toggle="tab">
              <span className="glyphicon glyphicon-user" aria-hidden="true" />
              <div className="hidden-xs">Following</div>
            </button>
          </div>
        </div>

        <div >
          <div className="tab-content">
            { buttonCliked === 'tab1' ?
              <div id="tab1">
                <h3>This is tab 1</h3>
                <h3>This is tab 1</h3>
                <h3>This is tab 1</h3>
                <h3>This is tab 1</h3>
                <h3>This is tab 1</h3>
                <h3>This is tab 1</h3>
              </div>
            : null }
            { buttonCliked === 'tab2' ?
              <div id="tab2">
                <h3>This is tab 2</h3>
                <h3>This is tab 2</h3>
                <h3>This is tab 2</h3>
                <h3>This is tab 2</h3>
                <h3>This is tab 2</h3>
                <h3>This is tab 2</h3>
              </div>
            : null }
            { buttonCliked === 'tab3' ?
              <div id="tab1">
                <h3>This is tab 3</h3>
                <h3>This is tab 3</h3>
                <h3>This is tab 3</h3>
                <h3>This is tab 3</h3>
                <h3>This is tab 3</h3>
                <h3>This is tab 3</h3>
              </div>
            : null }
          </div>
        </div>

      </div>

    );
  }

}

export default ProfileComponent;
