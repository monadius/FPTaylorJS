import { default_config } from './default_config';

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
    label: 'Compute ULP error (experimental)',
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
    values: ['real', 'float16', 'float32', 'float64', 'float128']
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
    max: 1,
    step: 1e-3
  },
  'opt-f-abs-tol': {
    type: 'float',
    min: 0,
    max: 1,
    step: 1e-3
  },
  'opt-x-rel-tol': {
    type: 'float',
    min: 0,
    max: 1,
    step: 1e-3
  },
  'opt-x-abs-tol': {
    type: 'float',
    min: 0,
    max: 1,
    step: 1e-3
  },
  'opt-max-iters': {
    type: 'int',
    min: 0,
    max: 1e7
  },
  'opt-timeout': {
    type: 'int',
    min: 0,
    max: 1e6
  },
  'develop': {
    label: 'Use experimental features',
    type: 'bool'
  }
};

export function parseConfig(cfg) {
  const options = {};
  for (let line of cfg.split('\n')) {
    line = line.trim();
    if (!line.includes('=') || line.startsWith('#')) continue;
    const xs = line.split('=');
    const param = xs[0].trim();
    let value = xs.slice(1).join('=').trim();
    if (typeof optionInfo[param] !== 'undefined') {
      switch (optionInfo[param].type) {
        case 'bool': value = (value === 'true' ? true : value === 'false' ? false : undefined); break;
        case 'int': value = isNaN(value) ? undefined : Math.round(value); break;
        case 'float': value = isNaN(value) ? undefined : +value; break;
        default: break;
      }
    }
    if (typeof value !== 'undefined') {
      options[param] = value;
    }
  }
  return options;
}

export const defaultValues = Object.freeze(parseConfig(default_config));

export function optionsToString(options, keepDefault = false) {
  const result = [];
  for (const name in options) {
    const value = options[name];
    if (!keepDefault && defaultValues[name] === value) {
      continue;
    }
    result.push(`${name} = ${value}`);
  }
  return result.join('\n');
}

export const optionGroups = [
  {
    title: 'General options',
    initShow: true,
    options: [
      'abs-error',
      'rel-error',
      'ulp-error',
      'fp-power2-model',
      'find-bounds'
    ]
  },
  {
    title: 'Output options',
    initShow: true,
    options: [
      'debug',
      'verbosity',
      'print-precision'
    ]
  },
  {
    title: 'Input options',
    initShow: false,
    options: [
      'default-var-type',
      'default-rnd'
    ]
  },
  {
    title: 'Optimization options',
    initShow: false,
    options: [
      'opt-exact',
      'opt-approx',
      'opt-max-iters',
      'opt-f-rel-tol',
      'opt-f-abs-tol',
      'opt-x-rel-tol',
      'opt-x-abs-tol',
      'rel-error-threshold'
    ]
  },
  {
    title: 'Advanced options',
    initShow: false,
    options: [
      'intermediate-opt',
      'const-approx-real-vars',
      'unique-indices',
      'develop',
      'print-hex-floats',
      'print-opt-lower-bounds',
    ]
  }
];