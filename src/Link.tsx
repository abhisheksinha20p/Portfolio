import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigate } from './router';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export const Link = ({ to, onClick, ...rest }: LinkProps) => {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    // Let the browser handle new-tab / modified clicks normally.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return <a href={to} onClick={handle} {...rest} />;
};
