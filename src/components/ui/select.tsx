import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group ref={ref} data-slot="select-group" className={className} {...props} />
))
SelectGroup.displayName = SelectPrimitive.Group.displayName

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value ref={ref} data-slot="select-value" className={className} {...props} />
))
SelectValue.displayName = SelectPrimitive.Value.displayName

const selectTriggerVariants = cva(
  [
    "flex w-full items-center justify-between gap-2 rounded-radius-100 outline-none transition-all duration-200 cursor-pointer shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
  ],
  {
    variants: {
      $size: {
        sm: "min-h-8 px-3 py-2 text-xs",
        md: "h-10 min-h-10 px-4 py-2 text-sm",
        lg: "h-12 min-h-12 px-4 py-[14px] text-base",
      },
      $state: {
        default: [
          "border border-primary-200 bg-primary-0 text-primary-900 data-[placeholder]:text-primary-500",
          "hover:border-primary-400 hover:shadow-md",
          "focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-400/20",
        ],
        success: [
          "border border-[#0E9F6E] bg-[#F3FAF7] text-[#046C4E] data-[placeholder]:text-[#046C4E]",
          "hover:border-[#0E9F6E] hover:shadow-md",
          "focus-visible:border-[#0E9F6E] focus-visible:ring-2 focus-visible:ring-[#0E9F6E]/20",
          "dark:border-[#0E9F6E] dark:bg-[#41464F] dark:text-[#0E9F6E] dark:data-[placeholder]:text-[#0E9F6E]",
          "dark:hover:border-[#0E9F6E]",
        ],
        error: [
          "border border-[#F05252] bg-[#FDF2F2] text-[#C81E1E] data-[placeholder]:text-[#C81E1E]",
          "hover:border-[#F05252] hover:shadow-md",
          "focus-visible:border-[#F05252] focus-visible:ring-2 focus-visible:ring-[#F05252]/20",
          "dark:border-[#F05252] dark:bg-[#41464F] dark:text-[#F05252] dark:data-[placeholder]:text-[#F05252]",
          "dark:hover:border-[#F05252]",
        ],
      },
    },
    defaultVariants: {
      $size: "md",
      $state: "default",
    },
  }
)

type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  $size?: "sm" | "md" | "lg"
  $hasError?: boolean
  $hasSuccess?: boolean
}

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, $size = "md", $hasError = false, $hasSuccess = false, children, ...props }, ref) => {
  const $state = $hasSuccess ? "success" : $hasError ? "error" : "default"

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      data-size={$size}
      className={cn(selectTriggerVariants({ $size, $state }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className={cn("size-4 opacity-50 shrink-0", {
            "text-primary-900": $state === "default",
            "text-[#046C4E] dark:text-[#0E9F6E]": $state === "success",
            "text-[#C81E1E] dark:text-[#F05252]": $state === "error",
          })}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    header?: React.ReactNode
  }
>(({ className, children, position = "popper", align = "center", header, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      data-slot="select-content"
      className={cn(
        "relative z-50 rounded-radius-100 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-hidden shadow-lg",
        "bg-primary-0 border border-primary-200 text-primary-900",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      align={align}
      {...props}
    >
      {header}
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-2",
          position === "popper" &&
          "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn("px-3 py-2 text-xs font-semibold text-primary-900 uppercase tracking-wider", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    data-slot="select-item"
    className={cn(
      "relative flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none select-none transition-all duration-200",
      "hover:bg-primary-50 focus:bg-primary-50",
      "focus:text-primary-900",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-transparent",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className
    )}
    {...props}
  >
    <span className="absolute right-3 flex items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4 text-primary-900" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText className="flex-1">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn("my-2 h-px bg-primary-200", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    data-slot="select-scroll-up-button"
    className={cn("flex cursor-default items-center justify-center py-1 bg-primary-0", className)}
    {...props}
  >
    <ChevronUpIcon className="size-4 text-primary-900" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    data-slot="select-scroll-down-button"
    className={cn("flex cursor-default items-center justify-center py-1 bg-primary-0", className)}
    {...props}
  >
    <ChevronDownIcon className="size-4 text-primary-900" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
