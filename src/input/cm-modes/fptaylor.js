import * as cm from 'codemirror';
import 'codemirror/addon/mode/simple'

const keywords = [
  'in', 'real', 'float16', 'float32', 'float64', 'float128',
  'rnd', 'rnd16', 'rnd32', 'rnd64', 'rnd128'
]

cm.defineSimpleMode("fptaylor", {
  start: [
    {regex: /\s*\/\/.*/, 
     token: "comment"},
    {regex: /(?:Constants|Variables|Definitions|Constraints|Expressions)\b/,
     token: "def"},
    {regex: new RegExp(`(?:${keywords.join('|')})\\b`),
      token: "keyword"},
    {regex: /[-+/*=<>]+/, 
     token: "operator"},
    {regex: /[a-z]\w*\b/i,
     token: "variable"},
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    // {regex: /[\[\]()]+/, 
    //   token: "bracket"},
  ]
});