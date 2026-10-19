# Plan de capacitaciones — estado y decisiones

Memoria de trabajo para retomar en una sesión nueva. Complementa
`memory/context/capacitaciones.md` (cómo funciona el sistema de decks) con lo
que se decidió sobre **qué** capacitaciones hacer. Última actualización:
2026-10-03.

## Cómo trabaja Marce en este frente

- Las capacitaciones son para **todo el equipo** (industrial y residencial),
  salvo que diga lo contrario.
- Claude es operador pleno: lee el material, propone estructura, genera el
  deck, hace el QA visual, commitea y pushea. Marce revisa el resultado.
- Voz: voseo argentino, directo. En mensajes a empleados y en reglas para el
  equipo se usan declaraciones negativas ("No se debe...").
- Cuando algo depende de un criterio suyo que no está escrito (una regla de
  comisión, un uso del mercado), **no se inventa**: se pregunta, o se deja
  marcado como "se acuerda" y se anota en Pendiente.
- Todo agregado propio de Claude que Marce no dictó se marca como tal en las
  notas del orador y en `capacitaciones.md`.

## Índice maestro de capacitaciones

Vive en un Google Doc, **"Capacitaciones Indice"**
(`10Qi-84ygvKPSIW5bKfnowvZca8dZdtUxYLRhbqtrsFA`), leído con el conector de
Drive. Cuatro niveles: Inicial, Intermedio, Avanzado y Especializaciones. Los
decks históricos están en **Canva**; los nuevos, en este repo.

**Marcadas FALTA en el índice:** Introducción al mercado inmobiliario
argentino · La importancia de la captación · Pre-listing · Negociación ·
Role Playing · Relación con el escribano · Manejo de objeciones avanzadas ·
Gestión de cartera de propiedades · Campañas publicitarias.

**A desarrollar (bosquejo en el doc): Proceso de ventas** en 7 pasos:
proyectar (más de un canal), comprometerse con el cliente, identificar la
necesidad (preguntar y escuchar), presentación de ventas ajustada al dolor,
responder objeciones ("recién acá se empieza a vender"), cierre (indicar el
próximo paso) y reventa y referencias.

**Problemas del índice sin corregir** (no se tocó el doc):
1. Links repetidos: "Lado B de las operaciones" apunta al mismo deck que
   "WhatsApp y comunicación"; "Manejo de CRM" apunta al deck de Zonaprop.
2. Contenido vencido: "Actualidad 2025" y "Actualidad Febrero 2026".
3. Impuestos y UVA apuntan a los Canva viejos, no a los decks del repo. Si el
   Canva de Impuestos dice que el ITI sigue vigente, está mal (derogado por
   art. 67, Ley 27.743, julio 2024).
4. Los decks del repo (Impuestos, Prospección, Prospección avanzada, UVA,
   Co-broking) no figuran en el índice.

## Ideas de capacitaciones nuevas (propuestas a Marce)

**Primera tanda (10):** Proceso de ventas · Captación + Pre-listing ·
Tokko Broker (pipeline de 7 estados, SLAs y colores) · Negociación y
objeciones avanzadas · Role Playing con casos reales · Krak Industrial: cómo
se vende una nave · Debida diligencia del inmueble · Marco legal del corretaje ·
Inversores: asesorar a quien compra para renta · Posventa, referidos y reventa.

**Segunda tanda (12), todas nuevas:**
1. Calificación y velocidad de respuesta de leads
2. Gestión por números: KPIs del agente
3. Meta Ads para el agente: pautar una propiedad
4. Marca personal del agente (LinkedIn e Instagram)
5. Propiedades complejas (ocupantes, hipoteca, sucesión, indivisión)
6. Propiedad horizontal: leer un reglamento antes de captar
7. Prevención de lavado de activos para corredores (UIF, Ley 25.246; verificar
   la resolución vigente antes de dictar)
8. Opinión de valor vs. tasación formal
9. Derivación entre unidades: Krak RE, VAV, Rebis y Studio
10. **Co-broking** (hecha)
11. Locaciones comerciales e industriales
12. Onboarding: primeros 30 días del agente nuevo

**Prioridad sugerida por Claude:** #1, #2 y #9 de la segunda tanda. La #9
exige que Marce defina antes la regla de comisión entre unidades del grupo.
**Pregunta abierta:** si arrancar por Proceso de ventas o por Captación.

## Co-broking — qué se hizo y qué se decidió

Deck de **15 slides** en `capacitaciones/co-broking/`
(`npm run co-broking`). Contenido dictado por Marce:

- **Tres formas de compartir:** la bolsa (50 y 50 sobre el total de los
  honorarios, vendedor y comprador), la mitad del honorario del comprador (la
  más habitual) y, a veces, un porcentaje fijo ("te comparten el uno").
- **Por producto:** terrenos, se suele compartir la mitad de todo; departamentos
  residenciales, solo la mitad del comprador. Otros productos: no se dio
  costumbre, el deck dice "se acuerda".
- **Regla uno:** preguntar siempre primero si se comparten honorarios y cuánto.
  No se debe pasar datos, coordinar visita ni mostrar sin haberlo acordado.
- **Dos formas de asegurar el cobro:** por escrito en la reserva, o con un
  convenio de honorarios entre colegas. El convenio sirve cuando hay que
  proteger la identidad de uno de los colegas por el bien de la operación y
  para no hablar de ninguna relación entre marcas. Mail y WhatsApp sirven como
  prueba. El objetivo es prever, no tener que ejecutar cobros.
- **Palanca de negociación (slide 7, agregada el 2026-10-03):** acordar el
  reparto primero da claridad y margen. Se puede ceder (descuento pedido por el
  cliente, o más para el colega en un caso extremo) o pedir más cuando te
  comparten, con argumentos creíbles (el cliente ya pidió descuento, el monto
  no justifica el tiempo, hay un acuerdo con un productor o asesor del cliente).
- **No hay casos reales de conflicto.** Los de la slide 12 son hipotéticos y la
  13 es un taller para juntar los del equipo para la próxima versión.

**Pendiente de validar con Marce antes de dictar:**
1. "A veces te comparten el uno": se interpretó como porcentaje fijo, por
   ejemplo el 1% del valor de la operación.
2. Lectura de "mitad del comprador" en el ejemplo numérico: el colega con la
   propiedad conserva el honorario del vendedor y recibe la mitad del del
   comprador. Los porcentajes del ejemplo (3% a cada parte) son hipotéticos.
3. Regla para naves, locales y alquileres: figura como "se acuerda".
4. Regla de comisión entre unidades del grupo: no definida.
5. La slide 7 agrega que los argumentos deben ser **reales**, no solo
   creíbles: es un matiz de Claude, Marce dijo "creíbles".
6. Ofrecido y no hecho: reflejar la palanca de negociación en el checklist
   final (slide 14) y en el cierre.

## Entorno (para el QA visual)

- `npm install` trae pptxgenjs. `node_modules/` está en `.gitignore`.
- El contenedor no trae Inter ni Impress: `apt-get install -y fonts-inter
  libreoffice-impress`. Sin Impress, LibreOffice falla con "source file could
  not be loaded" aunque el archivo esté bien.
- Si LibreOffice no abre un archivo, probar con
  `-env:UserInstallation=file://<carpeta>/lo-profile`.
- Los archivos temporales del QA van al scratchpad de la sesión, no a `/tmp`.
- Para que Marce vea un deck, enviarle el PDF y el .pptx (el PDF para verlo
  rápido, el .pptx para las notas del orador).
- La base de decks (`capacitaciones/`) venía de la rama
  `claude/tax-training-real-estate-7ajwh6` y se trajo a
  `claude/festive-darwin-yg8jja`.
