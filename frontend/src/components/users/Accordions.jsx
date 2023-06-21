import { Accordion } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

export default function Accordions({ section, i }) {
  const headline = section[0].content[0].content[0].text;
  const sliceContent = section.slice(1);

  const editor = useEditor({
    extensions: [
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextStyle,
      Color,
      Image,
    ],
    editable: false,
    content: {
      type: "doc",
      content: sliceContent,
    },
  });

  return (
    <Accordion.Item value={headline} key={i}>
      <Accordion.Control>{headline}</Accordion.Control>
      <Accordion.Panel>
        <RichTextEditor editor={editor} maw={1200} my={16}>
          <RichTextEditor.Content />
        </RichTextEditor>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
