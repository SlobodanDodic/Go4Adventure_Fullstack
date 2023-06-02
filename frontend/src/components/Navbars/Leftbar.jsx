import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { Button, Flex, NavLink, Navbar, Stack } from "@mantine/core";
import { IconGauge, IconActivity, IconLogout } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const data = [
  { icon: IconGauge, label: "Home", description: "Home", path: "/home" },
  { icon: IconActivity, label: "Activity", description: "Current affairs & happenings", path: "/activity" },
];

export default function Leftbar({ opened, setOpened }) {
  const { user, loggedUser, setUser, notificationcss } = useContext(AuthContext);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleSignout = () => {
    // instance.post("auth/signout").then(() => {}).catch((err) => console.log(err)).finally(() => setLoading(false));
    setUser(null);
    notifications.show({
      message: "Successfully logged out!",
      color: "orange",
      styles: () => notificationcss,
    });
  };

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
        <UserButton
          image={loggedUser?.avatar}
          name={loggedUser?.name}
          // email={loggedUser?.email}
          email={user}
          onClick={() => {
            setActive(-1);
            navigate("profile");
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
