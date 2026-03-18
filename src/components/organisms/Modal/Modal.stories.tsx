import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";
import { Button } from "../../atoms/Button/Button";
import { FormInput } from "../../molecules/FormInput/FormInput";
import { ThemeToggle } from "../../atoms/ThemeToggle/ThemeToggle";
import { Typography } from "../../atoms/Typography/Typography";
import { Mail, Lock } from "lucide-react";

/**
 * Robust Modal component built on top of the Dialog primitive.
 * It provides a simplified interface for common modal patterns like transitions,
 * headers, footers, and triggers.
 */
const meta: Meta<typeof Modal> = {
  title: "organisms/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $title: {
      control: "text",
      description: "Title of the modal",
    },
    $subtitle: {
      control: "text",
      description: "Description or subtitle of the modal",
    },
    $showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button",
    },
    $hasHeaderDivider: {
      control: "boolean",
      description: "Whether to show a divider between the header and the body",
    },
    $hasFooterDivider: {
      control: "boolean",
      description: "Whether to show a divider between the body and the footer",
    },
    $ShoulCloseWhenClickOutside: {
      control: "boolean",
      description: "Whether the modal should close when clicking outside.",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Standard modal with basic text props.
 */
export const Default: Story = {
  args: {
    $title: "Termos de Uso",
    $subtitle: "Por favor, leia atentamente nossos termos antes de prosseguir.",
    $trigger: <Button $variant="primary">Abrir Termos</Button>,
    children: (
      <div className="space-y-4">
        <Typography $variant="sm">
          Este é o corpo do modal utilizando o componente Typography.
          Você pode colocar qualquer conteúdo React aqui dentro.
        </Typography>
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100">
          <Typography $variant="xs" className="text-primary-600">
            Dica: Use as cores do theme.css para manter a consistência visual.
          </Typography>
        </div>
      </div>
    ),
    $footer: (
      <div className="flex justify-end gap-2 w-full">
        <Button $variant="outline" $size="sm">Cancelar</Button>
        <Button $variant="primary" $size="sm">Aceitar Termos</Button>
      </div>
    ),
  },
};

/**
 * A complex example inspired by a login form, demonstrating
 * full-width inputs and footer integration.
 * Includes the ThemeToggle for easy dark mode preview.
 */
export const LoginExample: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center bg-primary-0 p-12 rounded-3xl transition-colors duration-300">
      <div className="flex flex-col items-center gap-2 p-4 border rounded-xl bg-surface-1 border-outline-1 shadow-sm">
        <Typography $variant="xs" $weight="medium" className="text-primary-500 uppercase tracking-wider">
          Dark Mode Preview
        </Typography>
        <ThemeToggle />
      </div>

      <Modal
        $title="Sign in to our platform"
        $trigger={<Button $variant="primary" $size="l">Login Now</Button>}
        $footer={
          <div className="flex flex-col gap-4 w-full">
            <Button $variant="primary" $fullWidth $size="base">
              Login to your account
            </Button>
            <Typography $variant="sm" className="text-center text-primary-500">
              Not registered? <a href="#" className="font-medium text-primary-900 hover:underline">Create an account</a>
            </Typography>
          </div>
        }
      >
        <div className="space-y-5 py-2 w-full min-w-[320px]">
          <FormInput
            label="Your email"
            placeholder="name@example.com"
            $size="md"
            $fullWidth
            $startIcon={<Mail size={16} />}
          />
          <FormInput
            label="Your password"
            type="password"
            placeholder="••••••••"
            $size="md"
            $fullWidth
            $startIcon={<Lock size={16} />}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-outline-2 accent-primary-900 h-4 w-4" />
              <Typography $variant="sm" className="group-hover:text-primary-900 transition-colors">Remember me</Typography>
            </label>
            <a href="#" className="text-sm text-primary-900 hover:underline font-medium">
              Lost password?
            </a>
          </div>
        </div>
      </Modal>
    </div>
  ),
};

/**
 * Example demonstrating that header props can also receive React Nodes.
 */
export const CustomNodes: Story = {
  args: {
    $trigger: <Button $variant="outline">Custom Header Nodes</Button>,
    $title: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-solarOrange-500 flex items-center justify-center text-white">
          !
        </div>
        <Typography $variant="xl" $weight="medium">Critical Warning</Typography>
      </div>
    ),
    $subtitle: (
      <Typography $variant="sm" className="text-red-500 italic">
        This action cannot be undone.
      </Typography>
    ),
    children: (
      <Typography $variant="base">
        Are you absolutely sure you want to delete this repository?
        All data will be permanently removed from our servers.
      </Typography>
    ),
    $footer: (
      <div className="grid grid-cols-2 gap-2 w-full">
        <Button $variant="outline">Keep it</Button>
        <Button $variant="primary" className="bg-red-600 hover:bg-red-700!">Delete everything</Button>
      </div>
    ),
  },
};

/**
 * Example demonstrating a modal that requires explicit user action to close.
 * Clicking outside the modal will not dismiss it.
 */
export const PreventCloseOnClickOutside: Story = {
  args: {
    $trigger: <Button $variant="primary">Open Strict Modal</Button>,
    $title: "Important Interaction",
    $ShoulCloseWhenClickOutside: false,
    children: (
      <Typography $variant="sm">
        Clicking outside this modal will not close it. You must explicitly click the close button or interact with the modal contents.
      </Typography>
    ),
    $footer: (
      <div className="flex justify-end gap-2 w-full">
        <Button $variant="primary" $size="sm">Understood</Button>
      </div>
    ),
  },
};
