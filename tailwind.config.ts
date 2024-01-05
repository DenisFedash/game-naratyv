import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "/globals.scss"`,
      },
    },
  },
  theme: {
    colors: {
      "main-background": "#f7f6f2",
     
      "main-white": "#fefefe",
      "main-grey": "#dadada",
      "main-yellow": "#f7d062",
      "orange": "#fd8d3b",
      "dark-grey": "#5b5b5b",
      "light-grey": "#E8E8E8",
      "gradient": "#dec9ea",
      "hero-text-bg": "#F4EAD8",
      "icon-text-color": "#FFD045",
      "icon-move-color": "#F7EAC6",
      "error-color": "#ff0000",
      "card-bg": "#F7F6F2",

      "main-font-color": "#141515",
      "second-font-color": "#fd8d3b",   
    },
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1440px",
      
    },
    extend: {
      boxShadow: {
        '3xl': '-3px 4px 0px 0px #000',
        'team-shadow': '-10px 10px 0px 0px #FFC727;'
      },
      backgroundImage: {
         "gradient-card": "linear-gradient(180deg, #DEC9EA 0%, rgba(255, 245, 0, 0.00) 100%)",
      }
    },
  },
  plugins: [],
}
export default config
