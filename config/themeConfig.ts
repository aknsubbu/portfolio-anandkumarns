export type ThemeConfig = typeof themeConfig;

export const themeConfig = {
  accentColor: "white",
  gradientColor: {
    primary: "rgba(34, 200, 34, 0.3)", // Dark green with 0.3 opacity
    secondary: "rgba(34, 200, 34, 0.2)", // Dark green with 0.2 opacity
    tertiary: "rgba(34, 139, 34, 0.1)", // Dark green with 0.1 opacity
    transparent: "rgba(34, 139, 34, 0)", // Dark green fully transparent
  },
  stripeColor: "rgba(255, 255, 255, 0.03)", // Color for vertical stripes
  borderColor: "gray-400",
  buttonColor: {
    base: "emerald-600",
    hover: "emerald-700",
  },
  linkColor: {
    base: "emerald-600",
    hover: "emerald-700",
  },
  focusBorderColor: "emerald-600",
};
