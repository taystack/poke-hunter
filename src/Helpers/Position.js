import Unit from "./Unit";


export const JoystickPadPosition = (X, Y) => {
  const size = 20;
  const x = Unit(X) * size;
  const y = Unit(Y) * size;
  // const x = Math.abs(X) > Math.abs(Y) ? Unit(X) : 0;
  // const y = x === 0 ? Unit(Y) : 0;
  const position = {x, y};
  // if (x === 0) position.y = size * y;
  // else if (y === 0) position.x = size * x;
  return position;
};
