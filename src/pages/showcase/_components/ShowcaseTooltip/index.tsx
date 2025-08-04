import React, { useEffect, useState, useRef, JSX } from 'react';
import ReactDOM from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  arrow,
  FloatingArrow,
  Placement,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';
import styles from './styles.module.css';

interface Props {
  anchorEl?: HTMLElement | string;
  id: string;
  text: string;
  delay?: number;
  placement?: Placement;
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
}

export default function Tooltip({
  children,
  id,
  anchorEl,
  text,
  delay = 400,
  placement = 'top',
}: Props): JSX.Element {
  const [open, setOpen] = useState(false);
  const [container, setContainer] = useState<Element | null>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      offset(8),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const tooltipId = `${id}_tooltip`;

  useEffect(() => {
    if (!anchorEl) {
      setContainer(document.body);
      return;
    }

    const newContainer =
      typeof anchorEl === 'string'
        ? document.querySelector(anchorEl)
        : anchorEl;

    setContainer(newContainer);
  }, [anchorEl]);

  const childWithProps = React.isValidElement(children)
    ? React.cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
        'aria-describedby': open ? tooltipId : undefined,
      })
    : children;

  return (
    <>
      {childWithProps}
      {container &&
        open &&
        ReactDOM.createPortal(
          <div
            id={tooltipId}
            ref={refs.setFloating}
            className={styles.tooltip}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {text}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              className={styles.tooltipArrow}
            />
          </div>,
          container
        )}
    </>
  );
}
