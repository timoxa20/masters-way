import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {WayCard} from "src/component/wayCard/WayCard";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

const meta = {
  title: "WayCard",
  component: WayCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultWayOwner: UserPlain = {
  uuid: "user1",
  name: "Ekaterina Ver",
  email: "ekaterina@gmail.com",
  description: "developer",
  createdAt: new Date(),
  imageUrl: "",
  isMentor: false,
};

const REPEAT_TEN = 10;

const defaultWayPreview: WayPreview = {
  uuid: "1",
  name: "Way's name Way's name Way's name Way's name Way's name",
  isPrivate: false,
  wayTags: [
    {
      uuid: "1",
      name: "IT",
    },
    {
      uuid: "2",
      name: "Development",
    },
    {
      uuid: "3",
      name: "Web",
    },
    {
      uuid: "4",
      name: "Web",
    },
    {
      uuid: "5",
      name: "Web",
    },
  ],
  copiedFromWayUuid: "",
  createdAt: new Date("2024-02-11"),
  dayReportsAmount: 4,
  estimationTime: 0,
  favoriteForUsers: 5,
  goalDescription: "It's my own goal, and I'm very happy".repeat(REPEAT_TEN),
  status: WayStatus.inProgress,
  lastUpdate: new Date("2024-02-11"),
  mentors: [
    {
      uuid: "user2",
      name: "Victor",
      email: "emailVictor@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      imageUrl: "",
      isMentor: false,
    },
    {
      uuid: "user3",
      name: "Ekaterina Ver",
      email: "email@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      imageUrl: "",
      isMentor: false,
    },
  ],
  metricsDone: 3,
  metricsTotal: 5,
  owner: defaultWayOwner,
  childrenUuids: [],
};

export const Default: Story = {
  args: {wayPreview: defaultWayPreview},
  render: (args) => (
    <BrowserRouter>
      <WayCard {...args} />
    </BrowserRouter>
  ),
};

