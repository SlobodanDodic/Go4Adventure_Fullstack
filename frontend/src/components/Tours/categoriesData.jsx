import { IconTrekking, IconSwimming, IconShiJumping } from "@tabler/icons-react";

export const groups = [
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

// export const dataGroupLand = [
//   {
//     category: "Trekking and Hiking",
//     subcategory: ["Day hikes", "Multi-day treks"],
//   },
//   {
//     category: "Mountaineering and Rock Climbing",
//     subcategory: ["Ice climbing", "Via Ferrata", "Sport climbing"],
//   },
//   {
//     category: "Camping and Glamping",
//     subcategory: ["Car camping", "Wilderness camping", "Luxury glamping"],
//   },
//   {
//     category: "Cycling",
//     subcategory: ["Road cycling", "Mountain biking", "E-biking"],
//   },
//   {
//     category: "Wildlife Safaris",
//     subcategory: ["African safaris", "Asian safaris", "South American safaris"],
//   },
// ];

// export const dataGroupWater = [
//   {
//     category: "Rafting and Kayaking",
//     subcategory: ["Whitewater rafting", "Sea kayaking", "Flatwater kayaking"],
//   },
//   {
//     category: "Surfing and Windsurfing",
//     subcategory: ["Beach breaks", "Point breaks", "Kite surfing"],
//   },
//   {
//     category: "Sailing and Yachting",
//     subcategory: ["Bareboat charters", "Skippered charters", "Regattas"],
//   },
//   {
//     category: "Scuba Diving and Snorkelling",
//     subcategory: ["PADI courses", "Wreck diving", "Night diving"],
//   },
// ];

// export const dataGroupExtreme = [
//   {
//     category: "Skydiving and Bungee Jumping",
//     subcategory: ["Tandem skydives", "Solo skydives", "Bungee jumping"],
//   },
//   {
//     category: "Paragliding and Hang Gliding",
//     subcategory: ["Tandem flights", "Solo flights", "Acrobatics"],
//   },
//   {
//     category: "Winter Sports",
//     subcategory: ["Skiing and Snowboarding", "Nordic skiing", "Cross-country skiing"],
//   },
//   {
//     category: "Rock Climbing",
//     subcategory: ["Indoor climbing", "Outdoor climbing"],
//   },
// ];
