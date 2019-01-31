import React from "react";
import Joystick from "./Joystick";
import MenuBall from "./MenuBall";
import Menu from "./Menu";
import { JoystickPadPosition } from "../Helpers/Position";


class Controls extends React.Component {
  static propTypes = {}

  constructor(props) {
    super(props);

    this.state = {
      controlling: false,
      x: 0,
      y: 0,
      toX: 0,
      toY: 0,
      menuOpen: false,
    };

    [
      "handleControlMove",
      "handleControlStart",
      "handleControlEnd",
      "handleMenuClick",
    ].forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getDirection(toX, toY) {
    const x = this.state.x - toX;
    const y = this.state.y - toY;
    return JoystickPadPosition(-x, y);
  }

  handleControlStart(event) {
    this.setState({
      controlling: true,
      x: event.pageX,
      y: event.pageY,
      toX: 0,
      toY: 0,
    });
  }

  handleControlMove(event) {
    if (this.state.controlling) {
      const { x, y } = this.getDirection(event.pageX, event.pageY);
      this.setState({ toX: x, toY: y });
    }
  }

  handleControlEnd(event) {
    if (!this.state.controlling) return;
    this.setState({
      controlling: false,
      toX: 0,
      toY: 0,
    });
  }

  handleMenuClick(event) {
    event.stopPropagation();
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { x, toX, y, toY, controlling, menuOpen } = this.state;
    return (
      <div id="controls"
        style={{height: "100vh", width: "100vw"}}
        onMouseDown={this.handleControlStart}
        onMouseLeave={this.handleControlEnd}
        onMouseMove={this.handleControlMove}
        onMouseUp={this.handleControlEnd}
        onTouchCancel={this.handleControlEnd}
        onTouchEnd={this.handleControlEnd}
        onTouchMove={this.handleControlMove}
        onTouchStart={this.handleControlStart}
      >
        <Joystick
          x={x}
          y={y}
          toX={toX}
          toY={toY}
          show={controlling}
        />
        <MenuBall
          onMenuClick={this.handleMenuClick}
          open={menuOpen}
        />
        <Menu open={menuOpen} />
      </div>
    );
  }
}

export default Controls;
