import { Flex, Text } from "@mantine/core";

export default function Comments() {
  return (
    <Flex mx={10} my={20} justify="center">
      <Text transform="uppercase" weight={800} mt={35} size="md" ta="center" color="#0b4668">
        Comment section:
      </Text>
    </Flex>
  );
}
