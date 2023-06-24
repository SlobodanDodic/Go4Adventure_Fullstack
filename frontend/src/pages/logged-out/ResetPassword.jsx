import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, PasswordInput, Paper, Image } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import logo from "../../assets/logo.png";
import Spinner from "../../components/common/Spinner";

export default function ResetPassword() {
  const { instance, notificationcss } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
      password: (val) => (val.length < 6 ? "Password should include at least 7 characters" : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords did not match" : null),
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    instance
      .patch(`auth/resetPassword/${token}`, { password: values.password })
      .then(() => {
        notifications.show({
          message: "Password successfully changed. Please login!",
          color: "orange",
          styles: () => notificationcss,
        });
        navigate("/auth");
      })
      .catch((err) => console.log("Response - " + err))
      .finally(() => setLoading(false));
  };

  if (loading) return <Spinner />;

  return (
    <Flex size={460} h="90vh" mx="auto" justify="center" align="center" direction="column">
      <Paper radius="md" p="xl">
        <Image maw={240} mx="auto" radius="md" pb={30} src={logo} alt="logo" />
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <PasswordInput label="Password" placeholder="Password" {...form.getInputProps("password")} />

          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />

          <Button type="submit" radius="xl" color="dark-blue" w="100%" mt={24}>
            Submit
          </Button>
        </form>
      </Paper>
    </Flex>
  );
}
