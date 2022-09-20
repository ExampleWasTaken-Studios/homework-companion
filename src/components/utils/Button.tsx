interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: string;
  isSecondary?: boolean;
}

export const Button = ({ className, onClick, children, isSecondary }: ButtonProps) => {
  let classes: string;

  if (isSecondary) {
    classes = `button-secondary ${className}`;
  } else {
    classes = `button ${className} `;
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