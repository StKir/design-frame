type SecondaryButtonProps = {
  children: React.ReactNode;
};

export const SecondaryButton = ({ children }: SecondaryButtonProps) => (
  <button type='button' className='pay-btn-secondary'>
    {children}
  </button>
);
