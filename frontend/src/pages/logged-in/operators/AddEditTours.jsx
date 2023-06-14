import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Button, Flex, SimpleGrid, createStyles, TextInput, NumberInput, Center, Box, FileInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useId } from "@mantine/hooks";
import { categoriesData } from "../../../components/operators/categoriesData";
import { GroupPicker } from "../../../components/operators/GroupPicker";
import RichTextEdit from "../../../components/common/RichTextEdit";
import { IconAlignLeft, IconUpload } from "@tabler/icons-react";
import Spinner from "../../../components/common/Spinner";
import { notifications } from "@mantine/notifications";
// import useSWR from "swr";
// import { mutate } from "swr";

export default function AddEditTours() {
  const { instance, user, notificationcss } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [group, setGroup] = useState(categoriesData[0]);
  const [category, setCategory] = useState(categoriesData[0].categories[0]);
  const [subcategory, setSubcategory] = useState(categoriesData[0].categories[0].subcategories[0]);
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [price, setPrice] = useState([]);
  const [location, setLocation] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [richText, setRichText] = useState("");

  const [uploads, setUploads] = useState([]);

  const { classes } = useStyles();
  const navigate = useNavigate();
  const uuid = useId();

  const data = new FormData();
  data.append("author", user);
  data.append("group", group.name);
  data.append("category", category.name);
  data.append("subcategory", subcategory.name);
  data.append("title", title);
  data.append("location", location);
  data.append("price", price);
  data.append("dateRange", JSON.stringify(dateRange));
  data.append("editorText", JSON.stringify(richText));
  data.append("file", coverImg);

  const handleSubmit = () => {
    setLoading(true);
    instance
      .post(`post/create`, data)
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

  // const { data, error, isLoading } = useSWR("/post/create", instance.post);
  // const getCartMutation = () => ({
  //   addToCart: (uploads) => mutate("/gallery/uploads", () => instance.post("/gallery/uploads", { file: uploads })),
  // });
  // const { addToCart } = getCartMutation();

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(uploads);
    const formData = new FormData();
    uploads.map((file) => formData.append("files", file));
    formData.append("author", "7b684246-a310-4605-954c-5af9003058c5");

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    instance
      .post(`/gallery/uploads/${user}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (loading) return <Spinner />;

  return (
    <Flex direction="column" mx={7}>
      <Flex w="100%">
        <Button
          onClick={() => navigate(-1)}
          size="xs"
          bg="dark-blue"
          id={uuid}
          sx={() => ({
            "@media (max-width: 48em)": {
              marginTop: "20px",
            },
          })}
        >
          Go back to tours page
        </Button>
      </Flex>

      <GroupPicker
        categoriesData={categoriesData}
        group={group}
        category={category}
        subcategory={subcategory}
        setGroup={setGroup}
        setCategory={setCategory}
        setSubcategory={setSubcategory}
      />

      <SimpleGrid
        cols={3}
        spacing="lg"
        mt="md"
        maw="1200px"
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 2, spacing: "sm" },
          { maxWidth: "xs", cols: 1, spacing: "sm" },
        ]}
      >
        <TextInput
          label="Title"
          placeholder="Tour title"
          classNames={classes}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <DatePickerInput
          type="range"
          label="Dates"
          placeholder="Pick dates range"
          value={dateRange}
          onChange={setDateRange}
          size="xs"
          classNames={classes}
        />

        <NumberInput
          classNames={classes}
          label="Tour price"
          onChange={setPrice}
          parser={(value) => value.replace(/€\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value)) ? `€ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "€ "
          }
        />
        <TextInput
          label="Location"
          placeholder="Tour location"
          classNames={classes}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <FileInput
          classNames={classes}
          label="Cover"
          placeholder="Upload image cover"
          accept="image/png,image/jpeg"
          onChange={setCoverImg}
        />
      </SimpleGrid>

      <Center mt={34} maw="1200px">
        <IconAlignLeft size={14} />
        <Box ml={5}>Add aditional text</Box>
      </Center>

      <form onSubmit={handleUpload} encType="multipart/form-data">
        <Center mt={16} maw="1200px">
          <FileInput
            placeholder="Select images for the rich text editor"
            multiple
            size="xs"
            withAsterisk
            maw="255px"
            icon={<IconUpload size={14} />}
            onChange={setUploads}
          />
          <Button type="submit" size="xs" bg="dark-blue" ml={12}>
            Upload
          </Button>
        </Center>
      </form>

      <RichTextEdit classNames={classes} setRichText={setRichText} />

      <Flex w="100%">
        <Button onClick={handleSubmit} size="xs" bg="dark-blue">
          Submit form
        </Button>
      </Flex>
    </Flex>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "2.75rem",
    paddingTop: "1rem",
    fontSize: theme.fontSizes.xs,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));
