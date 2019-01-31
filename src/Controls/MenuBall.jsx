import React from "react";
import PropTypes from "prop-types";
import BallTop from "../Images/BallTop.png";
import BallBottom from "../Images/BallBottom.png";
import Styles from "./MenuBallStyles";


export default class MenuBall extends React.Component {
  static propTypes = {
    onMenuClick: PropTypes.func.isRequired,
    open: PropTypes.bool,
  }

  render() {
    const { open } = this.props;
    let style = Styles.BallBody;
    if (open) {
      style = {
        ...style,
        ...Styles.BallBodyOpen,
      };
    };

    const topStyle = {
      ...Styles.BallCommon(open),
      ...Styles.BallTop(open),
    };
    const bottomStyle = {
      ...Styles.BallCommon(open),
      ...Styles.BallBottom(open, style.height),
    };
    return (
      <div
        style={Styles.BallPosition(open)}
      >
        <div
          onClick={this.props.onMenuClick}
          onTouchStart={this.props.onMenuClick}
          style={style}
        >
          <img src={BallTop} alt="menu" style={topStyle} />
          <img src={BallBottom} alt="menu" style={bottomStyle} />
        </div>
      </div>
    );
  }
}
