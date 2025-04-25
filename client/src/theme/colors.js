export const lightColors = {
    base: {
        100: "#ffffff",
        200: "#F6F8FC",
        300: "#edf0f4 ",
        400: "#e3e8ee ",
        500: "#d9e0e8 ",
        600: "#cfd8e2 ",
        700: "#c5d0dc ",
        800: "#bbc8d6 ",
        900: "#b1c0d0 ",
    },
    contrast: {
        100: "#121314",
        200: "#3a3a3b",
        300: "#4a4a4b",
        400: "#424243",
        500: "#4a4a4b",
        600: "#525253",
        700: "#525253",
        800: "#525253",
        900: "#525253",
    },
    primary: {
        100: "#dbf5ee",
        200: "#b7ebde",
        300: "#94e2cd",
        400: "#70d8bd",
        500: "#4cceac",
        600: "#3da58a",
        700: "#2e7c67",
        800: "#1e5245",
        900: "#0f2922",
    },
    secondary: {
        100: "#f8dcdb",
        200: "#f1b9b7",
        300: "#e99592",
        400: "#e2726e",
        500: "#db4f4a",
        600: "#af3f3b",
        700: "#832f2c",
        800: "#58201e",
        900: "#2c100f",
    }
};

export const darkColors = {
    base: {
        100: "#121314",
        200: "#1a1a1b",
        300: "#222223",
        400: "#2a2a2b",
        500: "#323233",
        600: "#3a3a3b",
        700: "#424243",
        800: "#4a4a4b",
        900: "#525253",
    },
    contrast: {
        100: "#ffffff",  // Pure white
        200: "#a6b1c1",  // Slightly off-white
        300: "#4a5361",  // Very light gray
        400: "#2c3037",  // Soft gray
        500: "#1d2025",  // Medium gray
        600: "#16181d",  // Dark gray
        700: "#0f1114",  // Darker gray
        800: "#0a0b0e",  // Very dark gray
        900: "#050506"   // Almost black
    },
    primary: {
        100: "#0f2922",
        200: "#1e5245",
        300: "#2e7c67",
        400: "#3da58a",
        500: "#4cceac",
        600: "#70d8bd",
        700: "#94e2cd",
        800: "#b7ebde",
        900: "#dbf5ee",
    },
    secondary: {
        100: "#2c100f",
        200: "#58201e",
        300: "#832f2c",
        400: "#af3f3b",
        500: "#db4f4a",
        600: "#e2726e",
        700: "#e99592",
        800: "#f1b9b7",
        900: "#f8dcdb",
    }
};

export const getColors = (mode = 'light') =>
    mode === 'dark' ? darkColors : lightColors;