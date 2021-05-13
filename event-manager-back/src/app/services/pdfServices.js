const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.buildPdf = async function (user, event) {
  try {
    let doc = new PDFDocument({ size: "A4", margin: 50, layout: 'landscape' });

    doc
      .font('Helvetica-Bold')
      .fontSize(30)
      .text("Certificado de Participação", { align: 'center' })
    doc
      .font('Helvetica')
      .fontSize(18)
      .text("Certifico que", { align: 'center' })
    doc
      .font('Helvetica-Bold')
      .fontSize(20)
      .text(`${user.name}`, { align: 'center' })

    doc
    .font('Helvetica')

      .fontSize(18)
      .text('Participou do evento', { align: 'center' });

    doc
      .font('Helvetica-Bold')
      .fontSize(20)
      .text(`${event.title}`, { align: 'center' });

    doc
    .font('Helvetica')

      .fontSize(18)
      .text(`ministrado por ${event.organizer.name}`, { align: 'center' });

    doc
    .font('Helvetica')

      .fontSize(18)
      .text(`de ${event.initialDate} até ${event.finalDate}, cumprindo carga horária total de 10 horas`,
        { align: 'center' }
      );

    doc.end();
    doc.pipe(fs.createWriteStream(`certificado${user.name}.pdf`));
  } catch(err) {
    return res.status(400).send(err);
  }
};