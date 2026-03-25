import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    '!border-[#171922] !bg-[#171922] !text-white hover:!border-[#171922] hover:!bg-[#171922] hover:!text-white',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border border-zinc-900 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] transition',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
