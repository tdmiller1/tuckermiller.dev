import React from "react";

import MDEditor from "@uiw/react-md-editor";

const MarkdownProject = () => {
  const [value, setValue] = React.useState(`# This is a markdown sheet
## To the Right is a preview

## Below is the out put value

I used the npm package: [@uiw/react-md-editor](https://www.npmjs.com/package/@uiw/react-md-editor)`);

  console.log(value);
  return (
    <div className="container">
      <MDEditor value={value} onChange={setValue} />
      <div className="container">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default MarkdownProject;
