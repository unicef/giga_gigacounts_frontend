import { useHistory } from 'react-router-dom';
import { StyledButton, StyledIcon, NameContainer, Name, NameText, Role } from './ProfileIcon.css';

interface NavItemProps {
  collapsed?: boolean;
  name?: string;
  onClick?: () => void;
  role?: string;
}

export const ProfileIcon: React.FC<NavItemProps> = ({
  collapsed = false,
  name,
  role,
  ...props
}: NavItemProps): JSX.Element => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('session');
    history.push('/');
  };

  return (
    <StyledButton
      style={!collapsed ? { width: '174px', height: '40px', alignSelf: 'stretch' } : { width: '40px', height: '40px' }}
      {...props}
    >
      <StyledIcon alt="icon" src="./utils/profilePlaceholder.svg"></StyledIcon>
      {!collapsed && (
        <NameContainer>
          <Name>
            <NameText>
              <b>{name?.substring(0, 8)}</b>
            </NameText>
            <img style={{ cursor: 'pointer' }} onClick={logout} alt="logout" src="./utils/logout.svg"></img>
          </Name>
          <Role>{role}</Role>
        </NameContainer>
      )}
    </StyledButton>
  );
};
