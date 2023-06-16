import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Anchor, Stack, Flex, Image } from "@mantine/core";
import { GoogleButton, TwitterButton } from "../../components/socialButtons/SocialButtons";
import { notifications } from "@mantine/notifications";
import logo from "../../assets/logo.png";
import Spinner from "../../components/common/Spinner";

export default function AuthPage(props) {
  const { instance, notificationcss, setUser, setToken, setRole, role } = useContext(AuthContext);
  const [type, toggle] = useToggle(["login", "register"]);
  const [loading, setLoading] = useState(false);
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

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: { password: (val) => (val.length <= 6 ? "Password should include at least 7 characters" : null) },
  });

  const handleRegister = (values) => {
    setLoading(true);
    instance
      .post("auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate("/");
        notifications.show({
          message: "Email has been sent! 👀 Check your inbox.",
          color: "orange",
          styles: () => notificationcss,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleLogin = async (values) => {
    setLoading(true);
    await instance
      .post("auth/login", { username: values.username, password: values.password })
      .then((res) => {
        setUser(res.data?.loggedUser);
        setToken(res.data?.refreshToken);
        setRole(res.data?.role);
        navigate(role === "OPERATOR" ? "/operators" : "/home");
        notifications.show({
          message: "Welcome!",
          color: "orange",
          styles: () => notificationcss,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (loading) return <Spinner />;

  return (
    <Flex h="100vh" justify="center" align="center">
      <Paper radius="md" p="xl" {...props}>
        <Image maw={240} mx="auto" radius="md" pb={30} src={logo} alt="logo" />

        <form
          onSubmit={
            type === "register"
              ? form.onSubmit((values) => handleRegister(values))
              : loginForm.onSubmit((values) => handleLogin(values))
          }
        >
          <Stack style={{ position: "relative" }}>
            {type === "login" ? (
              <Anchor
                className="forgotPassword"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/reset");
                }}
              >
                Forgot your password?
              </Anchor>
            ) : null}

            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={type === "register" ? form.values.username : loginForm.values.username}
              onChange={(e) =>
                type === "register"
                  ? form.setFieldValue("username", e.currentTarget.value)
                  : loginForm.setFieldValue("username", e.currentTarget.value)
              }
              radius="md"
            />
            {type === "register" ? (
              <TextInput
                required
                label="Email"
                placeholder="username@mail.com"
                value={form.values.email}
                onChange={(e) => form.setFieldValue("email", e.currentTarget.value)}
                error={form.errors.email && "Invalid email"}
                radius="md"
              />
            ) : null}
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={type === "register" ? form.values.password : loginForm.values.password}
              // onChange={(e) => form.setFieldValue("password", e.currentTarget.value)}
              onChange={(e) =>
                type === "register"
                  ? form.setFieldValue("password", e.currentTarget.value)
                  : loginForm.setFieldValue("password", e.currentTarget.value)
              }
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
