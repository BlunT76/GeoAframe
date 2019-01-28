import React, { Component } from 'react';
import App from './App';
import BtnMenu from './components/BtnMenu';
import Menu from './components/Menu';

class Home extends Component {
  constructor(props) {
    super(props);
    this.HomeDiv = React.createRef();

    this.state = {
      showApp: false,
      showMenu: true,
      showBtnMenu: false,
      dataMenu: [],
    };
  }

  retrieveDataMenu = (elm) => {
    const { showApp, showMenu, showBtnMenu } = this.state;

    const data = {
      innoside: elm[0],
      overpass: elm[1],
      around: elm[2],
      perso: elm[3],
    };

    this.setState({
      dataMenu: data,
      showApp: !showApp,
      showMenu: !showMenu,
      showBtnMenu: !showBtnMenu,
    });
  }

  handleSubmit = () => {
    const { showApp, showMenu, showBtnMenu } = this.state;
    // event.preventDefault();
    this.setState({
      showApp: !showApp,
      showMenu: !showMenu,
      showBtnMenu: !showBtnMenu,
    });
  }

  render() {
    const {
      showApp,
      showMenu,
      showBtnMenu,
      dataMenu,
    } = this.state;

    return (
      <div className="home">
        {showApp && (
        <App dataMenu={dataMenu} />
        )
        }
        {showMenu && (
          <Menu handleDataMenu={this.retrieveDataMenu} dataMenu={dataMenu} />
        )}
        {showBtnMenu && (
          <button type="button" className="btn btn-light BtnMenu" onClick={this.handleSubmit}>
            <svg size="5x" aria-hidden="true" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
}

export default Home;
