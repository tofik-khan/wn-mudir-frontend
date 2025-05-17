import { useRef } from "react";
import JoditEditor from "jodit-react";

export const Editor = ({
  placeholder,
  content,
  setContent,
}: {
  placeholder?: string;
  content: string;
  setContent: any;
}) => {
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
      onBlur={(newContent) => setContent(newContent)}
    />
  );
};
