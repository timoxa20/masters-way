import {PropsWithChildren, ReactElement, ReactNode, useState} from "react";
import * as TooltipElem from "@radix-ui/react-tooltip";
import clsx from "clsx";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import styles from "src/component/tooltip/Tooltip.module.scss";

/**
 * Tooltip props
 */
interface TooltipProps {

  /**
   * Tooltip's content
   */
  content: string | ReactNode | ReactElement;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Tooltip's position
   * @default: {@link PositionTooltip.TOP}
   */
  position?: PositionTooltip;

  /**
   * If true - tooltip is not visible
   * @default false
   */
  isInactive?: boolean;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Tooltip component
 */
export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipElem.Provider>
      <TooltipElem.Root
        open={open}
        onOpenChange={setOpen}
      >
        <TooltipElem.Trigger asChild>
          <div
            className={styles.tooltipTrigger}
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            onFocus={() => setTimeout(() => setOpen(true), 0)}
            onBlur={() => setOpen(false)}
          >
            {props.children}
          </div>
        </TooltipElem.Trigger>
        <TooltipElem.Portal>
          {!props.isInactive &&
          <TooltipElem.Content
            className={clsx(styles.tooltipContent, props.className)}
            side={props.position ?? "top"}
            sideOffset={4}
            data-cy={props.dataCy}
          >
            {props.content}
          </TooltipElem.Content>
          }
        </TooltipElem.Portal>
      </TooltipElem.Root>
    </TooltipElem.Provider>
  );
};
