import { Avatar, Table, Group, Text, ActionIcon, ScrollArea } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { data } from "./toursData";

export function ToursTable() {
  const rows = data.map((item, i) => (
    <tr key={i}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={item.coverImg} radius={30} />
          <Text fz="xs" fw="bold">
            {item.title}
          </Text>
        </Group>
      </td>

      <td>
        <Text fz="xs" fw="bold" c="gray.7">
          {item.date}
        </Text>
      </td>
      <td>
        <Text fz="xs" fw="bold" c="gray.7">
          {item.category}
        </Text>
      </td>
      <td>
        <Text fz="xs" fw="bold" c="gray.7">
          {item.subcategory}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="center">
          <ActionIcon color="green.9">
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red.9">
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" fontSize="xs" striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Tour Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
