import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-bcentx-green !text-white hover:bg-bcentx-green-dark hover:!text-white",
  secondary:
    "border border-bcentx-blue/20 bg-card text-bcentx-blue hover:bg-bcentx-blue-soft",
  ghost:
    "border border-white/40 bg-transparent !text-white hover:bg-white/10 hover:!text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `inline-flex items-center justify-center rounded-md font-semibold no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bcentx-green disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href } = props;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
