import { createStyles, Paper, Text, ThemeIcon, rem } from "@mantine/core";
import { IconInfoSquareRounded } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    marginTop: "20px",
    overflow: "hidden",
    padding: theme.spacing.xl,
    paddingLeft: `calc(${theme.spacing.xl} * 2)`,

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: rem(6),
      backgroundImage: theme.fn.linearGradient(0, theme.colors.blue[6], theme.colors.blue[9]),
    },
  },
}));

export function HeaderInfo({ data }) {
  const { title, text } = data;
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.card}>
      <ThemeIcon size="xl" radius="md" variant="gradient" gradient={{ deg: 0, from: "blue", to: "black" }}>
        <IconInfoSquareRounded size={rem(28)} stroke={1.5} />
      </ThemeIcon>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {text}
      </Text>
    </Paper>
  );
}
