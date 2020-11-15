import React from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';

const Editor = ({className, style, value, onChange, mode, theme = 'default'}) => {
  return (
    <CodeMirror
      className={className}
      style={style}
      value={value}
      onBeforeChange={onChange}
      options={{
        mode: mode,
        theme: theme,
        lineNumbers: true,
        tabSize: 2
      }}
// onChange={(editor, data, value) => {
// }}
    />
    // <Form.Control id={this.props.id} as="textarea"
    // value={this.state.value}
    // onChange={this.onChange}
    // className="text-monospace h-100 w-100"
    // spellCheck={false}
    // style={{resize: "none", border: "none", outline: "none", fontSize: "87%"}}/>
  );
}

export default Editor;