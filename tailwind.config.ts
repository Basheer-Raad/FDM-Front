/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.js",
    "./node_modules/@fullcalendar/**/*",
    "./node_modules/simplebar-vue/**/*",
    "./node_modules/apexcharts/**/*",
    "./node_modules/swiper/**/*",
    "./node_modules/sweetalert2/**/*",
    "./node_modules/@simonwep/pickr/**/*",
    "./node_modules/scroll-hint/js/*",
    "./node_modules/tippy.js/**/*",
    "./node_modules/choices.js/**/*",
    "./node_modules/flatpickr/**/*",
    "./mode_modules/vue3-popper/**/*",
    "./node_modules/datatables.net/**/*",
    "./node_modules/datatables.net-dt/**/*",
    "./node_modules/datatables.net-responsive/**/*"
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    fontFamily: {
      public: ['"Tajawal", sans-serif'],
      tourney: ['"Tourney", sans-serif'],
      remix: ["remixicon"]
    },
    container: {
      center: true
    },
    extend: {
      fontSize: {
        sm: "0.8125rem", //13px
        base: "0.875rem", //14px
        15: "0.9375rem", //15px
        16: "1rem", //16px
        "vertical-menu-item-font-size": "0.875rem"
      },
      colors: {
        // Light mode colors
        body: colors.slate[800],
        "body-bg": colors.slate[50],
        "body-bordered": colors.white,

        //sidebar light
        "vertical-menu": colors.white,
        "vertical-menu-border": colors.slate[200],
        "vertical-menu-item": colors.slate[400],
        "vertical-menu-item-hover": colors.green[500],
        "vertical-menu-item-bg-hover": colors.slate[50],
        "vertical-menu-item-active": colors.green[500],
        "vertical-menu-item-bg-active": colors.slate[50],
        "vertical-menu-sub-item": colors.slate[400],
        "vertical-menu-sub-item-hover": colors.green[500],
        "vertical-menu-sub-item-active": colors.green[500],

        //sidebar dark
        "vertical-menu-dark": colors.slate[900],
        "vertical-menu-border-dark": colors.slate[800],
        "vertical-menu-item-dark": colors.slate[300],
        "vertical-menu-item-hover-dark": colors.green[500],
        "vertical-menu-item-bg-hover-dark": colors.slate[800],
        "vertical-menu-item-active-dark": colors.green[500],
        "vertical-menu-item-bg-active-dark": colors.slate[800],
        "vertical-menu-sub-item-dark": colors.slate[300],
        "vertical-menu-sub-item-hover-dark": colors.green[500],
        "vertical-menu-sub-item-active-dark": colors.green[500],

        //sidebar brand
        "vertical-menu-brand": colors.slate[900],
        "vertical-menu-border-brand": colors.slate[800],
        "vertical-menu-item-brand": colors.slate[300],
        "vertical-menu-item-hover-brand": colors.green[500],
        "vertical-menu-item-bg-hover-brand": colors.slate[800],
        "vertical-menu-item-active-brand": colors.green[500],
        "vertical-menu-item-bg-active-brand": colors.slate[800],
        "vertical-menu-sub-item-brand": colors.slate[300],
        "vertical-menu-sub-item-hover-brand": colors.green[500],
        "vertical-menu-sub-item-active-brand": colors.green[500],

        //sidebar modern
        "vertical-menu-to-modern": colors.slate[900],
        "vertical-menu-form-modern": colors.slate[900],
        "vertical-menu-border-modern": colors.slate[800],
        "vertical-menu-item-modern": "rgba(255, 255, 255, 0.60)",
        "vertical-menu-item-hover-modern": colors.green[500],
        "vertical-menu-item-bg-hover-modern": colors.slate[800],
        "vertical-menu-item-active-modern": colors.green[500],
        "vertical-menu-item-bg-active-modern": colors.slate[800],
        "vertical-menu-sub-item-modern": "rgba(255, 255, 255, 0.50)",
        "vertical-menu-sub-item-hover-modern": colors.green[500],
        "vertical-menu-sub-item-active-modern": colors.green[500],

        //TOPBAR
        topbar: colors.white,
        "topbar-border": colors.slate[200],
        "topbar-item": colors.slate[700],
        "topbar-item-hover": colors.green[500],
        "topbar-item-bg-hover": colors.slate[50],

        "topbar-dark": colors.slate[900],
        "topbar-border-dark": colors.slate[800],
        "topbar-item-dark": colors.slate[300],
        "topbar-item-hover-dark": colors.green[500],
        "topbar-item-bg-hover-dark": colors.slate[800],

        "topbar-brand": colors.slate[900],
        "topbar-border-brand": colors.slate[800],
        "topbar-item-brand": colors.slate[300],
        "topbar-item-hover-brand": colors.green[500],
        "topbar-item-bg-hover-brand": colors.slate[800],

        "topbar-modern": colors.white,

        custom: {
          50: colors.slate[50],
          100: colors.slate[100],
          200: colors.slate[200],
          300: colors.slate[300],
          400: colors.slate[400],
          500: colors.slate[500],
          600: colors.slate[600],
          700: colors.slate[700],
          800: colors.slate[800],
          900: colors.slate[900],
          950: colors.slate[950]
        },
        red: {
          50: colors.red[50],
          100: colors.red[100],
          200: colors.red[200],
          300: colors.red[300],
          400: colors.red[400],
          500: colors.red[500], // Using Tailwind's color palette
          600: colors.red[600],
          700: colors.red[700],
          800: colors.red[800],
          900: colors.red[900],
          950: colors.red[950]
        },
        green: {
          50:  "#f6fae8",
          100: "#e9f3c5",
          200: "#d6e88e",
          300: "#c1db5a",
          400: "#afd43a",
          500: "#94c93c", // main accent
          600: "#7ca82e",
          700: "#678a25",
          800: "#536b1d",
          900: "#425616",
          950: "#232e08"
        },

        yellow: {
          50: colors.yellow[50],
          100: colors.yellow[100],
          200: colors.yellow[200],
          300: colors.yellow[300],
          400: colors.yellow[400],
          500: colors.yellow[500], // Using Tailwind's color palette
          600: colors.yellow[600],
          700: colors.yellow[700],
          800: colors.yellow[800],
          900: colors.yellow[900],
          950: colors.yellow[950]
        },

        orange: {
          50: colors.orange[50],
          100: colors.orange[100],
          200: colors.orange[200],
          300: colors.orange[300],
          400: colors.orange[400],
          500: colors.orange[500], // Using Tailwind's color palette
          600: colors.orange[600],
          700: colors.orange[700],
          800: colors.orange[800],
          900: colors.orange[900],
          950: colors.orange[950]
        },

        sky: {
          50: colors.sky[50],
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500], // Using Tailwind's color palette
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900],
          950: colors.sky[950]
        },

        purple: {
          50: colors.purple[50],
          100: colors.purple[100],
          200: colors.purple[200],
          300: colors.purple[300],
          400: colors.purple[400],
          500: colors.purple[500], // Using Tailwind's color palette
          600: colors.purple[600],
          700: colors.purple[700],
          800: colors.purple[800],
          900: colors.purple[900],
          950: colors.purple[950]
        },

        zink: {
          50: "#E2EAF3",
          100: "#C8D7E9",
          200: "#92AFD3",
          300: "#5885BC",
          400: "#395F8E",
          500: "#233A57",
          600: "#1C2E45",
          700: "#132337",
          800: "#0F1824",
          900: "#070C12",
          950: "#030507"
        }
      },
      spacing: {
        header: "4.375rem", // 70px
        "vertical-menu": "16.25rem", // 260px
        "vertical-menu-md": "10.3125rem", // 165px
        "vertical-menu-sm": "4.375rem" // 70px
      },
      maxWidth: {
        boxed: "87.5rem" // 1400px
      },
      minHeight: {
        sm: "1650px" // 1650px
      },
      height: {
        heademainChatListr: "2px"
      },
      zIndex: {
        drawer: "1050"
      },
      backgroundImage: {
        "auth-pattern": "url('../images/auth-bg.jpg')",
        "auth-pattern-dark": "url('../images/auth-bg-dark.jpg')"
      },
      animation: {
        icons: "iconsAnimation 50s",
        progress: "progressAnimation 2s"
      },
      keyframes: {
        iconsAnimation: {
          to: { strokeDashoffset: "500" }
        },
        progressAnimation: {
          "0%": {
            width: "0"
          }
        }
      },
      aspectRatio: {
        "1/1": "1 / 1",
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "21/9": "21 / 9"
      },
      clipPath: {
        triangle: "polygon(50% 0%, 0% 100%, 100% 100%)"
      }
    }
  },
  plugins: [
    require("./plugins/headings.ts"),
    require("./plugins/buttons.ts"),
    require("./plugins/forms.ts"),
    require("./plugins/card.ts"),
    require("./plugins/drawer.ts"),
    //third party libraries
    require("./plugins/flatpicker.ts"),
    require("./plugins/simplebar.ts"),
    require("./plugins/sweetalert2.ts"),
    require("./plugins/swiper.ts"),
    require("./plugins/tippy.ts"),
    require("./plugins/toastify.ts"),
    require("./plugins/choices.ts"),
    require("./plugins/dropzone.ts"),
    require("./plugins/colorpicker.ts"),
    require("./plugins/ckeditor.ts"),
    require("./plugins/datatable.ts"),
    require("./plugins/apexcharts.ts"),
    require("./plugins/maps.ts"),
    require("./plugins/listjs.ts"),
    require("./plugins/scroll-hint.ts"),
    require("./plugins/multijs.ts"),
    require("./plugins/fullcalendar.ts"),
    require("./plugins/lightbox.ts"),
    require("./plugins/prismjs.ts"),
    require("./plugins/vanilla-calendar.ts"),
    // //apps pages
    require("./plugins/apps.ts"),
    require("./plugins/custom.ts")
  ]
};
