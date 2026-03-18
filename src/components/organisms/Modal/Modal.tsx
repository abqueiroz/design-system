import * as React from "react";
import { type Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "../../../lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Typography } from "../../atoms/Typography";
import { Divider } from "../../atoms/Divider";

export type ModalProps = Omit<DialogPrimitive.Root.Props, "children"> &
    Omit<DialogPrimitive.Popup.Props, "children"> & {
        /**
         * The main content or body of the modal. Can also be passed as `children`.
         */
        children?: React.ReactNode;
        /**
         * The trigger element that opens the modal. Optional if controlled (`open` / `onOpenChange`).
         */
        $trigger?: React.ReactNode;
        /**
         * The main title of the modal. Rendered as a `Typography` component if a string is provided.
         */
        $title?: React.ReactNode;
        /**
         * The subtitle or description of the modal. Rendered as a `Typography` component if a string is provided.
         */
        $subtitle?: React.ReactNode;
        /**
         * The main content or body of the modal. Can also be passed as `children`.
         */
        $content?: React.ReactNode;
        /**
         * Content to be rendered in the footer section of the modal.
         */
        $footer?: React.ReactNode;
        /**
         * Whether to show the close ('X') button in the top right corner. Defaults to true.
         */
        $showCloseButton?: boolean;
        /**
         * Whether to show a divider between the header and the body.
         */
        $hasHeaderDivider?: boolean;
        /**
         * Whether to show a divider between the body and the footer.
         */
        $hasFooterDivider?: boolean;
        /**
         * Custom class name for the modal content container.
         */
        contentClassName?: string;
        /**
         * Whether the modal should close when clicking outside. Defaults to true.
         */
        $ShoulCloseWhenClickOutside?: boolean;
    }

export function Modal({
    $trigger,
    $title,
    $subtitle,
    $content,
    $footer,
    $showCloseButton = true,
    $hasHeaderDivider = true,
    $hasFooterDivider = true,
    $ShoulCloseWhenClickOutside = true,
    children,
    contentClassName,
    ...props
}: ModalProps) {
    const hasHeader = !!$title || !!$subtitle;
    const bodyContent = children || $content;

    return (
        <Dialog disablePointerDismissal={!$ShoulCloseWhenClickOutside} {...props}>
            {!!$trigger && <DialogTrigger>{$trigger}</DialogTrigger>}
            <DialogContent
                showCloseButton={$showCloseButton}
                className={cn("sm:max-w-106.25 gap-0!", contentClassName)}

            >
                {hasHeader && (
                    <>
                        <DialogHeader>
                            {!!$title && (
                                <DialogTitle>
                                    {typeof $title === "string" ? (
                                        <Typography $variant="xl" $weight="medium">
                                            {$title}
                                        </Typography>
                                    ) : (
                                        $title
                                    )}
                                </DialogTitle>
                            )}
                            {!!$subtitle && (
                                <DialogDescription>
                                    {typeof $subtitle === "string" ? (
                                        <Typography $variant="sm" className="text-primary-500">
                                            {$subtitle}
                                        </Typography>
                                    ) : (
                                        $subtitle
                                    )}
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {!!$hasHeaderDivider && (
                            <Divider
                                className="w-auto -mx-4"
                            />
                        )}
                    </>
                )}
                {!!bodyContent && <div className="py-4">{bodyContent as React.ReactNode}</div>}

                {!!$footer && (
                    <>
                        {!!$hasFooterDivider && (
                            <Divider
                                className="-mx-4 w-auto"

                            />
                        )}
                        <DialogFooter>
                            {$footer}
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

Modal.displayName = "Modal";
