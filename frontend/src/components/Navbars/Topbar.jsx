import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Burger, Flex, Header, Image, MediaQuery, ActionIcon, Text, useMantineTheme } from "@mantine/core";
import { IconDirectionSign } from "@tabler/icons-react";
import { useFullscreen } from "@mantine/hooks";
import summit from "../../assets/summit.png";

export default function Topbar({ opened, setOpened }) {
  const { toggle, fullscreen } = useFullscreen();
  const { smallScreen, user } = useContext(AuthContext);
  const theme = useMantineTheme();

  return (
    <Header height={{ base: 50, md: 70 }} p="md" bg="dark-blue">
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[0]} mr="xl" />
        </MediaQuery>
        <Flex w="100%" align="center" justify="space-between" c="orange" fs="italic" fw="bold" lts="2px">
          <Text mx="md" c="gray.1">
            Go<span style={{ color: "#12b1e6" }}>4</span>
            <span style={{ color: "#fdb614" }}>Adventure</span>
          </Text>

          {!user ? (
            <Flex direction="column" align="flex-end" mr="md">
              <ActionIcon>
                <Link to={`/auth`} style={{ textDecoration: "none", color: "#fdb500" }}>
                  <IconDirectionSign size="1.5rem" />
                </Link>
              </ActionIcon>
            </Flex>
          ) : (
            <Flex onClick={toggle} direction="column" align="flex-end" mr="md">
              <Image maw={48} src={summit} alt="summit" pt="5px" />
              <Text
                display={smallScreen ? "none" : "inline"}
                size="xs"
                fz="0.65rem"
                color={fullscreen ? "orange" : "gray.1"}
              >
                {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </Text>
            </Flex>
          )}
        </Flex>
      </div>
    </Header>
  );
}
