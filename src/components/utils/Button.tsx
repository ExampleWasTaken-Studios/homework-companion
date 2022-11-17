interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children?: string;
  isSecondary?: boolean;
}

export const Button = ({ className, onClick, disabled, children, isSecondary }: ButtonProps) => {
  let classes: string;

  if (isSecondary) {
    classes = `button-secondary ${className}`;
  } else {
    classes = `button ${className} `;
  }

  if (disabled) {
    classes += "disabled";
    onClick = () => null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      onClick={onClick}
      className={classes}
    >
      {children}
    </a>
  );
};
