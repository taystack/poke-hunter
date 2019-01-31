import React from "react";
import Joystick from "./Joystick";
import MenuBall from "./MenuBall";
import Menu from "./Menu";
import Game from "../Game/Game";
import { JoystickPadPosition } from "../Helpers/Position";
import Styles from "./MapStyles";


class Controls extends React.Component {
  static MAP_SIZE = 512;

  constructor(props) {
    super(props);

    this.canvas = React.createRef();

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

  componentDidMount() {
    const context = this.canvas.current.getContext("2d");
    this.Game = new Game(context, Controls.MAP_SIZE);
    this.forceUpdate();
  }

  getDirection(toX, toY) {
    const x = this.state.x - toX;
    const y = this.state.y - toY;
    return JoystickPadPosition(-x, y);
  }

  handleControlStart(event) {
    event.stopPropagation();
    event.preventDefault();
    const e = event.touches ? event.touches[0] : event;
    if (this.state.menuOpen) return;
    this.setState({
      controlling: true,
      x: e.pageX,
      y: e.pageY,
      toX: 0,
      toY: 0,
    });
  }

  handleControlMove(event) {
    event.stopPropagation();
    event.preventDefault();
    const e = event.touches ? event.touches[0] : event;
    if (this.state.controlling) {
      const { x, y } = this.getDirection(e.pageX, e.pageY);
      this.setState({ toX: x, toY: y }, () => {
        this.Game.moveX = this.state.toX;
        this.Game.moveY = this.state.toY;
      });
    }
  }

  handleControlEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      controlling: false,
      toX: 0,
      toY: 0,
    }, () => {
      this.Game.moveX = 0;
      this.Game.moveY = 0;
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
        <canvas
          width="512" height="512"
          style={Styles.Canvas}
          ref={this.canvas}
          id="game-entry"
        />
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
