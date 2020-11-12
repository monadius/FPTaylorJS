import * as cm from 'codemirror';
import 'codemirror/addon/mode/simple'

cm.defineSimpleMode("fptaylor-config", {
  start: [
    {regex: /\s*#.*/, sol: true, token: "comment"},
    {regex: /\s*([-\w]+)(\s*=\s*)(.*)/, sol: true,
     token: ["keyword", null, "atom"]}
  ]
});