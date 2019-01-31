export default {
  JoystickOverlay: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
  },
  JoystickBase: (size) => ({
    height: size,
    width: size,
    borderRadius: size,
    position: "absolute",
  }),
  JoystickOrigin: (x, y, size) => ({
    background: "transparent",
    transition: "background 150ms 100ms",
    transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
  }),
  JoystickOriginShow: {
    background: "rgba(0,0,0,0.2)",
    transition: "background 150ms",
  },
  JoystickOriginMoving: {
    background: "rgba(0,0,0,0.2)",
    transition: "background 150ms",
    boxShadow: "inset 0 0 5px 0 rgba(0,0,0,0.3)",
  },
  JoystickPad: (toX, toY) => ({
    background: "rgba(255,255,255,0)",
    position: "absolute",
    transform: `translate(${toX}px, ${-toY}px)`,
    transition: "transform 100ms, box-shadow 200ms 200ms, opacity 100ms",
    boxShadow: "0 0 2px 0 rgba(0,0,0,0)",
  }),
  JoystickPadShow: {
    background: "rgba(255,255,255,0.7)",
  },
  JoystickPadMoving: {
    transition: "transform 100ms, box-shadow 100ms, opacity 100ms",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.3)",
  },
};
