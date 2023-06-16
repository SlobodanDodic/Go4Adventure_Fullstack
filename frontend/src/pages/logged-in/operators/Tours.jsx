import { useNavigate } from "react-router-dom";
import { Flex, NavLink, TextInput, ActionIcon, Divider, Container } from "@mantine/core";
import { IconTextPlus, IconSearch, IconArrowRight } from "@tabler/icons-react";
import AuthContext from "../../../context/AuthContext";
import { ToursTable } from "../../../components/operators/ToursTable";
import { useContext } from "react";

export default function Tours() {
  const { role, smallScreen } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container>
      <Flex direction={smallScreen ? "column-reverse" : "row"} align="center">
        <TextInput
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="xs"
          w="250px"
          mx="xs"
          mb="xs"
          placeholder="Search tours"
          rightSectionWidth={42}
          rightSection={
            <ActionIcon size="1.25rem" radius="xl" color="dark-blue" variant="filled">
              <IconArrowRight size="1rem" stroke={1.5} />
            </ActionIcon>
          }
        />
        {role === "OPERATOR" && (
          <NavLink
            label="Add Tour"
            description="Add new tour"
            icon={<IconTextPlus size="1.5rem" stroke={1.5} />}
            onClick={() => {
              navigate("add-edit-tours");
            }}
            fw="bold"
            w="auto"
            c="dark-blue"
            mx="xs"
            mb="xs"
          />
        )}
      </Flex>
      <Divider my="xs" label="List of all Tours" labelPosition="center" fw="bold" c="dark-blue" />

      <ToursTable />
    </Container>
  );
}
