import { Flex, Image, Text } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import summit from "../assets/summit.png";

export default function Topbar() {
  const { toggle, fullscreen } = useFullscreen();
  const { smallScreen } = useContext(AuthContext);

  return (
    <Flex w="100%" align="center" justify="space-between" c="orange" fs="italic" fw="bold" lts="2px">
      <Text mx="md" c="gray.1">
        Go<span style={{ color: "#12b1e6" }}>4</span>
        <span style={{ color: "#fdb614" }}>Adventure</span>
      </Text>

      <Flex onClick={toggle} direction="column" align="flex-end" mr="md">
        <Image maw={48} src={summit} alt="summit" pt="5px" />
        <Text display={smallScreen ? "none" : "inline"} size="xs" fz="0.65rem" color={fullscreen ? "orange" : "gray.1"}>
          {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </Text>
      </Flex>
    </Flex>
  );
}
