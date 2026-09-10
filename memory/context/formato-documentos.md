# Formato de documentos legales (boletos, cesiones, reservas, contratos de locación/mutuo, adendas, etc.)

Reglas de estilo pedidas por Marcelo (aplicar siempre, sin que haga falta repetirlas):

- **Texto justificado** en todo el cuerpo del documento.
- **Negrita** en los datos importantes: nombres de las partes, fechas, números
  de documento (DNI/CUIT/matrícula), montos, títulos del documento y títulos
  de cada cláusula (PRIMERA, SEGUNDA, etc.).
- **Interlineado 1,5** en todo el cuerpo del documento.
- **Un renglón en blanco entre cada cláusula** (separación clara entre una
  cláusula y la siguiente).

Aplica a cualquier documento tipo contrato: boletos de compraventa, cesiones,
reservas, aceptaciones, contratos de locación, mutuos, pagarés, adendas y
similares — tanto si se generan como Google Doc (usar HTML con
`style="text-align:justify"`, `<b>` en los datos importantes, y
`line-height:1.5` / un `<p>` vacío entre cláusulas) como si se generan como
`.docx` con la skill `docx` (usar `bold: true` en los `TextRun` de docx-js
para los datos importantes, `alignment: AlignmentType.JUSTIFIED` y
`spacing: { line: 360 }` —240 = interlineado simple, por lo que 360 ≈ 1,5—
en los párrafos del cuerpo, y un párrafo vacío entre cada cláusula).
