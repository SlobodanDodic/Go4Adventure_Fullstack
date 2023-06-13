import { IconTrekking, IconSwimming, IconShiJumping } from "@tabler/icons-react";

export const categoriesData = [
  {
    name: "Land-based Activities",
    image: <IconTrekking width={18} height={18} />,
    categories: [
      {
        name: "Trekking and Hiking",
        subcategories: [{ name: "Day hikes" }, { name: "Multi-day treks" }],
      },
      {
        name: "Mountaineering and Rock Climbing",
        subcategories: [{ name: "Ice climbing" }, { name: "Via Ferrata" }, { name: "Sport climbing" }],
      },
      {
        name: "Camping and Glamping",
        subcategories: [{ name: "Car camping" }, { name: "Wilderness camping" }, { name: "Luxury glamping" }],
      },
      {
        name: "Cycling",
        subcategories: [{ name: "Road cycling" }, { name: "Mountain biking" }, { name: "E-biking" }],
      },
      {
        name: "Wildlife Safaris",
        subcategories: [{ name: "African safaris" }, { name: "Asian safaris" }, { name: "South American safaris" }],
      },
    ],
  },
  {
    name: "Water-based Activities",
    image: <IconSwimming width={18} height={18} />,
    categories: [
      {
        name: "Rafting and Kayaking",
        subcategories: [{ name: "Whitewater rafting" }, { name: "Sea kayaking" }, { name: "Flatwater kayaking" }],
      },
      {
        name: "Surfing and Windsurfing",
        subcategories: [{ name: "Beach breaks" }, { name: "Point breaks" }, { name: "Kite surfing" }],
      },
      {
        name: "Sailing and Yachting",
        subcategories: [{ name: "Bareboat charters" }, { name: "Skippered charters" }, { name: "Regattas" }],
      },
      {
        name: "Scuba Diving and Snorkelling",
        subcategories: [{ name: "PADI courses" }, { name: "Wreck diving" }, { name: "Night diving" }],
      },
    ],
  },
  {
    name: "Aerial & Extreme Sports",
    image: <IconShiJumping width={18} height={18} />,
    categories: [
      {
        name: "Skydiving and Bungee Jumping",
        subcategories: [{ name: "Tandem skydives" }, { name: "Solo skydives" }, { name: "Bungee jumping" }],
      },
      {
        name: "Paragliding and Hang Gliding",
        subcategories: [{ name: "Tandem flights" }, { name: "Solo flights" }, { name: "Acrobatics" }],
      },
      {
        name: "Winter Sports",
        subcategories: [
          { name: "Skiing and Snowboarding" },
          { name: "Nordic skiing" },
          { name: "Cross-country skiing" },
        ],
      },
      {
        name: "Rock Climbing",
        subcategories: [{ name: "Indoor climbing" }, { name: "Outdoor climbing" }],
      },
    ],
  },
];
