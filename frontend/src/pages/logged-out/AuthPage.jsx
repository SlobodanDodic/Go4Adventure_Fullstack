import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Anchor, Stack, Flex, Image } from "@mantine/core";
import { GoogleButton, TwitterButton } from "../../components/SocialButtons/SocialButtons";
import { notifications } from "@mantine/notifications";
import logo from "../../assets/logo.png";

export default function AuthPage(props) {
  const { instance, notificationcss, setUser, setToken } = useContext(AuthContext);
  const [type, toggle] = useToggle(["login", "register"]);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
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
        <Image maw={240} mx="auto" radius="md" pb={30} src={logo} alt="logo" />

        <form
          onSubmit={form.onSubmit((values) => {
            type === "register" &&
              instance
                .post("auth/register", { username: values.username, email: values.email, password: values.password })
                .then((res) => {
                  console.log(res);
                  navigate("/");
                  notifications.show({
                    message: "Email has been sent! 👀 Check your inbox.",
                    color: "orange",
                    styles: () => notificationcss,
                  });
                })
                .catch((err) => console.log(err));

            type === "login" &&
              instance
                .post("auth/login", { username: values.username, password: values.password })
                .then((res) => {
                  setUser(res.data?.loggedUser);
                  setToken(res.data?.refreshToken);
                  console.log(res.data);
                  navigate("/");
                  notifications.show({
                    message: "Welcome!",
                    color: "orange",
                    styles: () => notificationcss,
                  });
                })
                .catch((err) => console.log(err));
          })}
        >
          <Stack style={{ position: "relative" }}>
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
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(e) => form.setFieldValue("username", e.currentTarget.value)}
              radius="md"
            />
            {type === "register" && (
              <TextInput
                required
                label="Email"
                placeholder="username@mail.com"
                value={form.values.email}
                onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                error={form.errors.email && "Invalid email"}
                radius="md"
              />
            )}
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
