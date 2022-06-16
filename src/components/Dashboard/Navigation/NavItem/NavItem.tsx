import { StyledButton, StyledIcon, StyledLabel, StyledContractCount } from './NavItem.css';

interface NavItemProps {
  collapsed?: boolean;
  label: string;
  onClick?: () => void;
  iconPath?: string;
  number?: string;
  selected?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  collapsed = false,
  label,
  number,
  selected,
  iconPath,
  ...props
}: NavItemProps): JSX.Element => {
  return (
    <StyledButton
      style={
        !collapsed
          ? { width: '158px', height: '24px', flexDirection: 'row', gap: '8px' }
          : { width: '58px', height: '24px', flexDirection: 'column', gap: '4px' }
      }
      {...props}
    >
      <StyledIcon alt="icon" src={iconPath}></StyledIcon>
      {!collapsed && (
        <>
          <StyledLabel>
            <p style={{ fontWeight: selected ? 'bold' : 'normal' }}>{label}</p>
          </StyledLabel>

          <StyledContractCount>
            <p>{number}</p>
          </StyledContractCount>
        </>
      )}
    </StyledButton>
  );
};
