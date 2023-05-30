import { Container, Title, Accordion, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    fontSize: "1rem",
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

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.";

export function AccordionText() {
  const { classes } = useStyles();
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Itinerary
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control className={classes.control}>Day 1</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control className={classes.control}>Day 2</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control className={classes.control}>Day 3</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control className={classes.control}>Day 4</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control className={classes.control}>Day 5</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
