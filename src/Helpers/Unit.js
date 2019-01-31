const Unit = (num) => {
  const boundary = 1;
  const lock = 30;
  if (num === 0) { return 0; }
  else if (num > 0) {
    if (num - lock < 0) return Unit(0);
    else return boundary;
  }
  else if (num < 0) {
    if (num + lock > 0) return Unit(0);
    else return -boundary;
  }
};

export default Unit;
