import Unit from "./Unit";


export const JoystickPadPosition = (X, Y) => {
  const x = Math.abs(X) > Math.abs(Y) ? Unit(X) : 0;
  const y = x === 0 ? Unit(Y) : 0;
  const size = 20;
  const position = {x: 0, y: 0};
  if (x === 0) position.y = size * y;
  else if (y === 0) position.x = size * x;
  return position;
};
