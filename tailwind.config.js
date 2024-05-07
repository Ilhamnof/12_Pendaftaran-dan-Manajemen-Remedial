/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js,ejs}",
  'node_modules/preline/dist/*.js',
],
  
  theme: {
    extend: {
      colors: {
        'hijau': 'rgba(65, 144, 74, 1)',
        
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
}

