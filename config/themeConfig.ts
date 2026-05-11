export type ThemeConfig = typeof themeConfig;

export const themeConfig = {
  accentColor: "[#F08135]",
  gradientColor: {
    primary: "rgba(240, 129, 53, 0.07)",
    secondary: "rgba(240, 129, 53, 0.04)",
    tertiary: "rgba(240, 129, 53, 0.02)",
    transparent: "rgba(240, 129, 53, 0)",
  },
  stripeColor: "rgba(255, 255, 255, 0.02)",
  borderColor: "gray-800",
  buttonColor: { base: "orange-500", hover: "orange-600" },
  linkColor: { base: "orange-500", hover: "orange-600" },
  focusBorderColor: "orange-500",
};
