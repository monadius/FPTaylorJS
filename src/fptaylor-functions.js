function interval(a, b) {
  return (a + b) / 2;
}

function floor_power2(x) {
  if (x < 0) return -floor_power2(-x);
  if (x === 0 || isNaN(x) || !isFinite(x)) return x;
  let e = Math.max(Math.floor(Math.log2(x)) + 1, -1023);
  x *= 2 ** (-e);
  for (; x < 0.5; x *= 2, e -= 1);
  for (; x >= 1; x *= 0.5, e += 1);
  return x === 0.5 ? 2 ** (e - 2) : 2 ** (e - 1);
}

const Func = {
  interval,
  floor_power2
};

export default Func;