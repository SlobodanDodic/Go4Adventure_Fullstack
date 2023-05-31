import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { Button, Flex, NavLink, Stack } from "@mantine/core";
import { IconGauge, IconTrekking, IconActivity, IconCurrencyDollar, IconLogout } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const data = [
  { icon: IconGauge, label: "Dashboard", description: "Tours statistics & calculations", path: "/" },
  { icon: IconTrekking, label: "Tours", description: "Add, edit & delete tours", path: "tours" },
  { icon: IconActivity, label: "Activity", description: "Current affairs & happenings", path: "activity" },
  { icon: IconCurrencyDollar, label: "Finance", description: "Cash flow & payments", path: "finance" },
];

export default function Leftbar({ setOpened }) {
  const { user, loggedUser, instance, setUser, setToken, notificationcss } = useContext(AuthContext);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const handleSignout = () => {
    instance
      .post("auth/signout")
      .then(() => {
        setUser(null);
        setToken(null);
        notifications.show({
          message: "Successfully logged out!",
          color: "orange",
          styles: () => notificationcss,
        });
      })
      .catch((err) => console.log(err));
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      // rightSection={item.rightSection}
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
    <>
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
    </>
  );
}
