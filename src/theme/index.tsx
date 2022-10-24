import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#3A79F9",
    200: "#ECEFF8",
    300: "#D8E4FE",
    400: "#BAD0FD",
    500: "#9DBCFC",
  },
  grey: {
    50: "#F5F7F9",
    100: "#F3F4F8",
    150: "#f2f2f2",
    200: "#D2D4DA",
    300: "#B3B5BD",
    350: "#ECEFF8",
    400: "#9496A1",
    500: "#777986",
    600: "#5B5D6B",
    700: "#404252",
    800: "#282A3A",
    900: "#101223",
  },
  text: {
    main: "#000000",
  },
};

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 976,
      xl: 1200,
    },
  },
  palette: {
    primary: colors.primary,
    secondary: { main: "#fff" },
    grey: colors.grey,
    success: { main: "#34C759" },
    error: { main: "#FF3B30" },
    warning: { main: "#FFCC00", dark: "#F7BA1E" },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.08)!important",
          borderRadius: "12px !important",
        },
        list: {
          padding: "4px 0",
          li: {
            padding: "12px 24px",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "noStyle" },
          style: {
            color: colors.text.main,
          },
        },
      ],
      styleOverrides: {
        root: {
          color: colors.primary.main,
          borderColor: colors.primary.main,
          fontSize: "16px",
          lineHeight: "24px",
          padding: "12px 16px",
          textTransform: "none",
          borderRadius: "16px",
          minHeight: "auto",
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          padding: "16px",
          fontSize: "18px",
          lineHeight: "24px",
        },
        sizeSmall: {
          padding: "10px 16px",
          fontSize: "14px",
          lineHeight: "20px",
        },
        contained: {
          color: "#FFFFFF",

          "&.Mui-disabled": {
            backgroundColor: colors.primary[400],
            color: "#FFFFFF",
          },
        },
        containedInherit: {
          backgroundColor: colors.grey[100],
          color: colors.primary.main,

          "&:hover": {
            backgroundColor: colors.grey[100],
          },

          "&.Mui-disabled": {
            backgroundColor: colors.grey[50],
            color: colors.primary[500],
          },
        },
        containedSecondary: {
          backgroundColor: colors.primary[300],
          color: colors.primary.main,

          "&:hover": {
            backgroundColor: colors.primary[500],
          },

          "&.Mui-disabled": {
            backgroundColor: colors.primary[300],
            color: colors.primary[500],
          },
        },
        outlinedInherit: {
          color: colors.grey[400],
          borderColor: colors.primary[200],
        },
        outlined: {
          "&.Mui-disabled": {
            color: colors.primary[500],
            borderColor: colors.primary[500],
          },
        },
        text: {
          "&.Mui-disabled": {
            color: colors.primary[500],
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    allVariants: {
      margin: 0,
    },
    h1: {
      fontSize: "60px",
      fontWeight: 600,
      lineHeight: "68px",
    },
    h2: {
      fontSize: "34px",
      fontWeight: 600,
      lineHeight: "48px",
    },
    h3: {
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: "38px",
    },
    h4: {
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: "30px",
    },
    h5: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "28px",
    },
    h6: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: "24px",
    },
    subtitle1: {
      fontSize: "28px",
      fontWeight: 500,
      lineHeight: "38px",
    },
    subtitle2: {
      fontSize: "22px",
      fontWeight: 500,
      lineHeight: "30px",
    },
    subtitle3: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "28px",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    body2: {
      fontSize: "14px",
      lineHeight: "20px",
    },
    caption: {
      fontSize: "12px",
      lineHeight: "16px",
    },
    caption2: {
      fontSize: "11px",
      lineHeight: "14px",
    },
    caption3: {
      fontSize: "10px",
      lineHeight: "12px",
    },
  },
});

export type CustomizedTheme = typeof theme;

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    subtitle3: React.CSSProperties;
    caption2?: React.CSSProperties;
    caption3?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    caption2: true;
    caption3: true;
  }
}

declare module "@mui/material" {
  interface Color {
    50: string;
    100: string;
    200: string;
    300: string;
    350: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    noStyle: true;
  }
}

declare module "@emotion/react" {
  export interface Theme extends CustomizedTheme {}
}
