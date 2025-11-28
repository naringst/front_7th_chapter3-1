import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Sample text',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Required field',
    required: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <label
        htmlFor="input-example"
        className="text-sm font-medium text-[var(--color-semantic-label-normal)]"
      >
        Label
      </label>
      <Input id="input-example" placeholder="Enter text..." />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true,
    defaultValue: 'Invalid value',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <Input placeholder="Default size" />
      <Input placeholder="Small size" className="h-8 text-sm" />
      <Input placeholder="Large size" className="h-12 text-base" />
    </div>
  ),
};
