const PDFDocument = require('pdfkit');
const { Mahasiswa, UjianRemedial, PendaftaranUjian } = require("../models");

const updateNilai = async (req, res) => {
    try {
        const nilaiBaru = req.body.nilaiBaru;
        console.log('Nilai Baru:', nilaiBaru); // Log nilaiBaru untuk memeriksa data
        const id = req.body.idnilai;
        console.log('ID:', id); // Log id untuk memeriksa data
        // Loop untuk memperbarui nilai-nilai
        for (const id in nilaiBaru) {
            if (nilaiBaru.hasOwnProperty(id)) {
                console.log(`Updating ID: ${id}, New Value: ${nilaiBaru[id]}`); // Log setiap pembaruan
                await PendaftaranUjian.update(
                    { nilai: nilaiBaru[id] },
                    { where: { id: parseInt(id) } } // Pastikan id di-parse sebagai integer
                );
            }
        }

        res.redirect('/'); // Redirect ke halaman yang sesuai setelah pembaruan
    } catch (error) {
        console.error('Error updating nilai:', error);
        res.status(500).send({ success: false, message: 'Error updating nilai', error });
    }
};

const generate = async (req, res) => {
    try {
        const doc = new PDFDocument({ margin: 50 });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=nilai_akhir_remedial.pdf');

        doc.pipe(res);

        // Add header
        doc.fontSize(12).font('Times-Bold').text('Nilai Akhir Remedial', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Mata Kuliah Pemrograman Berorientasi Objek', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Departemen Sistem Informasi', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Tahun Ajaran Ganjil 2023-2024', { align: 'center' });

        doc.moveDown(2);

        // Create table
        const table = {
            headers: ['NIM', 'Nama', 'Prodi', 'Mata Kuliah', 'Nilai Lama', 'Nilai Baru'],
            rows: []
        };

        // Fetch data from database
        const pendaftaran = await PendaftaranUjian.findAll({
            include: [
                {
                    model: Mahasiswa,
                    as: 'mahasiswa',
                    required : true,
                },
                {
                    model: UjianRemedial,
                    as: 'ujian',
                    required : true,
                }
            ]    
        });

        // Populate table rows
        pendaftaran.forEach((status) => {
            table.rows.push([
                status.mahasiswa.nim,
                status.mahasiswa.nama,
                status.mahasiswa.prodi,
                status.ujian.nama_matkul,
                status.nilai_sebelumnya,
                status.nilai,
            ]);
        });

        // Draw the table
        drawTable(doc, table);

        // Finalize the PDF and end the stream
        doc.end();
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send({ success: false, message: 'Error generating PDF', error });
    }
};

// Helper function to draw the table
function drawTable(doc, table) {
    const startX = 50;
    let startY = 150;
    const rowHeight = 30;
    const colWidths = [80, 120, 90, 90, 65, 65];
    const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);

    // Draw headers
    doc.font('Times-Bold');
    doc.fontSize(11);
    table.headers.forEach((header, i) => {
        const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.rect(x, startY, colWidths[i], rowHeight).stroke();
        doc.text(header, x + 5, startY + 10, {
            width: colWidths[i] - 10,
            align: 'center'
        });
    });

    // Draw rows
    doc.font('Times-Roman');
    doc.fontSize(11);
    table.rows.forEach((row, rowIndex) => {
        startY += rowHeight;
        row.forEach((cell, cellIndex) => {
            const x = startX + colWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
            doc.rect(x, startY, colWidths[cellIndex], rowHeight).stroke();
            doc.text(cell, x + 5, startY + 10, {
                width: colWidths[cellIndex] - 10,
                align: 'left'
            });
        });
    });

    // Draw bottom line of the table
    doc.moveTo(startX, startY + rowHeight)
    .lineTo(startX + tableWidth, startY + rowHeight)
    .stroke();

    const signatureText = 'Padang, ' + (new Date()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const signatureX = startX + tableWidth - doc.widthOfString(signatureText);
    const signatureY = startY + rowHeight + 30;
    const signatureZ = signatureY + 70;

    doc.text(signatureText, signatureX, signatureY);
    doc.text('Dosen Pengampu', signatureX, signatureY + 12);
    doc.text('Ilham Nofaldi', signatureX, signatureZ);
    doc.text('NIP. 12131273124', signatureX, signatureZ + 12);
}


// const updateNilai = async (req, res) => {
//     try {
//         const update = [];

//         for (let key in req.body) {
//             if (key.startsWith('nilaiBaru')) {
//                 const id = key.split('_')[1];
//                 const newValue = req.body[key];

//                 update.push({ id, value: newValue });

//                 // Corrected update call
//                 await PendaftaranUjian.update(
//                     { value: newValue },
//                     { where: { id } }
//                 );
//             }
//         }

//         res.status(200).send({ success: true, message: 'Nilai updated successfully' });
//     } catch (error) {
//         console.error('Error updating nilai:', error);
//         res.status(500).send({ success: false, message: 'Error updating nilai', error });
//     }
// };

module.exports = { updateNilai,generate };