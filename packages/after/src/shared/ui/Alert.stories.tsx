import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    title: {
      control: 'text',
    },
    showIcon: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Alert Title',
    children: 'This is an alert with a title.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please be careful with this action.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred while processing your request.',
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    showIcon: false,
    children: 'This alert does not show an icon.',
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'This alert can be closed.',
    onClose: () => alert('Alert closed!'),
  },
};

export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children:
      'This is a longer alert message that contains more detailed information. It demonstrates how the alert component handles extended content and wraps text appropriately.',
  },
};
