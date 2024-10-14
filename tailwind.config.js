/** @type {import('tailwindcss').Config} */
export const mode = "jit";
export const content = ["./*.{html,js}"];
export const theme = {
    extend: {
        fontFamily: {
            inter: ["Inter", "sans-serif"],
        },
    },
};
export const plugins = [require("daisyui")];