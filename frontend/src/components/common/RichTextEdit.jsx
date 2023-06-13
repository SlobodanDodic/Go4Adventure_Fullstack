import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import { Button } from "@mantine/core";
import CarouselModal from "./CarouselModal";

export default function RichTextEdit({ data, setRichText }) {
  const [content, setContent] = useState(data?.editorText);
  const { role } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  const editor = useEditor({
    extensions: [
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      Image,
    ],
    onUpdate({ editor }) {
      setContent(editor.getJSON());
      setRichText(content?.content);
    },
    editable: role === "admin" ? true : false,
    content,
  });

  return (
    <RichTextEditor editor={editor} maw={1200} my={16}>
      {role === "admin" ? (
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <Button onClick={() => setOpened(true)} size="xs" bg="dark-blue">
            Add image
          </Button>
          <CarouselModal opened={opened} setOpened={setOpened} editor={editor} />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.ColorPicker
              colors={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
      ) : null}

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
