import { useRef } from "react";
import JoditEditor from "jodit-react";

export const Editor = ({ placeholder = null, content, setContent }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder ?? "Start typing...",
    disablePlugins: [
      "video",
      "file",
      "symbols",
      "about",
      "image",
      "preview",
      "line-height",
      "class-span",
      "clean-html",
      "source",
    ],
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {
        console.log(newContent);
      }}
    />
  );
};
