import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Anchor, Stack, Flex, Image } from "@mantine/core";
import { GoogleButton, TwitterButton } from "../../components/SocialButtons/SocialButtons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function AuthPage(props) {
  const { setUser } = useContext(AuthContext);
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 6 ? "Password should include at least 7 characters" : null),
    },
  });

  return (
    <Flex h="100vh" justify="center" align="center">
      <Paper radius="md" p="xl" {...props}>
        <Image maw={240} mx="auto" radius="md" pb={30} src="./src/assets/logo.png" alt="logo" />

        <form
          onSubmit={form.onSubmit(() => {
            console.log(form.values);
            setUser(form.values.email);
            navigate("/");
          })}
        >
          <Stack style={{ position: "relative" }}>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(e) => form.setFieldValue("name", e.currentTarget.value)}
                radius="md"
              />
            )}
            {type === "login" && (
              <Anchor
                className="forgotPassword"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/reset");
                }}
              >
                Forgot your password?
              </Anchor>
            )}

            <TextInput
              required
              label="Email"
              placeholder="username@mail.com"
              value={form.values.email}
              onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(e) => form.setFieldValue("password", e.currentTarget.value)}
              error={form.errors.password && "Password should include at least 6 characters"}
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit" radius="xl" color="dark-blue" w="100%">
              {upperFirst(type)}
            </Button>
            <Anchor
              component="button"
              type="button"
              color="light-blue"
              onClick={() => toggle()}
              size="xs"
              w="100%"
              fw={900}
              lts={1}
            >
              {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
            </Anchor>
          </Group>
        </form>

        <Divider label={`Or ${type} with social media`} labelPosition="center" my="lg" color="gray" fw={900} />

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>
      </Paper>
    </Flex>
  );
}
