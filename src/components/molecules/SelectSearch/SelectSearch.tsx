import * as React from "react";
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
import { Typography } from "../../atoms/Typography";
import { TextInput } from "../../atoms/TextInput";

import { SearchIcon } from "lucide-react";

// --- TYPES ---

export interface SearchSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SearchSelectGroup {
  label?: string;
  items: SearchSelectItem[];
}

export interface SelectSearchProps {
  /** Controlled value */
  $value?: string;
  /** Default value for uncontrolled mode */
  $defaultValue?: string;
  /** Callback when value changes */
  $onValueChange?: (value: string) => void;
  /** Callback when search value changes */
  $onSearchChange?: (searchValue: string) => void;
  /** Items to display - either a flat array or grouped array */
  $items?: SearchSelectItem[];
  /** Grouped items */
  $groups?: SearchSelectGroup[];
  /** Placeholder text */
  placeholder?: string;
  /** Search placeholder text */
  $searchPlaceholder?: string;
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

export const SelectSearch = React.forwardRef<HTMLButtonElement, SelectSearchProps>(
  (
    {
      $value,
      $defaultValue,
      $onValueChange,
      $onSearchChange,
      $items = [],
      $groups,
      placeholder = "Select...",
      $searchPlaceholder = "Search...",
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
    const [searchValue, setSearchValue] = React.useState("");

    const debouncedSearchChange = React.useCallback(
      (val: string) => {
        if ($onSearchChange) {
          $onSearchChange(val);
        }
      },
      [$onSearchChange]
    );

    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        debouncedSearchChange(val);
      }, 300);
    };

    // Prevent Radix Select from doing its own typing selection
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key !== "Escape") {
        e.stopPropagation();
      }
    };

    const hasGroups = $groups && $groups.length > 0;

    // Filter locally if onSearchChange is not provided
    let filteredGroups = $groups;
    let filteredItems = $items;

    if (!$onSearchChange && searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      if (hasGroups) {
        filteredGroups = $groups!.map((group) => ({
          ...group,
          items: group.items.filter(
            (item) =>
              item.label.toLowerCase().includes(lowerSearch) ||
              item.value.toLowerCase().includes(lowerSearch)
          ),
        })).filter((group) => group.items.length > 0);
      } else {
        filteredItems = $items.filter(
          (item) =>
            item.label.toLowerCase().includes(lowerSearch) ||
            item.value.toLowerCase().includes(lowerSearch)
        );
      }
    }

    const displayItems = hasGroups ? [] : filteredItems;

    return (
      <div className={cn("flex flex-col", $fullWidth ? "w-full" : "max-w-91 min-w-64", className)}>
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
          onValueChange={(val: string | null) => {
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
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="w-(--radix-select-trigger-width)">
            <div className="bg-primary-0 dark:bg-primary-900 p-1 border-b border-primary-200 dark:border-primary-700 mb-2">
              <TextInput
                $size="md"
                type="text"
                $startIcon={<SearchIcon />}
                placeholder={$searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                $fullWidth
                className="min-w-0"
              />
            </div>
            {hasGroups ? (
              <>
                {filteredGroups!.length === 0 ? (
                  <div className="py-6 text-center text-sm text-primary-500 dark:text-primary-400">
                    No options found
                  </div>
                ) : (
                  filteredGroups!.map((group, index) => (
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
                  ))
                )}
              </>
            ) : (
              <>
                {displayItems.length === 0 ? (
                  <div className="py-6 text-center text-sm text-primary-500 dark:text-primary-400">
                    No options found
                  </div>
                ) : (
                  displayItems.map((item) => (
                    <SelectItemPrimitive
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </SelectItemPrimitive>
                  ))
                )}
              </>
            )}
          </SelectContent>
        </SelectPrimitive>
      </div>
    );
  }
);

SelectSearch.displayName = "SelectSearch";
