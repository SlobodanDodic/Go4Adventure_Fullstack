import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProfileButton } from "./ProfileButton";
import { Button, Flex, NavLink, Navbar, Stack } from "@mantine/core";
import { IconGauge, IconTrekking, IconActivity, IconCurrencyDollar, IconLogout } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Spinner from "../common/Spinner";

export default function Leftbar({ opened, setOpened }) {
  const { instance, loggedUser, setUser, setToken, role, setRole, notificationcss } = useContext(AuthContext);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line
  const getImages = async () => {
    return await instance.get(`/gallery/${loggedUser?.profile?.logo}`);
  };

  const userData = [
    { icon: IconGauge, label: "Home", description: "All tours", path: "/home" },
    {
      icon: IconActivity,
      label: "Liked Tours",
      description: "Favorite tours and trip plans",
      path: "/home/liked_tours",
    },
  ];

  const operatorsData = [
    { icon: IconGauge, label: "Dashboard", description: "Tours statistics & calculations", path: "/operators" },
    { icon: IconTrekking, label: "Tours", description: "Add, edit & delete tours", path: "/operators/tours" },
    { icon: IconActivity, label: "Activity", description: "Current affairs & happenings", path: "/operators/activity" },
    { icon: IconCurrencyDollar, label: "Finance", description: "Cash flow & payments", path: "/operators/finance" },
  ];

  const data = role === "USER" ? userData : operatorsData;

  const handleSignout = () => {
    setLoading(true);
    instance
      .post("auth/signout")
      .then(() => {
        setUser(null);
        setToken(null);
        setRole(null);
        notifications.show({
          message: "Successfully logged out!",
          color: "orange",
          styles: () => notificationcss,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (loading) return <Spinner />;

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        setActive(index);
        navigate(item.path);
        setOpened((o) => !o);
      }}
      fw="bold"
    />
  ));

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 175, lg: 300 }}
      bg="gray.0"
      gap="lg"
      direction="column"
      sx={{ justifyContent: "space-between" }}
    >
      <Stack> {items} </Stack>
      <Stack>
        <ProfileButton
          image={`${process.env.REACT_APP_SERVER}/gallery/${loggedUser?.profile?.logo}`}
          name={loggedUser?.profile?.name}
          email={loggedUser?.email}
          onClick={() => {
            setActive(-1);
            navigate(role === "USER" ? "/home/profile" : "/operators/profile");
            setOpened((o) => !o);
          }}
        />
        <Flex align="center" ml="md">
          <Button
            size="sm"
            pl="0"
            weight={500}
            tt="capitalize"
            variant="subtile"
            rightIcon={<IconLogout size="1rem" stroke={1.5} />}
            onClick={() => {
              handleSignout();
              navigate("/");
            }}
            c="dark-blue"
          >
            Logout
          </Button>
        </Flex>
      </Stack>
    </Navbar>
  );
}
