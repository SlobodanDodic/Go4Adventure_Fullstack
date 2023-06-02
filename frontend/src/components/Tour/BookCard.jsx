import { createStyles, Card, Text, Group, Avatar, Button, Divider, SimpleGrid } from "@mantine/core";
import { IconBellRingingFilled, IconThumbUpFilled } from "@tabler/icons-react";

export function BookCard({ data }) {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      cols={2}
      spacing="lg"
      verticalSpacing="lg"
      m={10}
      breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
    >
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          <Avatar src={data.coverImg} alt={data.title} radius="xl" size="xl" m={10} />
          <div className={classes.body}>
            <Text transform="uppercase" weight={800} size="xs" color="#0b4668">
              {data.title}
            </Text>
            <Divider
              my="xs"
              labelPosition="center"
              label={
                <>
                  <IconBellRingingFilled size={13} style={{ color: "#fdb500" }} />
                  <Text weight={800} size="xs" color="#0b4668" ml={5}>
                    {/* {data.date.map((item) => ()} */}
                    {data.date}
                  </Text>
                </>
              }
            />
            <Button
              w="100%"
              fw="bold"
              rightIcon={<IconThumbUpFilled size="1.5rem" style={{ marginBottom: "5px" }} />}
              style={{ backgroundColor: "#0b4668", borderColor: "#0b4668" }}
            >
              Book now
            </Button>
          </div>
        </Group>
      </Card>
      <Card>
        <Text transform="uppercase" weight={800} size="md" ta="center" color="#0b4668">
          More dates will soon be available! Stay tuned...
        </Text>
      </Card>
    </SimpleGrid>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.white,
    marginBottom: "30px",
  },

  title: {
    fontWeight: 700,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
    textAlign: "center",
  },
}));
