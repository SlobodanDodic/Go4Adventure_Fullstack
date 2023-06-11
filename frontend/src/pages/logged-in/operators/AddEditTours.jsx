import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { Button, Flex, SimpleGrid, createStyles, TextInput, NumberInput, Center, Box, FileInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useId } from "@mantine/hooks";
import { groups } from "../../../components/Tours/categoriesData";
import { GroupPicker } from "../../../components/Tours/GroupPicker";
import RichTextEdit from "../../../components/RichTextEdit";
import { IconAlignLeft, IconUpload } from "@tabler/icons-react";
// import useSWR from "swr";

export default function AddEditTours() {
  const { instance, user } = useContext(AuthContext);
  const [group, setGroup] = useState(groups[0]);
  const [category, setCategory] = useState(groups[0].categories[0]);
  const [subcategory, setSubcategory] = useState(groups[0].categories[0].subcategories[0]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [price, setPrice] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [richText, setRichText] = useState("");

  const { classes } = useStyles();
  const navigate = useNavigate();
  const uuid = useId();

  const handleSubmit = () => {
    // console.log(uploads);
    instance
      .post(`post/create`, {
        author: user,
        group: group.name,
        category: category.name,
        subcategory: subcategory.name,
        title: title,
        location: location,
        dateRange: JSON.stringify(dateRange),
        price: price,
        editorText: JSON.stringify(richText),
      })
      .then((res) => {
        console.log(res);
        console.log(group, category, subcategory, title, dateRange, price);
        console.log(richText);
        console.log(uploads);
      })
      .catch((err) => console.log(err));
  };

  // const { data, error, isLoading } = useSWR("/post/create", instance.post);

  return (
    <Flex direction="column">
      <Flex w="100%">
        <Button onClick={() => navigate(-1)} size="xs" bg="dark-blue" id={uuid}>
          Go back to tours page
        </Button>
      </Flex>

      <GroupPicker
        groups={groups}
        group={group}
        category={category}
        subcategory={subcategory}
        setGroup={setGroup}
        setCategory={setCategory}
        setSubcategory={setSubcategory}
      />

      <SimpleGrid mt="md" maw="1200px" breakpoints={[{ minWidth: "sm", cols: 3 }]}>
        <TextInput
          label="Title"
          placeholder="Group title"
          classNames={classes}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <DatePickerInput
          type="range"
          label="Pick dates range"
          placeholder="Pick dates range"
          value={dateRange}
          onChange={setDateRange}
          size="xs"
          classNames={classes}
        />

        <NumberInput
          classNames={classes}
          label="Price"
          onChange={setPrice}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ "
          }
        />
      </SimpleGrid>

      <Center mt={16}>
        <TextInput
          label="Location"
          placeholder="Location"
          classNames={classes}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Center>

      <Center mt={16}>
        <IconAlignLeft size={14} />
        <Box ml={5}>Add aditional text</Box>
      </Center>

      <Center mt={16}>
        <FileInput
          placeholder="Upload images for the rich text editor"
          multiple
          size="xs"
          withAsterisk
          icon={<IconUpload size={14} />}
          onChange={setUploads}
          maw="255px"
        />
      </Center>

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
