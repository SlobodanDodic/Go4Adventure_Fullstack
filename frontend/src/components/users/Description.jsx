import { createStyles, Paper, Stepper, rem } from "@mantine/core";
import { IconCategory, IconUsersGroup, IconHttpOptions } from "@tabler/icons-react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

export function Description({ data }) {
  const { classes } = useStyles();

  const richText = JSON.parse(data?.editorText);

  // const richTextType = richText?.filter((section) => {
  //   return section.type === "blockquote";
  // });

  // const richTextType = richText?.filter((value) => value.type === "blockquote");
  // console.log(richText?.filter((section) => section.type === "blockquote"));
  // console.log(richTextType[0]?.content[0]?.content[0]?.text);

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
      content: richText,
    },
  });

  console.log(richText);

  return (
    <Paper withBorder radius="md" m={10} className={classes.card}>
      <Stepper active={3} size="xs" breakpoint="sm">
        <Stepper.Step
          // description="Group"
          label={data?.group}
          completedIcon={<IconUsersGroup size="1rem" />}
          color="black"
        />
        <Stepper.Step
          // description="Category"
          label={data?.category}
          color="blue"
          completedIcon={<IconCategory size="1rem" />}
        />
        <Stepper.Step
          // description="Subcategory"
          label={data?.subcategory}
          color="yellow"
          completedIcon={<IconHttpOptions size="1rem" />}
        />
      </Stepper>

      {/* <Accordion variant="separated" my={16}>
        {richTextType?.map((section, i) => (
          <Accordion.Item value={section?.content[0]?.content[0]?.text} key={i}>
            <Accordion.Control>{section?.content[0]?.content[0]?.text}</Accordion.Control>
            <Accordion.Panel>
              <RichTextEditor editor={editor} maw={1200} my={16}>
                <RichTextEditor.Content />
              </RichTextEditor>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion> */}

      <RichTextEditor editor={editor} maw={1200} my={16}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Paper>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "default",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.sm,
    paddingLeft: `calc(${theme.spacing.sm} * 2)`,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.pink[6], theme.colors.orange[6]),
    },
  },

  control: {
    fontSize: "0.8rem",
    fontStyle: "italic",
  },

  item: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.lg,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    fontSize: "0.75rem",
    textAlign: "justify",
  },
}));
