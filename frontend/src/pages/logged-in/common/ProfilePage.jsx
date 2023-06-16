import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, FileInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Spinner from "../../../components/common/Spinner";

export default function ProfilePage() {
  const { user, instance, notificationcss } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");
  const [logo, setLogo] = useState(null);

  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("info", info);
  formData.append("file", logo);

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .patch(`user/me/${user}`, formData)
      .then(() => {
        navigate(-1);
        notifications.show({
          message: "Tour successfully added!",
          color: "orange",
          styles: () => notificationcss,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit}>
      <Title size="h3" weight={900} m={14}>
        Profile page
      </Title>

      <SimpleGrid m={14} maw={600}>
        <TextInput
          label="Company name"
          placeholder="Your company full name"
          mt="md"
          name="name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="Company address"
          placeholder="Your company full address"
          mt="md"
          name="address"
          variant="filled"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextInput
          label="Company phone"
          placeholder="Your company phone number"
          mt="md"
          name="phone"
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Textarea
          mt="md"
          label="Company info"
          placeholder="Your company info"
          maxRows={10}
          minRows={5}
          autosize
          name="info"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <FileInput label="Company logo" placeholder="Upload logo" accept="image/png,image/jpeg" onChange={setLogo} />

        <Group position="center" mt="xl">
          <Button type="submit" size="sm" bg="dark-blue">
            Submit
          </Button>
        </Group>
      </SimpleGrid>
    </form>
  );
}
