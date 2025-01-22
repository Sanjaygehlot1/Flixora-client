/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '490px',
        'max-2xs' : {max: '500px'} 
    },
  },
  plugins: [],
}

}
