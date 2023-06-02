import { Container, Title, Accordion, createStyles, rem, Text, Avatar, Group } from "@mantine/core";
import logo from "../../assets/logo.png";

export function AccordionText({ data }) {
  const { classes } = useStyles();

  return (
    <Container size="sm" m={10} className={classes.wrapper}>
      <Title align="center" className={classes.title}>
        Organization by days:
      </Title>

      <Accordion variant="separated">
        {data?.days?.map((day) => (
          <Accordion.Item value={day.id} key={day.id}>
            <Accordion.Control>
              <Group noWrap>
                <Avatar src={logo} radius="xl" size="md" />
                <div>
                  <Text size="sm">Day {day.id}</Text>
                  <Text size="xs" color="dimmed" weight={400}>
                    {day.description}
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="xs">{day.content}</Text>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: "2rem 0",
    maxWidth: "800px",
    // minHeight: 650,
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
