import * as cm from 'codemirror';
import 'codemirror/addon/mode/simple'

const keywords = [
  'IN', 'in', 'int', 'real', 
  'float16', 'float32', 'float64', 'float128',
  'rnd', 'no_rnd', 
  'rnd16_ne', 'rnd16', 'rnd16_0', 'rnd16_down', 'rnd16_up',
  'rnd32_ne', 'rnd32', 'rnd32_0', 'rnd32_down', 'rnd32_up',
  'rnd64_ne', 'rnd64', 'rnd64_0', 'rnd64_down', 'rnd64_up',
  'rnd128_ne', 'rnd128', 'rnd128_0', 'rnd128_down', 'rnd128_up',
]

const sections = [
  'Constants', 'constants', 'Variables', 'variables',
  'Definitions', 'definitions', 'Constraints', 'constraints',
  'Expressions', 'expressions',
];

const functions = [
  'inv', 'abs', 'fma', 'sqrt', 'min', 'max', 
  'exp', 'log', 'cos', 'sin', 'tan', 'cosh', 'sinh', 'tanh',
  'acos', 'asin', 'atan', 'atan2', 'arccos', 'arcsin', 'arctran',
  'acosh', 'asinh', 'atanh', 'arsinh', 'arcosh', 'artanh',
  'arcsinh', 'arccosh', 'arctanh', 'argsinh', 'argtanh',
];

cm.defineSimpleMode("fptaylor", {
  start: [
    {regex: /\s*\/\/.*/, 
     token: "comment"},
    {regex: new RegExp(`(?:${sections.join('|')})\\b`),
     token: "def"},
    {regex: new RegExp(`(?:${keywords.join('|')})\\b`),
     token: "keyword"},
    {regex: new RegExp(`(?:${functions.join('|')})\\b`),
     token: "builtin"},
    {regex: /(?:(?:0x[a-f\d]+(?:\.[a-f\d]*)?|\d+(?:\.\d*)?))(?:[ep][+-]?\d+)?[df]?/i,
     token: "number"},
    {regex: /[-+/*=<>]+/, 
     token: "operator"},
    {regex: /[a-z]\w*\b/i,
     token: "variable"},
    // {regex: /[\[\]()]+/, 
    //   token: "bracket"},
  ]
});