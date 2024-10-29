import ThemeContainer from './ThemeContainer';

export const withThemeContainer = (WrappedComponent) => {
    return (props) => (
      <ThemeContainer>
        <WrappedComponent {...props} />
      </ThemeContainer>
    );
  };