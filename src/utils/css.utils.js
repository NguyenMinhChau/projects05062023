export const useCssApp = () => {
  const shadowCss = (options = {}) => {
    const {
      shadowColor = '#000',
      width = 0,
      height = 1,
      shadowOpacity = 0.18,
      shadowRadius = 1.0,
      elevation = 3,
    } = {...options};
    return {
      shadowColor: shadowColor,
      shadowOffset: {
        width: width,
        height: height,
      },
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
      elevation: elevation, // android
    };
  };

  return {
    shadowCss,
  };
};
