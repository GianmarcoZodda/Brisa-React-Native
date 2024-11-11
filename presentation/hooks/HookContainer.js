import ThemeContainer from '../screens/ThemeContainer';

export const withThemeContainer = (WrappedComponent) => {
    return (props) => (
      <ThemeContainer>
        <WrappedComponent {...props} />
      </ThemeContainer>
    );
  };