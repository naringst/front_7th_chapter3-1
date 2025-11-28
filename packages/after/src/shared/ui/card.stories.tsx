import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardBase,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './card';
import { Button } from './button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'flat'],
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    children: 'This is the card content.',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle or description',
    children: 'This card includes both a title and subtitle.',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    title: 'Bordered Card',
    children: 'This card has a border variant.',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    title: 'Elevated Card',
    children: 'This card has an elevated shadow effect.',
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    title: 'Flat Card',
    children: 'This card has a flat appearance.',
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'This card has header actions',
    headerActions: (
      <Button size="sm" variant="ghost">
        Action
      </Button>
    ),
    children: 'This card includes header actions.',
  },
};

export const Composable: Story = {
  render: () => (
    <CardBase className="w-96">
      <CardHeader>
        <CardTitle>Composable Card</CardTitle>
        <CardDescription>
          This card uses the composable CardBase components
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">
            ⋮
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
        <Button variant="secondary">Cancel</Button>
      </CardFooter>
    </CardBase>
  ),
};

export const Complex: Story = {
  render: () => (
    <CardBase className="w-96">
      <CardHeader>
        <CardTitle>Complex Card Example</CardTitle>
        <CardDescription>
          A card with multiple sections and actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>This card demonstrates a more complex layout with multiple sections.</p>
          <div className="rounded-md bg-[var(--color-semantic-background-normal-alternative)] p-4">
            <p className="text-sm">Additional content section</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost">Learn More</Button>
        <Button variant="primary">Get Started</Button>
      </CardFooter>
    </CardBase>
  ),
};
