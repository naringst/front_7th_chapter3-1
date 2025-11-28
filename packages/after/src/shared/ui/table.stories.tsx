import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from './table';

const meta = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell className="text-right">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
          <TableCell className="text-right">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Moderator</TableCell>
          <TableCell className="text-right">Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Item 1</TableCell>
          <TableCell>2</TableCell>
          <TableCell className="text-right">$10.00</TableCell>
          <TableCell className="text-right">$20.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Item 2</TableCell>
          <TableCell>1</TableCell>
          <TableCell className="text-right">$15.00</TableCell>
          <TableCell className="text-right">$15.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Item 3</TableCell>
          <TableCell>3</TableCell>
          <TableCell className="text-right">$8.00</TableCell>
          <TableCell className="text-right">$24.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right font-medium">
            Total
          </TableCell>
          <TableCell className="text-right font-medium">$59.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024-01-15</TableCell>
          <TableCell>Payment received</TableCell>
          <TableCell className="text-right">$1,000.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-14</TableCell>
          <TableCell>Invoice payment</TableCell>
          <TableCell className="text-right">$500.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024-01-13</TableCell>
          <TableCell>Refund processed</TableCell>
          <TableCell className="text-right">-$50.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((id) => (
          <TableRow
            key={id}
            className={
              id % 2 === 0
                ? 'bg-[var(--color-semantic-background-normal-alternative)]'
                : ''
            }
          >
            <TableCell>{id}</TableCell>
            <TableCell>Item {id}</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
