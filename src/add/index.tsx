import { createRoot } from "react-dom/client";
import React, { useRef } from "react";
import "@mdxeditor/editor/style.css";

// importing the editor and the plugin from their full paths
import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { listsPlugin } from "@mdxeditor/editor/plugins/lists";
import { quotePlugin } from "@mdxeditor/editor/plugins/quote";
import { codeBlockPlugin } from "@mdxeditor/editor/plugins/codeblock";
import { markdownShortcutPlugin } from "@mdxeditor/editor/plugins/markdown-shortcut";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { MDXEditorMethods } from "@mdxeditor/editor";

function Add() {
  const ref = useRef<MDXEditorMethods>(null);

  // When the user clicks ctrl+s, save the thought
  // use react hooks
  React.useEffect(() => {
    const saveThought = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        window.electronAPI.saveThought(ref.current?.getMarkdown());
      }
    };
    document.addEventListener("keydown", saveThought);
    return () => {
      document.removeEventListener("keydown", saveThought);
    };
  }, []);

  return (
    <>
      <MDXEditor
        ref={ref}
        markdown="Thought..."
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                {" "}
                <UndoRedo />
                <BoldItalicUnderlineToggles />
              </>
            ),
          }),
        ]}
      />
    </>
  );
}

const root = createRoot(document.body);
root.render(<Add />);
