import { createRoot } from "react-dom/client";
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

function Add() {
  return (
    <MDXEditor
      markdown="# Hello world"
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
  );
}

const root = createRoot(document.body);
root.render(<Add />);
