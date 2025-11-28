import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from './button';
import { Input } from './input';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. It provides context about the dialog
                content.
              </DialogDescription>
            </DialogHeader>
            <div>
              <p>Dialog content goes here.</p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const WithTrigger: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog with Trigger</DialogTitle>
          <DialogDescription>
            This dialog is opened using a trigger button.
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Dialog content goes here.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
          <Button variant="primary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [openSmall, setOpenSmall] = useState(false);
    const [openMedium, setOpenMedium] = useState(false);
    const [openLarge, setOpenLarge] = useState(false);

    return (
      <div className="flex gap-4">
        <Button onClick={() => setOpenSmall(true)}>Small</Button>
        <Dialog open={openSmall} onOpenChange={setOpenSmall}>
          <DialogContent size="small">
            <DialogHeader>
              <DialogTitle>Small Dialog</DialogTitle>
            </DialogHeader>
            <div>
              <p>This is a small dialog.</p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenSmall(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={() => setOpenMedium(true)}>Medium</Button>
        <Dialog open={openMedium} onOpenChange={setOpenMedium}>
          <DialogContent size="medium">
            <DialogHeader>
              <DialogTitle>Medium Dialog</DialogTitle>
            </DialogHeader>
            <div>
              <p>This is a medium dialog (default size).</p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenMedium(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={() => setOpenLarge(true)}>Large</Button>
        <Dialog open={openLarge} onOpenChange={setOpenLarge}>
          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle>Large Dialog</DialogTitle>
            </DialogHeader>
            <div>
              <p>This is a large dialog with more space for content.</p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenLarge(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
              <DialogDescription>
                Fill in the form below to create a new account.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium mb-1 block text-[var(--color-semantic-label-normal)]"
                >
                  Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium mb-1 block text-[var(--color-semantic-label-normal)]"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Create Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Dialog Without Close Button</DialogTitle>
              <DialogDescription>
                This dialog does not have a close button in the header.
              </DialogDescription>
            </DialogHeader>
            <div>
              <p>You must use the footer buttons to close this dialog.</p>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
