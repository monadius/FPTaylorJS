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

function sub2(x, y) {
  return (0.5 * x <= y && y <= 2.0 * x) || (2.0 * x <= y && y <= 0.5 * x) ? 0 : x - y;
}

function abs_err(t, x) {
  return x >= t  ? 1 :
         x <= -t ? -1 : 0;
}

function goldberg_ulp(prec, eMin, x) {
  if (x < 0) return -goldberg_ulp(prec, eMin, -x);
  if (x === 0 || isNaN(x) || !isFinite(x)) return x;
  let e = Math.max(Math.floor(Math.log2(x)) + 1, -1023);
  x *= 2 ** (-e);
  for (; x < 0.5; x *= 2, e -= 1);
  for (; x >= 1; x * 0.5, e += 1);
  return 2 ** (Math.max(e, eMin + 1) - prec);
}

const Func = {
  interval,
  floor_power2,
  sub2,
  abs_err,
  goldberg_ulp
};

export default Func;