export default {
  BallPosition: (open) => ({
    position: "absolute",
    bottom: open ? "4em" : "1em",
    right: "50%",
    userSelect: "none",
    transition: `bottom 150ms ${open ? 0 : 300}ms`,
  }),
  BallBody: {
    opacity: 1,
    transition: "opacity 200ms, transform 200ms ease-out 200ms",
    height: 64,
    width: 64,
    position: "relative",
  },
  BallBodyOpen: {
    opacity: 0.4,
    transition: "opacity 200ms 100ms, transform 200ms ease-out",
    transform: "rotate(-450deg) scale(2)",
  },
  BallCommon: (open) => ({
    transition: `transform 200ms ${open ? "200ms" : ""}`,
    position: "absolute",
  }),
  BallTop: (open) => ({
    transition: `transform 200ms ${open ? "200ms" : ""}`,
    position: "absolute",
    transformOrigin: "bottom left",
    transform: `translateY(${open ? -10 : 0}px) rotate(${open ? "-45deg" : 0})`,
  }),
  BallBottom: (open, height) => ({
    transition: `transform 200ms ${open ? "200ms" : ""}`,
    position: "absolute",
    top: height / 2,
    transformOrigin: "top left",
    transform: `translateY(${open ? 10 : 0}px) rotate(${open ? "45deg" : 0})`,
  }),
};
