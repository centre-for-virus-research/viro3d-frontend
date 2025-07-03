type TabButtonProps = {
  active: boolean;
  selectTab: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
};

const TabButton: React.FC<TabButtonProps> = ({
  active,
  selectTab,
  children,
}) => {
  const buttonClasses = active
    ? "text-[#4a95c0] border-b border-[#4a95c0]"
    : "text-[#4a95c0]";

  return (
    <button onClick={selectTab}>
      <p
        className={`lg:mr-3 xs:mt-2 xs:px-1 font-semibold hover:text-[#50bde5] ${buttonClasses}`}
      >
        {children}
      </p>
    </button>
  );
};

export default TabButton;