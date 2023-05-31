import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { Button, Flex, Image, Text, Title } from "@mantine/core";
import logo from "../../assets/logo.png";

export default function Activation() {
  const { instance, notificationcss } = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.patch(`auth/activate/${token}`, { isActivated: true });
    navigate("/auth");
    notifications.show({
      message: "Successfully activated!",
      color: "orange",
      styles: () => notificationcss,
    });
  };

  return (
    <Flex size={460} h="100vh" mx="auto" justify="center" align="center" direction="column">
      <Title fw="bolder" fz="2xl" c="dark-blue" align="center">
        Activation Page
      </Title>
      <Text c="dimmed" fw="bolder" fz="lg" ta="center" m={12}>
        Click to login and to activate your mail!
      </Text>
      <Button type="submit" w={200} color="dark-blue" onClick={handleSubmit}>
        Login page
      </Button>

      <Image maw={240} mx="auto" mt="3rem" radius="md" pb={30} src={logo} alt="logo" />
    </Flex>
  );
}
