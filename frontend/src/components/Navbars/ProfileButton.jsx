import { UnstyledButton, Group, Avatar, Text, createStyles, Flex, Indicator } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const useStyles = createStyles(() => ({
  user: {
    display: "block",
    width: "100%",
    paddingLeft: "1rem",
    overflow: "hidden",
  },
}));

export function ProfileButton({ image, name, email, icon, ...others }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group spacing="xs" pt="md">
        <Indicator inline processing offset={2} size={8} color="dark-blue">
          <Avatar
            src={image}
            variant="outline"
            radius="0.75rem 0rem"
            color="dark-blue"
            size={64}
            style={{ border: "2px solid #fdb614" }}
          />
        </Indicator>

        <div style={{ flex: 1 }}>
          <Flex align="center">
            <Text size="sm" weight={500} mr="md" tt="capitalize" lh={1.15} my={5}>
              {name}
            </Text>
            {icon || <IconChevronRight size="1rem" stroke={3} />}
          </Flex>

          <Text color="dimmed" size="xs" lh="1" weight={600}>
            {email.split("@")[0]}@
          </Text>
          <Text color="dimmed" size="xs" lh="1" weight={600}>
            {email.split("@")[1]}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
