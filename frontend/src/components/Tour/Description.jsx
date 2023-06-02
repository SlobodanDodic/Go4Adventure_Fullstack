import { createStyles, Paper, Text, rem, Stepper } from "@mantine/core";
import { IconCategory, IconUsersGroup } from "@tabler/icons-react";

export function Description({ data }) {
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" m={10} className={classes.card}>
      <Stepper active={3} size="xs" breakpoint="sm">
        <Stepper.Step
          description={data.group}
          label="group"
          completedIcon={<IconUsersGroup size="1rem" />}
          color="black"
        />
        <Stepper.Step
          description={data.category}
          label="category"
          color="blue"
          completedIcon={<IconCategory size="1rem" />}
        />
        <Stepper.Step description={data.subcategory} label="subcategory" color="yellow" />
      </Stepper>
      <Text size="xl" weight={600} mt="md">
        {data.subcategory}
      </Text>
      <Text size="xs" mt="sm" color="dimmed">
        {data.contentData}
      </Text>
    </Paper>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
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
