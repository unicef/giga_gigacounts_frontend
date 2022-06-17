import { StyledButton} from './NavItem.css';

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
    <StyledButton style={collapsed ? {paddingLeft: '16px'} : {}}
      {...props} >
      <img src={iconPath}></img>
      {!collapsed && (
        <>
            <p style={{ fontWeight: selected ? 'bold' : 'normal', width: '100%'}}>{label}</p>
            <p style={{ fontWeight: selected ? 'bold' : 'normal'}}>{number}</p>
        </>
      )}
    </StyledButton>
  );
};
