import * as React from "react";
import { Typography } from '../Typography';
import { cn } from "../../../lib/utils";
import {
  Select as SelectPrimitive,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem as SelectItemPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectLabel,
  SelectSeparator,
} from "../../ui/select";

// --- TYPES ---

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label?: string;
  items: SelectItem[];
}

export interface SelectProps {
  /** Controlled value */
  $value?: string;
  /** Default value for uncontrolled mode */
  $defaultValue?: string;
  /** Callback when value changes */
  $onValueChange?: (value: string) => void;
  /** Items to display - either a flat array or grouped array */
  $items?: SelectItem[];
  /** Grouped items */
  $groups?: SelectGroup[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Size variant */
  $size?: "sm" | "md" | "lg";
  /** Show error styling */
  $hasError?: boolean;
  /** Show success styling */
  $hasSuccess?: boolean;
  /** Stretch wrapper to full container width */
  $fullWidth?: boolean;
  /** Custom class name */
  className?: string;
  /** Label for the select */
  label?: string;
}

// --- COMPONENT ---

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      $value,
      $defaultValue,
      $onValueChange,
      $items = [],
      $groups,
      placeholder = "Select...",
      disabled = false,
      $size = "md",
      $hasError = false,
      $hasSuccess = false,
      $fullWidth = false,
      className,
      label,
    },
    ref
  ) => {
    // Use items or groups, groups takes precedence
    const hasGroups = $groups && $groups.length > 0;
    const displayItems = hasGroups ? [] : $items;

    return (
      <div className={cn("flex flex-col", $fullWidth ? "w-full" : "", className)}>
        {label && (
          <Typography
            $variant="sm"
            className="mb-2 text-primary-500 dark:text-primary-400 font-medium"
          >
            {label}
          </Typography>
        )}
        <SelectPrimitive
          value={$value}
          defaultValue={$defaultValue}
          onValueChange={(val) => {
            if (val !== null && $onValueChange) {
              $onValueChange(val);
            }
          }}
          disabled={disabled}
        >
          <SelectTrigger
            ref={ref}
            $size={$size}
            $hasError={$hasError}
            $hasSuccess={$hasSuccess}
            className={cn($fullWidth ? "w-full" : "max-w-91 min-w-64")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {hasGroups ? (
              <>
                {$groups!.map((group, index) => (
                  <React.Fragment key={group.label || `group-${index}`}>
                    {index > 0 && <SelectSeparator />}
                    <SelectGroupPrimitive>
                      {group.label && <SelectLabel>{group.label}</SelectLabel>}
                      {group.items.map((item) => (
                        <SelectItemPrimitive
                          key={item.value}
                          value={item.value}
                          disabled={item.disabled}
                        >
                          {item.label}
                        </SelectItemPrimitive>
                      ))}
                    </SelectGroupPrimitive>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {displayItems.map((item) => (
                  <SelectItemPrimitive
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItemPrimitive>
                ))}
              </>
            )}
          </SelectContent>
        </SelectPrimitive>
      </div>
    );
  }
);

Select.displayName = "Select";
