import { createStyles, Paper, Stepper, rem } from "@mantine/core";
import { IconCategory, IconUsersGroup, IconHttpOptions } from "@tabler/icons-react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

export function Description({ data }) {
  const { classes } = useStyles();

  const editor = useEditor({
    extensions: [Link, TextAlign.configure({ types: ["heading", "paragraph"] }), StarterKit],
    editable: false,
    content: data?.editorText,
  });

  return (
    <Paper withBorder radius="md" m={10} className={classes.card}>
      <Stepper active={3} size="xs" breakpoint="sm">
        <Stepper.Step
          description={data?.group}
          label="group"
          completedIcon={<IconUsersGroup size="1rem" />}
          color="black"
        />
        <Stepper.Step
          description={data?.category}
          label="category"
          color="blue"
          completedIcon={<IconCategory size="1rem" />}
        />
        <Stepper.Step
          description={data?.subcategory}
          label="subcategory"
          color="yellow"
          completedIcon={<IconHttpOptions size="1rem" />}
        />
      </Stepper>
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
}));
