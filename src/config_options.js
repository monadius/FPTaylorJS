import { default_config } from './default_config';

export function parseConfig(cfg) {
  const options = {};
  for (let line of cfg.split('\n')) {
    line = line.trim();
    if (!line.includes('=') || line.startsWith('#')) continue;
    const xs = line.split('=');
    const param = xs[0].trim();
    const value = xs.slice(1).join('=').trim();
    options[param] = value;
  }
  return options;
}

export const defaultValues = Object.freeze(parseConfig(default_config));

export const optionInfo = {
  'debug': {
    label: 'Print debug information',
    type: 'bool'
  },
  'verbosity': {
    label: 'Output verbosity',
    type: 'int',
    values: [0, 1, 2, 3],
    valueNames: ['Main results', 'Important results', 'Info', 'All']
  },
  'print-precision': {
    label: 'Precision of results',
    type: 'int',
    min: 1,
    max: 20
  },
  'print-opt-lower-bounds': {
    label: 'Print lower bounds of models',
    type: 'bool'
  },
  'print-hex-floats': {
    label: 'Print error bounds as hexadecimal numbers',
    type: 'bool'
  },
  'abs-error': {
    label: 'Compute absolute error',
    type: 'bool'
  },
  'rel-error': {
    label: 'Compute relative error',
    type: 'bool'
  },
  'ulp-error': {
    label: 'Compute ULP error',
    type: 'bool'
  },
  'rel-error-threshold': {
    type: 'float',
    min: 0,
    max: 1e5,
    step: 1e-5
  },
  'default-var-type': {
    label: 'Default type of variables',
    type: 'string',
    values: ['float16', 'float32', 'float64', 'float128']
  },
  'default-rnd': {
    label: 'Default type of rounding',
    type: 'string',
    values: ['rnd16', 'rnd32', 'rnd64', 'rnd128', 'rnd32_down', 'rnd32_up', 'rnd64_down', 'rnd64_up']
  },
  'find-bounds': {
    label: 'Compute expression bounds',
    type: 'bool'
  },
  'uncertainty': {
    label: 'Activate uncertainty specifications',
    type: 'bool'
  },
  'fail-on-exception': {
    type: 'bool'
  },
  'maxima-simplification': {
    type: 'bool'
  },
  'fp-power2-model': {
    label: 'Improved rounding model',
    type: 'bool'
  },
  'const-approx-real-vars': {
    type: 'bool'
  },
  'intermediate-opt': {
    label: 'Perform optimizations when constructing models',
    type: 'bool'
  },
  'unique-indices': {
    type: 'bool'
  },
  'proof-record': {
    type: 'bool'
  },
  'proof-dir': {
    type: 'string'
  },
  'log-base-dir': {
    type: 'string'
  },
  'log-append-date': {
    type: 'string',
    values: ['start', 'end', 'none']
  },
  'export-options': {
    type: 'string'
  },
  'tmp-base-dir': {
    type: 'string'
  },
  'tmp-date': {
    type: 'bool'
  },
  'export-error-bounds': {
    type: 'string'
  },
  'export-error-bounds-data': {
    type: 'string'
  },
  'opt': {
    type: 'string',
    values: ['bb-eval', 'bb', 'z3', 'nlopt', 'gelpia']
  },
  'opt-approx': {
    label: 'Solve approximate optimization problems',
    type: 'bool'
  },
  'opt-exact': {
    label: 'Solve exact optimization problems',
    type: 'bool'
  },
  'opt-f-rel-tol': {
    type: 'float',
    min: 0,
    max: 1e5,
    step: 1e-8
  },
  'opt-f-abs-tol': {
    type: 'float',
    min: 0,
    max: 1e5,
    step: 1e-8
  },
  'opt-x-rel-tol': {
    type: 'float',
    min: 0,
    max: 1e5,
    step: 1e-8
  },
  'opt-x-abs-tol': {
    type: 'float',
    min: 0,
    max: 1e5,
    step: 1e-8
  },
  'opt-max-iters': {
    type: 'int',
    min: 0,
    max: 5e7
  },
  'opt-timeout': {
    type: 'int',
    min: 0,
    max: 1e6
  },
  'develop': {
    type: 'bool'
  }
};