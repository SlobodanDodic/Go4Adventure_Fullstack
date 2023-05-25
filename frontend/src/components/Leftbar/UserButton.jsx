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

export function UserButton({ image, name, email, icon, ...others }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group spacing="xs" pt="md">
        <Indicator inline processing offset={2} size={8} color="dark-blue">
          <Avatar src={image} variant="outline" radius="0.75rem 0rem" color="dark-blue" />
        </Indicator>

        <div style={{ flex: 1 }}>
          <Flex align="baseline">
            <Text size="sm" weight={500} mr="md" tt="capitalize">
              {name}
            </Text>
            {icon || <IconChevronRight size="0.75rem" stroke={1.5} />}
          </Flex>

          <Text color="dimmed" size="xs" lh="1">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
