import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, Table, Group, Text, ActionIcon, ScrollArea } from "@mantine/core";
import { IconTrashXFilled, IconEye } from "@tabler/icons-react";
import { toursData } from "./toursData";

export function ToursTable() {
  const { role } = useContext(AuthContext);

  const rows = toursData.map((item, i) => (
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
          <ActionIcon>
            <Link to={`${item.title}`} state={{ data: item }} style={{ color: "green" }}>
              <IconEye size="1rem" stroke={1.5} />
            </Link>
          </ActionIcon>
        </Group>
      </td>
      <td>
        <Group spacing={0} position="center">
          <ActionIcon>
            <Link to={`${item.title}`} state={{ data: item }} style={{ color: "darkred" }}>
              <IconTrashXFilled size="1rem" stroke={1.5} />
            </Link>
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
            {role === "admin" ? (
              <th style={{ textAlign: "center" }}>View/Edit</th>
            ) : (
              <th style={{ textAlign: "center" }}>View</th>
            )}
            <th style={{ textAlign: "center" }}>Delete</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
