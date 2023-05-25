import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { Paper, Title, Text, TextInput, Button, Flex, Group, Anchor, Center, Box, Image } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "" },
    validate: { email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email") },
  });

  return (
    <Flex size={460} h="100vh" mx="auto" justify="center" align="center" direction="column">
      <Title fw="bolder" fz="xl" align="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <form
        onSubmit={form.onSubmit(() => {
          console.log(form.values);
          navigate("/login");
          notifications.show({
            autoClose: 3000,
            message: "Email has been sent! 👀 Check your inbox.",
            color: "orange",
          });
        })}
      >
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="username@mail.com"
            required
            value={form.values.email}
            onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
            error={form.errors.email && "Invalid email"}
          />
          <Group position="apart" mt="lg">
            <Anchor color="dimmed" size="sm" w="100%" onClick={() => navigate("/login")}>
              <Center inline w="100%">
                <IconArrowLeft size="1rem" stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type="submit" w="100%" color="dark-blue">
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>

      <Image maw={240} mx="auto" mt="3rem" radius="md" pb={30} src="./src/assets/logo.png" alt="logo" />
    </Flex>
  );
}
