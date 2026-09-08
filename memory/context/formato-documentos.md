# Formato de documentos legales (boletos, cesiones, reservas, contratos de locación/mutuo, adendas, etc.)

Regla de estilo pedida por Marcelo (aplicar siempre, sin que haga falta repetirla):

- **Texto justificado** en todo el cuerpo del documento.
- **Negrita** en los datos importantes: nombres de las partes, fechas, números
  de documento (DNI/CUIT/matrícula), montos, títulos del documento y títulos
  de cada cláusula (PRIMERA, SEGUNDA, etc.).

Aplica a cualquier documento tipo contrato: boletos de compraventa, cesiones,
reservas, aceptaciones, contratos de locación, mutuos, pagarés, adendas y
similares — tanto si se generan como Google Doc como si se generan como
`.docx` con la skill `docx` (usar `bold: true` en los `TextRun` de docx-js
para los datos importantes, y `alignment: AlignmentType.JUSTIFIED` en los
párrafos del cuerpo).
