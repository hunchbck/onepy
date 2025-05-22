export interface NavigationProps {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username?: string;
  name?: string;
  avatar?: string | null;
}
