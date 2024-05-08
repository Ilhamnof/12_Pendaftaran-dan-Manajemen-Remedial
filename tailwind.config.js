/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js,ejs}",
  "./views/Mahasiswa/*.{html,js,ejs}", // Menambahkan folder Mahasiswa
  "./views/Dashboard/*.{html,js,ejs}", // Menambahkan folder Dashboard
  'node_modules/preline/dist/*.js',
],
  
  theme: {
    extend: {
      colors: {
        'hijau': 'rgba(65, 144, 74, 1)',
        'hijauMuda': 'rgba(137, 201, 144, 1)',
        'abu': 'rgba(212, 210, 227, 0.40);',
        
      },
    },
  },
  plugins: [
   
    require('preline/plugin'),
  ],
}

