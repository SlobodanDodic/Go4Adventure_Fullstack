import { useState } from "react";
import { Button, Flex, SimpleGrid, createStyles, rem, TextInput, NumberInput, Center, Box } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useNavigate } from "react-router-dom";
import { useId } from "@mantine/hooks";
import { groups } from "../../components/Tours/categoriesData";
import { GroupPicker } from "../../components/Tours/GroupPicker";
import RichTextEdit from "../../components/RichTextEdit";
import { IconAlignLeft } from "@tabler/icons-react";

export default function AddEditTours() {
  const [value, setValue] = useState([]);
  // const [textValue, setTextValue] = useState("");
  const [group, setGroup] = useState(groups[0]);
  const [category, setCategory] = useState(groups[0].categories[0]);
  const [subcategory, setSubcategory] = useState(groups[0].categories[0].subcategories[0]);

  const { classes } = useStyles();
  const navigate = useNavigate();
  const uuid = useId();

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
        <TextInput label="Title" placeholder="Group title" classNames={classes} />

        <DatePickerInput
          type="range"
          label="Pick dates range"
          placeholder="Pick dates range"
          value={value}
          onChange={setValue}
          size="xs"
          classNames={classes}
        />

        <NumberInput
          classNames={classes}
          label="Price"
          defaultValue={1000}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value)) ? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : "$ "
          }
        />
      </SimpleGrid>

      {/* <Textarea
        classNames={classes}
        value={textValue}
        onChange={(e) => setTextValue(e.currentTarget.textValue)}
        label="Event description"
        placeholder="Add an event description using up to 1000 characters."
        autosize
        minRows={2}
        mt="md"
        maw="1200px"
      /> */}

      <Center mt={16}>
        <IconAlignLeft size={rem(14)} />
        <Box ml={5}>Add aditional text</Box>
      </Center>

      <RichTextEdit classNames={classes} />
    </Flex>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(45),
    paddingTop: rem(18),
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
