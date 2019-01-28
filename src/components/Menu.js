import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.HomeDiv = React.createRef();

    this.state = {
      checkInnoside: false,
      checkOverpass: false,
      around: 300,
      checkPerso: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      checkInnoside, checkOverpass, around, checkPerso,
    } = this.state;
    const { handleDataMenu } = this.props;
    return (
      <div className="home">
        <div className="container-fluid home text-light pl-0 pr-0">
          <img src="./images/innoside.png" alt="logo innoside" width="30%" height="auto" className="m-3" />
          <hr style={{ backgroundColor: 'white' }} className="m-0" />
          <div className="container text-light">
            <h1 className="text-center purple">Description</h1>
            <p>Descriptionde l'application a ecrire</p>
            <hr style={{ backgroundColor: 'white' }} className="" />
            <h1 className="text-center purple">Choix des POI</h1>

            <form
              onSubmit={() => handleDataMenu([checkInnoside, checkOverpass, around, checkPerso])}
            >
              <div className="form-group form-check ">
                <input
                  checked={checkInnoside}
                  onChange={this.handleChange}
                  name="checkInnoside"
                  type="checkbox"
                  className="form-check-input"
                  id="checkInnoside"
                />
                <label className="form-check-label" htmlFor="checkInnoside">Poi Innoside</label>
              </div>

              <div className="form-inline mt-3">
                <div className="form-group form-check">
                  <input
                    checked={checkOverpass}
                    onChange={this.handleChange}
                    name="checkOverpass"
                    type="checkbox"
                    className="form-check-input"
                    id="checkOverpass"
                  />
                  <label className="form-check-label" htmlFor="checkOverpass">Poi autour de moi</label>
                </div>
                <div className="form-group">
                  <input
                    value={around}
                    onChange={this.handleChange}
                    name="around"
                    type="number"
                    className="form-control"
                    id="distMax"
                    placeholder="Distance max"
                  />
                  <label htmlFor="distMax">Distance maximum en mètres</label>
                </div>
              </div>

              <div className="form-group form-check mt-3">
                <input
                  checked={checkPerso}
                  onChange={this.handleChange}
                  name="checkPerso"
                  type="checkbox"
                  className="form-check-input"
                  id="checkPerso"
                  disabled
                />
                <label className="form-check-label" htmlFor="checkPerso">Poi personnalisé</label>
              </div>

              <button type="submit" className="btn btn-outline-light btn-lg btn-block">Lancer</button>
            </form>
            <hr style={{ backgroundColor: 'white' }} className="" />
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  handleDataMenu: PropTypes.func,
};

Menu.defaultProps = {
  handleDataMenu: () => {},
};
export default Menu;
