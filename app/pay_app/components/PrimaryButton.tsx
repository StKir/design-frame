type PrimaryButtonProps = {
  children: React.ReactNode;
  href?: string;
};

export const PrimaryButton = ({ children, href }: PrimaryButtonProps) => {
  if (href) {
    return (
      <a href={href} className='pay-btn-primary' style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
        {children}
      </a>
    );
  }

  return (
    <button type='button' className='pay-btn-primary'>
      {children}
    </button>
  );
};
