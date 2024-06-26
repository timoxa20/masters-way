import type {StoryObj} from "@storybook/react";
import {Checkbox} from "src/component/checkbox/Checkbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {onChange: () => {}}};

export const withDefaultCheck: Story = {
  args: {
    className: "custom-class",
    isDefaultChecked: true,
    onChange: () => {},
  },
};
