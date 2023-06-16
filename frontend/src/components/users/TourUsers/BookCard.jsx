import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { createStyles, Card, Text, Group, Avatar, Button, SimpleGrid, Stack } from "@mantine/core";
import dayjs from "dayjs";
import { IconThumbUpFilled } from "@tabler/icons-react";

export function BookCard({ data }) {
  const { instance, loggedUser } = useContext(AuthContext);
  const { classes } = useStyles();

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${loggedUser?.profile?.logo}`);
  };

  const dates = JSON.parse(data?.dateRange);
  const firstDate = dates[0];
  const secondDate = dates[1];

  return (
    <SimpleGrid
      cols={2}
      spacing="lg"
      verticalSpacing="lg"
      mx={10}
      my={20}
      breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
    >
      <Card withBorder radius="md" p={0} className={classes.card}>
        <Group noWrap spacing={0}>
          <Avatar
            src={`${process.env.REACT_APP_SERVER}/gallery/${loggedUser?.profile?.logo}`}
            alt={data?.title}
            radius="xl"
            size="xl"
            m={10}
          />
          <div className={classes.body}>
            <Text transform="uppercase" weight={800} size="xs" color="#0b4668">
              {data?.title}
            </Text>
            <Stack align="center" spacing="xs">
              <Text weight={800} size="11px" color="#f17f3f" m={5} className={classes.date}>
                {dayjs(firstDate).format("DD.MM.YYYY")} - {dayjs(secondDate).format("DD.MM.YYYY")}
              </Text>
            </Stack>
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

  date: {
    borderTop: "1px solid",
    fontStyle: "italic",
  },
}));
