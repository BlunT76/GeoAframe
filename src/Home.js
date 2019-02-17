import React, { Component } from 'react';
import App from './App';
import BtnMenu from './components/BtnMenu';
import Menu from './components/Menu';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showApp: false,
      showMenu: true,
      showBtnMenu: false,
      dataMenu: null,
    };
  }

  retrieveDataMenu = (elm) => {
    const { showApp, showMenu, showBtnMenu } = this.state;

    const data = {
      innoside: elm[0],
      overpass: elm[1],
      around: Number(elm[2]),
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
        )}

        {showMenu && (
          <Menu handleDataMenu={this.retrieveDataMenu} dataMenu={dataMenu} />
        )}

        {showBtnMenu && (
          <BtnMenu handleSubmit={() => this.handleSubmit()} />
        )}
      </div>
    );
  }
}

export default Home;
