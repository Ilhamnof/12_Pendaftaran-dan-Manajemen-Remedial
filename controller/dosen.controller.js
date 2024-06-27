const PDFDocument = require('pdfkit');
const { Mahasiswa, UjianRemedial, PendaftaranUjian } = require("../models");

const updateNilai = async (req, res) => {
    try {
        const nilaiBaru = req.body.nilaiBaru;
        console.log('Nilai Baru:', nilaiBaru); 
        const id = req.body.idnilai;
        console.log('ID:', id); 
        
        for (const id in nilaiBaru) {
            if (nilaiBaru.hasOwnProperty(id)) {
                console.log(`Updating ID: ${id}, New Value: ${nilaiBaru[id]}`); 
                await PendaftaranUjian.update(
                    { nilai: nilaiBaru[id] },
                    { where: { id: parseInt(id) } } 
                );
            }
        }

        res.redirect('/'); 
    } catch (error) {
        console.error('Error updating nilai:', error);
        res.status(500).send({ success: false, message: 'Error updating nilai', error });
    }
};

const generate = async (req, res) => {
    try {
        const doc = new PDFDocument({ margin: 50 });

        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Nilai Akhir Remedial.pdf');

        doc.pipe(res);

        
        doc.fontSize(12).font('Times-Bold').text('Nilai Akhir Remedial', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Mata Kuliah Pemrograman Berorientasi Objek', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Departemen Sistem Informasi', { align: 'center' });
        doc.fontSize(12).font('Times-Bold').text('Tahun Ajaran Ganjil 2023-2024', { align: 'center' });

        doc.moveDown(2);

        
        const table = {
            headers: ['NIM', 'Nama', 'Prodi', 'Mata Kuliah', 'Nilai Lama', 'Nilai Baru'],
            rows: []
        };

        
        const pendaftaran = await PendaftaranUjian.findAll({
            where: {
                status_verifikasi: 'diverifikasi'
                },
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

        
        drawTable(doc, table);

        
        doc.end();
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send({ success: false, message: 'Error generating PDF', error });
    }
};


function drawTable(doc, table) {
    const startX = 50;
    let startY = 150;
    const rowHeight = 30;
    const colWidths = [80, 120, 90, 90, 65, 65];
    const tableWidth = colWidths.reduce((sum, width) => sum + width, 0);

    
    doc.font('Times-Bold');
    doc.fontSize(11);
    table.headers.forEach((header, i) => {
        const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
        doc.rect(x, startY, colWidths[i], rowHeight).stroke(1);
        doc.text(header, x + 5, startY + 10, {
            width: colWidths[i] - 10,
            align: 'center'
        });
    });

    
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

const getAllPendaftaranVerif = async (req, res, next) => {
    try {
        const userId = req.userId;
        console.log('UserID:', userId);
        const pendaftaran = await PendaftaranUjian.findAll({
            where: {
            status_verifikasi: 'diverifikasi'
            },
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
        console.log('Riwayat:', pendaftaran); 
        res.locals.pendaftaran = pendaftaran;
        next();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { updateNilai,generate,getAllPendaftaranVerif };