import React from "react";
import PropTypes from "prop-types";
import Styles from "./JoystickStyles";


export default class Joystick extends React.Component {
  static propTypes = {
    x: PropTypes.number,
    toX: PropTypes.number,
    y: PropTypes.number,
    toY: PropTypes.number,
    show: PropTypes.bool,
  }

  static defaultProps = {
    x: 0,
    toX: 0,
    y: 0,
    toY: 0,
    show: false,
  }

  static size = 50;

  get moving() {
    return this.props.toX !== 0 || this.props.toY !== 0;
  }

  get bodyStyle() {
    return {
      position: "fixed",
      height: "100vh",
      width: "100vw",
    };
  }

  get style() {
    const size = Joystick.size;
    const { x, y } = this.props;
    let styles = {
      ...Styles.JoystickBase(size),
      ...Styles.JoystickOrigin(x, y, size)
    };
    if (this.props.show) {
      styles = {
        ...styles,
        ...Styles.JoystickOriginShow,
      }
    }
    if (this.moving) {
      styles = {
        ...styles,
        ...Styles.JoystickOriginMoving,
      };
    }
    return styles;
  }

  get padStyle() {
    const { toX, toY, show } = this.props;
    let styles = {
      ...Styles.JoystickBase(Joystick.size),
      ...Styles.JoystickPad(toX, toY),
    };
    if (show) {
      styles = {
        ...styles,
        ...Styles.JoystickPadShow,
      }
    }
    if (this.moving) {
      styles = {
        ...styles,
        ...Styles.JoystickPadMoving,
      };
    }
    return styles;
  }

  render() {
    return (
      <div id="joystick" style={this.bodyStyle}>
        <div style={this.style}>
          <div style={this.padStyle}></div>
        </div>
      </div>
    );
  }
}
