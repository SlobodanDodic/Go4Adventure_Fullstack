import { useState } from "react";
import { createStyles, UnstyledButton, Menu, Group, SimpleGrid } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export function GroupPicker({ groups, group, category, subcategory, setGroup, setCategory, setSubcategory }) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  return (
    <SimpleGrid
      cols={3}
      spacing="lg"
      mt="md"
      maw="1200px"
      breakpoints={[
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "sm", cols: 2, spacing: "sm" },
        { maxWidth: "xs", cols: 1, spacing: "sm" },
      ]}
    >
      <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" withinPortal>
        <Menu.Target>
          <UnstyledButton className={classes.control}>
            <Group>
              {group.image}
              <span className={classes.label}>{group.name}</span>
            </Group>
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown w="auto">
          {groups.map((item) => (
            <Menu.Item
              icon={item.image}
              onClick={() => {
                setGroup(item);
                setCategory(item.categories[0]);
                setSubcategory(item.categories[0].subcategories[0]);
              }}
              key={item.name}
              fz="xs"
            >
              {item.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" withinPortal>
        <Menu.Target>
          <UnstyledButton className={classes.control}>
            <Group>
              <span className={classes.label}>{category.name}</span>
            </Group>
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown w="auto">
          {group.categories.map((it) => (
            <Menu.Item
              key={it.name}
              fz="xs"
              onClick={() => {
                setCategory(it);
                setSubcategory(it.subcategories[0]);
              }}
            >
              {it.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" withinPortal>
        <Menu.Target>
          <UnstyledButton className={classes.control}>
            <Group>
              <span className={classes.label}>{subcategory.name}</span>
            </Group>
            <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown w="auto">
          {category.subcategories.map((it) => (
            <Menu.Item
              key={it.name}
              fz="xs"
              onClick={() => {
                setSubcategory(it);
              }}
            >
              {it.name}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </SimpleGrid>
  );
}

const useStyles = createStyles(({ opened }) => ({
  control: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid lightgray",
    transition: "background-color 150ms ease",
    "&:hover": "lightgray",
  },
  label: { fontSize: "0.75rem" },
  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));
