import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, Table, Group, Text, ActionIcon, ScrollArea } from "@mantine/core";
import { IconPencil, IconTrash, IconEye } from "@tabler/icons-react";
import { toursData } from "./toursData";

export function ToursTable() {
  const { role } = useContext(AuthContext);
  // const navigate = useNavigate();

  // onClick={() => navigate(`/tours/${item.title}`)}

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
        {role === "admin" ? (
          <Group spacing={0} position="center">
            <ActionIcon color="green.9">
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon color="red.9">
              <IconTrash size="1rem" stroke={1.5} />
            </ActionIcon>
          </Group>
        ) : (
          <Group spacing={0} position="center">
            <ActionIcon color="blue.9">
              <Link to={`/tours/${item.title}`} state={{ data: item }}>
                <IconEye size="1rem" stroke={1.5} />
              </Link>
            </ActionIcon>
          </Group>
        )}
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
