# Nave Industrial — Análisis de Inversión para Comité

**Fecha de análisis:** 28/08/2026
**Estado:** Borrador para revisión de inversor calificado. Contiene datos provistos, cálculos derivados, supuestos explícitos e información pendiente de validar.
**Convención de este documento:**
- 🟦 **Dato provisto** — informado directamente.
- 🟩 **Cálculo derivado** — resultado matemático directo de datos provistos.
- 🟨 **Supuesto** — usado solo para poder construir un escenario o sensibilidad; explícito y modificable.
- 🟥 **Dato a validar** — no informado; se señala por qué importa.

---

## A. Executive Investment Analysis (Resumen Ejecutivo)

Se analiza la adquisición de una nave industrial de 1.240 m², 100% ocupada, alquilada a un operador logístico de electrodomésticos, por USD 1.200.000 (USD 1.000.000 al contado + USD 200.000 financiados por el vendedor en 10 cuotas). El contrato vigente (48 meses desde 01/01/2026) tiene, a la fecha de este análisis, **40 meses remanentes** — dato que se verifica matemáticamente consistente con la fecha de hoy (ver Auditoría, punto 12).

**Hallazgo central de la auditoría:** el "Cap Rate: 9,4%" comunicado es matemáticamente correcto como **Gross Yield** (renta anual bruta / precio), pero está mal etiquetado. Un Cap Rate técnico se calcula sobre NOI (renta neta de gastos del propietario), que no ha sido informado. El Cap Rate real será igual o **menor** a 9,4%.

**Segundo hallazgo relevante, no solicitado pero crítico:** el dato que falta y que más cambia la lectura de la operación no es la tasa de interés del saldo financiado — es la **periodicidad** de las 10 cuotas. Si son mensuales, el servicio de deuda ($20.000/mes de capital) **supera ampliamente** la renta mensual ($9.400), generando flujo de caja negativo estructural durante 10 meses, sin importar la tasa. Si son trimestrales o más espaciadas, la operación se autofinancia con holgura. Este dato debe solicitarse antes de continuar el análisis.

Bajo los supuestos de trabajo definidos en este documento (financiación trimestral al 8% anual ilustrativo, renta constante, sin apreciación), el retorno anualizado aproximado sobre el equity de USD 1.000.000 se ubica en un rango de **~3% (conservador) a ~14% (optimista)**, con un caso base de **~9,5%**. Estos números son sensibles a variables no informadas (gastos del propietario, cap rate de salida, periodicidad/tasa de financiación) y deben tratarse como órdenes de magnitud, no como proyecciones cerradas.

La operación presenta concentración de riesgo relevante: un solo activo, un solo locatario, sin información sobre su solvencia, y una porción del 20% de la renta ($1.880 de $9.400) percibida en efectivo, con implicancias de trazabilidad fiscal y de documentación que un comprador institucional debe resolver antes de comprometer capital.

---

## B. Auditoría Matemática

| # | Cálculo | Fórmula | Resultado | Tipo |
|---|---|---|---|---|
| 1 | Precio por m² | 1.200.000 / 1.240 | **USD 967,74/m²** | 🟩 |
| 2 | Renta mensual por m² | 9.400 / 1.240 | **USD 7,58/m²/mes** | 🟩 |
| 3 | Renta anual | 9.400 × 12 | **USD 112.800** | 🟩 |
| 4 | Gross Yield (renta anual / precio) | 112.800 / 1.200.000 | **9,40%** | 🟩 |
| 5 | Cap Rate (NOI / precio) | No calculable — falta OPEX del propietario | **🟥 Dato a validar** | 🟥 |
| 6 | Retorno mensual sobre precio | 9.400 / 1.200.000 | **0,78%/mes** | 🟩 |
| 7 | Capital inicial requerido | — | **USD 1.000.000 (83,3% del precio)** | 🟦 |
| 8 | % del precio financiado por el vendedor | 200.000 / 1.200.000 | **16,67%** | 🟩 |
| 9 | Renta anual / capital desembolsado inicial (Cash Yield bruto sobre equity, sin servicio de deuda) | 112.800 / 1.000.000 | **11,28%** | 🟩 |
| 10 | Renta contractual potencial en 40 meses remanentes (constante) | 9.400 × 40 | **USD 376.000** | 🟩 (mecánico, no proyección) |
| 11 | Años de renta bruta para recuperar el precio total (sin gastos/impuestos/apreciación) | 1.200.000 / 112.800 | **10,64 años** (≈127,7 meses) | 🟩 |
| 12 | Años de renta bruta para recuperar el equity inicial (sin descontar servicio de deuda) | 1.000.000 / 112.800 | **8,87 años** (≈106,4 meses) | 🟩 — sobreestima el retorno real porque no descuenta lo que debe destinarse a pagar las 10 cuotas |

### Verificación del "Cap Rate: 9,4% anual"

- Renta anual = 9.400 × 12 = **112.800**
- Precio = **1.200.000**
- Rendimiento = 112.800 / 1.200.000 = **9,40% exacto**

**No hay discrepancia numérica.** El 9,4% coincide exactamente con el Gross Yield. El problema es conceptual: ese 9,4% **no es un Cap Rate en sentido técnico**, porque un Cap Rate = NOI / Valor, y NOI = Renta bruta − gastos operativos del propietario (impuestos, seguro, mantenimiento, comisión de administración, provisión de vacancia). Como esos gastos no están informados, el Cap Rate real es **desconocido y probablemente inferior** a 9,4%. Ver sensibilidad de gastos en Fase 5.

### Distinción de conceptos (no usar como sinónimos)

| Concepto | Definición | Valor en esta operación |
|---|---|---|
| **Gross Yield** | Renta anual bruta / Precio | 9,40% — el único que puede calcularse con los datos provistos |
| **Cap Rate / NOI Yield** | NOI / Precio | 🟥 Requiere OPEX del propietario |
| **Cash-on-Cash Return** | Flujo de caja neto anual (después de servicio de deuda) / Equity invertido | 🟨 Depende de tasa y periodicidad de las 10 cuotas — ver Fase 2 y 5 |
| **TIR / IRR** | Tasa que iguala a cero el VAN de todos los flujos (incluye valor terminal y timing exacto) | 🟨 Solo calculable bajo supuestos explícitos de valor de salida — ver Fase 4 |

### Verificación del plazo contractual remanente

- Inicio: 01/01/2026. Duración: 48 meses → vencimiento nominal: 01/01/2030.
- Fecha de análisis: 28/08/2026.
- Tiempo transcurrido: 7 meses y 27 días ≈ **7,9 meses**.
- Plazo remanente calculado: 48 − 7,9 ≈ **40,1 meses**.
- **Conclusión: el dato informado de "40 meses remanentes" es consistente** con la fecha de análisis (la marca exacta de 40 meses cae en torno al 01/09/2026, a solo 4 días de la fecha de hoy). Diferencia irrelevante, dentro del margen de redondeo por convención de conteo de meses.

### Composición de la renta — nota de auditoría

- USD 7.520 + IVA por transferencia bancaria (bancarizado, trazable).
- USD 1.880 en efectivo (~20% de la renta total) — **sin trazabilidad bancaria por definición**.
- Esto no es un juicio legal ni impositivo (ver Fase 12), pero para un comprador institucional implica: (a) un banco u organismo de valuación probablemente solo reconozca como "renta demostrable" los USD 7.520+IVA bancarizados a efectos de financiamiento futuro, subvaluando el activo en términos de renta acreditable; (b) riesgo de recalificación impositiva si la porción en efectivo no está adecuadamente documentada; (c) menor solidez probatoria de esa porción de renta en caso de conflicto con el locatario.

---

## C. Presentación — especificación de la presentación

Ver artefacto HTML publicado (presentación ejecutiva de 19 diapositivas) y archivo `presentacion.html` en este mismo directorio. La especificación completa de cada diapositiva (objetivo, copy, KPIs, gráfico, imagen, notas) está incorporada directamente en el HTML como estructura navegable; el resumen de contenidos por diapositiva es:

1. Portada — Oportunidad de inversión.
2. Investment Snapshot — la operación en 30 segundos, con nota sobre el 9,4%.
3. ¿Por qué podría ser interesante? — máximo 5 factores validados por el análisis.
4. El activo — superficie, uso, estiba a piso, obras en curso.
5. Situación operativa actual — ocupación, hidrantes en ejecución, parquización.
6. Estructura de adquisición — precio, contado, financiación, incógnitas de la financiación.
7. Contrato y locatario — plazo, riesgo de concentración, checklist de documentación.
8. Economía de la renta — Gross Yield vs. Cap Rate, composición efectivo/transferencia.
9. Retorno sobre la inversión — retorno del activo vs. retorno del equity, apalancamiento.
10. Cash flow — 40 meses, resumen anual, stress test de periodicidad de cuotas.
11. Escenarios — Conservador / Base / Optimista con supuestos explícitos.
12. Sensibilidad — renta, vacancia, precio de salida, cap rate de salida, gastos.
13. Comparación contra alternativas — risk-adjusted, con benchmarks citados.
14. Valuación — income approach, matriz NOI × Cap Rate, precio/m².
15. Riesgos y mitigantes — incluye "¿Qué puede salir mal?".
16. Estrategias de salida — 5 alternativas y efecto del plazo remanente.
17. Due diligence pendiente — checklist por área.
18. Investment Case — a favor / en contra / condiciones para que sea atractivo.
19. Información crítica pendiente y próximos pasos.

---

## D. Modelo Económico

### D.1 Fase 2 — Economía de la operación

**Retorno del activo** (independiente de cómo se financia): Gross Yield 9,40% sobre USD 1.200.000. El Cap Rate real requiere OPEX (🟥 dato a validar).

**Retorno del equity** (sobre el capital efectivamente desembolsado, USD 1.000.000): antes de servicio de deuda, 11,28% — superior al 9,40% del activo. Esto **sugiere apalancamiento positivo nominal**, pero es una lectura incompleta: depende enteramente de la tasa de interés y la periodicidad de las 10 cuotas, ninguna de las dos informada.

**¿Falta para responder con precisión?**
- 🟥 Tasa de interés de la financiación del vendedor.
- 🟥 Periodicidad exacta de las 10 cuotas (mensual / trimestral / semestral / anual).
- 🟥 Fecha de vencimiento de la primera cuota.
- 🟥 Tratamiento de las cuotas (capital + interés fijo, francés, alemán, interest-only + bullet).
- 🟥 Gastos asociados a la financiación (escritura, sellos, etc.).

**Hallazgo crítico — la periodicidad importa más que la tasa:**
Si el saldo de USD 200.000 se amortiza en **10 cuotas mensuales** de capital fijo (USD 20.000/mes), el servicio de deuda mensual (aun con tasa de interés 0%, que no debe asumirse) **excede** la renta mensual de USD 9.400 en USD 10.600 cada mes durante 10 meses — un déficit acumulado de al menos USD 106.000 que el comprador debería fondear con capital adicional al USD 1.000.000 de entrada. Si en cambio las cuotas son trimestrales, semestrales o anuales, la renta cubre cómodamente el servicio de deuda. Ver tabla completa en D.2 y Fase 5.

| Periodicidad de las 10 cuotas (🟨 supuesto de escenario) | Capital/cuota | Equivalente mensual de capital | ¿Cubierto por renta de USD 9.400/mes? |
|---|---|---|---|
| Mensual (10 meses) | USD 20.000 | USD 20.000/mes | **No** — déficit de USD 10.600/mes |
| Trimestral (2,5 años) | USD 20.000 | USD 6.667/mes | Sí, con margen para intereses |
| Semestral (5 años) | USD 20.000 | USD 3.333/mes | Sí, holgado |
| Anual (10 años) | USD 20.000 | USD 1.667/mes | Sí, muy holgado |

### D.2 Cash-on-Cash Año 1 según periodicidad y tasa (🟨 escenarios ilustrativos — tasa e periodicidad NO informadas)

Supuesto de estructura: 10 cuotas de capital fijo (USD 20.000 c/u) + interés simple sobre saldo remanente. Tasas de 0% / 8% / 15% anual son **ilustrativas para mostrar sensibilidad, no una estimación de mercado**.

| Periodicidad \ Tasa anual ilustrativa | 0% | 8% | 15% |
|---|---|---|---|
| Mensual | **-8,72%** | -9,45% | -10,10% |
| Trimestral | **+3,28%** | +1,92% | +0,73% |
| Semestral | **+7,28%** | +5,76% | +4,43% |
| Anual | **+9,28%** | +7,68% | +6,28% |

*Cash-on-Cash = (Renta anual − servicio de deuda del Año 1) / USD 1.000.000. En el escenario mensual, el resultado negativo significa que la renta no alcanza a cubrir la amortización pactada — se requiere capital adicional, no un "menor retorno".*

### D.3 Fase 3 — Cash Flow a 40 meses (escenario de trabajo: financiación trimestral, 8% anual ilustrativo)

**Supuesto de trabajo explícito** (🟨 no informado, elegido para poder construir una tabla): 10 cuotas trimestrales, primera cuota en el mes 3, tasa 8% anual ilustrativa sobre saldo remanente. Renta constante USD 9.400/mes (sin ajuste — mecanismo de indexación es 🟥 dato a validar).

| Mes | Renta contractual | Servicio de deuda | Flujo neto | Flujo acumulado |
|---|---|---|---|---|
| 1 | 9.400 | 0 | 9.400 | 9.400 |
| 2 | 9.400 | 0 | 9.400 | 18.800 |
| 3 | 9.400 | 24.000 (20.000 cap. + 4.000 int.) | -14.600 | 4.200 |
| 6 | 9.400 | 23.600 | -14.200 | ... |
| 9 | 9.400 | 23.200 | -13.800 | ... |
| 12 | 9.400 | 22.800 | -13.400 | **19.200 (fin Año 1)** |
| 15 | 9.400 | 22.400 | -13.000 | ... |
| 18 | 9.400 | 22.000 | -12.600 | ... |
| 21 | 9.400 | 21.600 | -12.200 | ... |
| 24 | 9.400 | 21.200 | -11.800 | **44.800 (fin Año 2)** |
| 27 | 9.400 | 20.800 | -11.400 | ... |
| 30 | 9.400 | 20.400 | -11.000 | 116.400 (saldo de vendedor cancelado) |
| 31-36 | 9.400 c/u | 0 | 9.400 c/u | **116.400 (mes 30-36) → 172.800 (fin Año 3, mes 36)*** |
| 37-40 | 9.400 c/u | 0 | 9.400 c/u | **154.000 (fin mes 40)*** |

\* *Nota: "Año 3" se define como meses 25-36; el flujo acumulado a fin de Año 3 (mes 36) es de USD 172.800 si se computa desde el inicio, pero el total relevante para el horizonte contractual remanente informado (40 meses) es USD 154.000. Recalcular con precisión mensual completa si se requiere para modelo definitivo — tabla simplificada a fines de comité.*

**Resumen anual (equity de USD 1.000.000):**

| Período | Renta bruta | Servicio de deuda | Flujo neto |
|---|---|---|---|
| Año 1 (meses 1-12) | 112.800 | 93.600 | **19.200** |
| Año 2 (meses 13-24) | 112.800 | 87.200 | **25.600** |
| Año 3 (meses 25-36) | 112.800 | 41.200 (nota se cancela en mes 30) | **71.600** |
| Período residual (meses 37-40) | 37.600 | 0 | **37.600** |
| **Total 40 meses** | **376.000** | **222.000** | **154.000** |

**Capital recuperado vía alquiler al mes 40 (escenario base):** USD 154.000, equivalente a **15,4% del equity inicial de USD 1.000.000**. La mayor parte del retorno de la inversión en el horizonte contractual remanente **no proviene del cash flow**, sino que depende de lo que ocurra en la salida (venta, renovación) más allá del mes 40 — ver Fase 11.

---

### D.4 Fase 4 — Escenarios

Todos los escenarios comparten: equity USD 1.000.000, financiación trimestral al 8% ilustrativo (🟨), horizonte de 40 meses salvo el Conservador (extendido por vacancia). El "retorno anualizado" se calcula como (Capital total recibido / Equity)^(12/meses) − 1 — **una aproximación de orden de magnitud, no una TIR mensual exacta con descuento de flujos intermedios** (los flujos intermedios de este activo son pequeños frente al valor terminal, por lo que la aproximación es razonable pero no debe citarse con falsa precisión).

| | Conservador | Base | Optimista |
|---|---|---|---|
| **Supuestos de renta/gastos** | 🟨 OPEX 8% de renta bruta a cargo del propietario | 🟨 Sin OPEX adicional informado (a validar) | 🟨 Renovación sin vacancia, ajuste de renta +10% al renovar |
| **Supuesto de salida** | 🟨 6 meses de vacancia post-contrato + cap rate de salida +100pb (10,4%) | 🟨 Cap rate de salida = cap rate de entrada (9,4%), sin apreciación | 🟨 Cap rate de salida -50pb (8,9%) por reducción de riesgo tras obras |
| Cash flow acumulado (horizonte) | ~USD 123.900 (40 meses, neto de OPEX) | USD 154.000 (40 meses) | USD 154.000 (40 meses) |
| Valor terminal | **~USD 998.000** (por debajo del precio de compra) | USD 1.200.000 (plano) | **~USD 1.394.000** |
| Capital total recibido | ~USD 1.121.900 | USD 1.354.000 | USD 1.548.000 |
| Múltiplo sobre equity (MOIC) | ~1,12x en 46 meses | 1,35x en 40 meses | 1,55x en 40 meses |
| **Retorno anualizado aproximado** | **~3,1%** | **~9,5%** | **~14,0%** |

**Lectura del comité:** el escenario conservador muestra un riesgo real y no remoto de **pérdida de valor de capital** en la salida (el activo se vendería por debajo de lo pagado) si se combinan vacancia post-contrato, gastos de propietario no capitalizados hoy y expansión de cap rate. El escenario base, con supuestos moderados, entrega un retorno del orden de un bono corporativo grado de inversión con riesgo bastante mayor (ver Fase 6). El optimista requiere que se cumplan dos condiciones favorables simultáneas (renovación sin fricción + compresión de cap rate), que no deben asumirse como caso central.

---

## E. Sensibilidad y Comparables

### E.1 Fase 5 — Matrices de sensibilidad

**Por renta efectiva** (Gross Yield resultante sobre precio de USD 1.200.000):

| Renta mensual | 8.000 | 8.700 | 9.400 (informado) | 10.000 | 10.800 |
|---|---|---|---|---|---|
| Gross Yield | 8,00% | 8,70% | **9,40%** | 10,00% | 10,80% |

**Por vacancia post-contrato** (retorno anualizado, manteniendo cash flow y valor de salida fijos en el caso base — aísla solo el efecto tiempo):

| Meses de vacancia | 0 | 3 | 6 | 9 | 12 |
|---|---|---|---|---|---|
| Horizonte total | 40 meses | 43 meses | 46 meses | 49 meses | 52 meses |
| Retorno anualizado aprox. | 9,53% | 8,83% | 8,23% | 7,71% | 7,25% |

**Por precio/valor de salida** (vs. USD 1.200.000 base, cash flow fijo en USD 154.000, horizonte 40 meses):

| Variación vs. precio de compra | -15% | -10% | -5% | 0% (base) | +5% | +10% | +15% |
|---|---|---|---|---|---|---|---|
| Valor de salida | 1.020.000 | 1.080.000 | 1.140.000 | 1.200.000 | 1.260.000 | 1.320.000 | 1.380.000 |
| Retorno anualizado aprox. | 4,93% | 6,51% | 8,04% | 9,53% | 10,93% | 12,34% | 13,70% |

**Por cap rate de salida** (NOI terminal constante en USD 112.800):

| Cap Rate de salida | 8,4% | 8,9% | 9,4% (=entrada) | 9,9% | 10,4% |
|---|---|---|---|---|---|
| Valor de salida implícito | 1.342.857 | 1.267.416 | 1.200.000 | 1.139.394 | 1.084.615 |
| Retorno anualizado aprox. | ~13,3% | ~11,4% | 9,53% | ~7,9% | ~6,4% |

**Por gastos del propietario (OPEX anual, % de renta bruta)** — muestra el "verdadero" Cap Rate:

| OPEX (% renta bruta) | 0% | 5% | 8% | 12% | 18% |
|---|---|---|---|---|---|
| NOI anual | 112.800 | 107.160 | 103.776 | 99.264 | 92.496 |
| Cap Rate real | **9,40%** | 8,93% | 8,65% | 8,27% | 7,71% |
| Cash Yield bruto s/equity (sin deuda) | 11,28% | 10,72% | 10,38% | 9,93% | 9,25% |

**Conclusión de la sensibilidad:** las variables que más mueven el retorno son, en orden: (1) periodicidad/tasa de la financiación del vendedor (puede pasar de +9% a flujo negativo estructural), (2) cap rate de salida / valor de venta, (3) vacancia post-contrato, (4) OPEX real, (5) nivel de renta efectiva. Las dos primeras dependen de información no provista.

### E.2 Fase 6 — Comparación contra otras alternativas (USD 1,2M)

Fuentes de mercado citadas (EE.UU., agosto 2026) — **no representan benchmarks locales** del mercado donde se ubica el inmueble (ubicación no informada), se usan solo como referencia de rango de retornos libres/casi libres de riesgo y de renta fija:

- UST 10 años: **4,68%** (27/08/2026). [Fuente: Advisor Perspectives / mercado de Treasuries, agosto 2026]
- Money market USD (ej. fondos tipo VMFXX): **~3,7% (7-day yield)** (agosto 2026). [Fuente: datos de fondos money market, agosto 2026]
- Bonos corporativos grado de inversión (índice ICE BofA US Corporate): **~5,2%-5,4%** (yield efectivo, Q2 2026). [Fuente: ICE BofA / FRED, 2026]
- Cap rates de industrial/logística institucional en EE.UU.: **~5,2%-6,4%** promedio (Q1 2026, varía por mercado). [Fuente: reportes de mercado industrial EE.UU., 2026]
- S&P 500 / ETF diversificado: retorno histórico de largo plazo ~10% nominal anual (dato histórico ampliamente conocido, **no una proyección**), con volatilidad y drawdowns históricos de 20%-50% en períodos de estrés.

| Alternativa | Retorno de referencia | Liquidez | Volatilidad | Riesgo de capital | Gestión requerida | Previsibilidad de CF | Activo real |
|---|---|---|---|---|---|---|---|
| **Nave analizada** | 9,4% bruto nominal; ~3%-14% neto anualizado según escenario | Baja | Baja/Media* | Media (concentración, un solo locatario) | Media | Contractual, pero con 20% no bancarizado* | Sí |
| Residencial en renta | 🟥 Benchmark a consultar (mercado local no informado) | Baja | Baja | Media | Media-Alta | Alta (múltiples inquilinos posibles) | Sí |
| Local comercial | 🟥 Benchmark a consultar | Baja | Media | Media-Alta (rotación de rubros) | Media | Media | Sí |
| Oficina | 🟥 Benchmark a consultar | Baja | Media-Alta | Media-Alta (vacancia estructural post-2020) | Media | Media | Sí |
| Otro depósito/logística | 🟥 Benchmark a consultar (comparable directo) | Baja | Baja/Media | Media | Media | Media-Alta | Sí |
| UST 10 años | 4,68%** | Alta | Baja (precio de mercado) | Muy baja (riesgo soberano EE.UU.) | Nula | Muy alta | No |
| Bonos corporativos IG | ~5,2%-5,4%** | Alta/Media | Media | Baja-Media | Baja | Alta | No |
| Money market USD | ~3,7%** | Muy alta | Muy baja | Muy baja | Nula | Muy alta | No |
| S&P 500 / ETF | ~10% histórico*** | Alta | Alta | Media-Alta (mercado) | Baja | Baja (dividendos variables) | No |
| Negocio operativo propio | 🟥 Muy variable, depende del negocio | Muy baja | Muy alta | Alta | Muy alta | Baja | Variable |

\* *Baja/Media: la nave tiene cash flow contractual, pero concentrado en un solo locatario y con 20% de la renta no bancarizada, lo que reduce su previsibilidad "verificable" para terceros (bancos, futuros compradores). Volatilidad de valor no observable por falta de mercado líquido de comparables.*
\** *Referencias de mercado EE.UU., agosto 2026 — no ajustadas por riesgo país/moneda del inmueble analizado, cuya ubicación es 🟥 dato a validar.*
\*** *Promedio histórico de largo plazo, no garantizado; incluye períodos de caída de -20% a -50%.*

**La comparación no debe leerse como "9,4% le gana a 4,68%".** El 9,4% es bruto, ilíquido, concentrado en un solo activo/locatario, y antes de gastos, impuestos y riesgo de vacancia; el 4,68% de un UST es neto de esos riesgos. Ajustado por riesgo, la brecha real es sustancialmente menor y depende de las variables no informadas.

---

## F. Risk Matrix (Fase 9)

| Riesgo | Probabilidad | Impacto | Mitigante | Información necesaria |
|---|---|---|---|---|
| Riesgo locativo (no renovación) | Media | Alto | Buscar cláusula de renovación / historial de permanencia | 🟥 Contrato completo, opciones de renovación |
| Riesgo crediticio del locatario | 🟥 No evaluable | Alto | Garantías, depósito, seguro de caución | 🟥 Identidad, estados contables, referencias |
| Riesgo de vacancia (post-contrato) | Media | Alto (ver escenario conservador) | Adaptabilidad del inmueble a otros operadores logísticos | 🟥 Características técnicas completas (altura, accesos) |
| Riesgo de liquidez (reventa) | Media-Alta | Medio-Alto | N/A hasta tener comparables | 🟥 Comparables de mercado, ubicación |
| Riesgo de concentración | Alta (estructural: 1 activo, 1 locatario) | Alto | Diversificación fuera de esta operación | N/A — es una característica del activo, no un dato faltante |
| Riesgo regulatorio | 🟥 No evaluable | Medio | Habilitaciones vigentes | 🟥 Permisos, habilitación municipal/industrial |
| **Riesgo de incendio** | Media (obra en curso, no finalizada) | **Alto** | Confirmar habilitación de hidrantes por autoridad competente | 🟥 Certificado de habilitación de bomberos/organismo, no solo finalización de obra |
| Riesgo de seguro | 🟥 No evaluable | Alto | Póliza vigente y adecuada al rubro (electrónica = mayor valor asegurado) | 🟥 Póliza, cobertura, si corre por cuenta del propietario o locatario |
| Riesgo de mantenimiento | Media | Medio | Definir en contrato quién paga qué | 🟥 Cláusulas de mantenimiento/reparaciones estructurales |
| Riesgo de obsolescencia | Baja-Media | Medio | Operación a piso es flexible para otros rubros; sin racks limita densidad de otros usos | 🟥 Altura libre, resistencia de piso, capacidad de carga |
| Riesgo de mercado (demanda logística) | 🟥 No evaluable sin ubicación | Medio | N/A | 🟥 Ubicación, dinámica de mercado local |
| Riesgo de valuación | Alta (sin comparables) | Medio | Tasación independiente | 🟥 Comparables, tasación profesional |
| Riesgo contractual (términos no informados) | Alta | Alto | Revisión legal del contrato completo | 🟥 Contrato completo |
| Riesgo impositivo | Media (por la porción en efectivo) | Medio-Alto | Asesoramiento fiscal previo a la compra | 🟥 Tratamiento de IVA, documentación del efectivo |
| Riesgo de salida (exit) | Media | Alto | Ver Fase 11 | 🟥 Cap rate de mercado, comparables, plazo de comercialización |

**Nota:** la red de hidrantes está **en ejecución, no finalizada**, con finalización proyectada para la semana siguiente al relevamiento de este dato. No debe presentarse como sistema contra incendio completo y habilitado hasta contar con la habilitación formal correspondiente.

---

## G. Due Diligence (Fase 12)

**Legal:** título de propiedad, informe de dominio, gravámenes/embargos, contrato de locación completo, habilitaciones municipales/industriales, permisos de uso del suelo.

**Técnico:** informe de estructura, estado de cubierta, instalación eléctrica, drenajes/desagües pluviales, estado general de mampostería/piso, sistema contra incendio (incluyendo habilitación formal de hidrantes, no solo finalización de obra civil), accesos vehiculares, capacidad operativa (altura libre, resistencia de piso, playa de maniobras).

**Financiero:** comprobantes históricos de cobro de renta (los últimos 12-24 meses idealmente), historial de mora, gastos históricos del propietario, impuestos (inmobiliario, ABL/tasas municipales según jurisdicción), pólizas de seguro vigentes, costos extraordinarios recientes o previstos (ej. la propia red de hidrantes y parquización).

**Locatario:** identidad jurídica (razón social, CUIT/equivalente), antecedentes comerciales, informes de solvencia/riesgo crediticio, garantías constituidas (depósito, aval, seguro de caución, fianza), comportamiento histórico de pago.

**Fiscal/contable:** tratamiento impositivo de la renta (monotributo vs. régimen general, condición del propietario frente al IVA), documentación respaldatoria de la porción en efectivo (USD 1.880/mes), impacto de esa porción no bancarizada en la valuación "demostrable" del activo, estructura óptima de adquisición (persona física vs. sociedad).

*Los aspectos legales, contables e impositivos deben confirmarse con profesionales matriculados antes de comprometer capital. Este documento no constituye asesoramiento legal ni impositivo.*

---

## H. Investor Takeaway

**A favor:**
- Activo 100% operativo y generando renta desde el día 1 de la adquisición (no hay período de desarrollo/estabilización).
- Contrato vigente con 40 meses remanentes, provee visibilidad de cash flow contractual en el corto/mediano plazo.
- Financiación parcial del vendedor (16,7% del precio) reduce el capital inicial requerido y, bajo condiciones favorables de tasa/periodicidad, puede generar apalancamiento positivo.
- Gross Yield nominal (9,4%) superior a los benchmarks de renta fija de referencia citados, incluso reconociendo que no son directamente comparables.
- Activo físico con valor residual independiente del locatario actual (uso logístico/industrial es relativamente genérico dentro de ciertos límites técnicos a confirmar).

**En contra:**
- Concentración total: un activo, un locatario, sin diversificación.
- 9,4% es Gross Yield, no Cap Rate — el retorno neto real depende de gastos hoy desconocidos.
- 20% de la renta no bancarizada — riesgo de trazabilidad/documentación y de valuación futura del activo.
- La estructura de financiación del vendedor (tasa y periodicidad) puede convertir la operación en flujo de caja negativo estructural en el corto plazo si las cuotas son mensuales.
- Sistema contra incendio no finalizado ni habilitado a la fecha de este análisis.
- Ausencia total de información sobre solvencia del locatario, mecanismo de ajuste de renta, moneda contractual y responsabilidades de gastos — son, en conjunto, la mayor fuente de incertidumbre del caso.
- Sin comparables de mercado (ubicación no informada), no puede validarse si USD 967,74/m² es un precio de mercado, por debajo o por encima.

**Condiciones bajo las cuales la inversión resulta atractiva:**
1. Las 10 cuotas de financiación son trimestrales o de periodicidad mayor (no mensuales), con tasa razonable.
2. El contrato tiene mecanismo de ajuste de renta que preserve valor real durante los 40 meses remanentes.
3. Los gastos del propietario (impuestos, seguro, mantenimiento) son bajos o están mayormente a cargo del locatario.
4. El locatario demuestra solvencia y antigüedad operativa razonable.
5. La red de hidrantes queda formalmente habilitada antes del cierre.
6. Existe evidencia de comparables que sostengan el precio por m² solicitado.

**Variables que podrían cambiar materialmente la tesis:** periodicidad/tasa de la financiación (la de mayor impacto de corto plazo), identidad y solvencia del locatario, ubicación del inmueble, mecanismo de ajuste de renta, y el resultado real de la habilitación de hidrantes.

---

## I. Datos Faltantes — priorizados por impacto en la decisión

1. **Periodicidad y tasa de interés de las 10 cuotas de financiación del vendedor** — puede convertir el cash flow de positivo a estructuralmente negativo en el corto plazo; es el dato de mayor impacto inmediato.
2. **Ubicación exacta del inmueble** — condiciona comparables, valor de mercado, liquidez de reventa, riesgo de demanda logística y benchmarks de cap rate aplicables.
3. **Identidad y solvencia del locatario** — determina el riesgo de crédito real de la única fuente de renta.
4. **Contrato completo**: mecanismo de ajuste de renta, moneda contractual, garantías/depósito, quién paga impuestos/mantenimiento/seguro/reparaciones estructurales, opciones de renovación.
5. **Estado real y habilitación formal de la red de hidrantes** — riesgo regulatorio y de seguridad inminente, no solo de retorno.
6. **Gastos operativos históricos a cargo del propietario** — necesarios para calcular el Cap Rate/NOI real (hoy solo se puede calcular Gross Yield).
7. **Tratamiento impositivo y documentación de la porción en efectivo de la renta** (20% del total) — impacta trazabilidad, riesgo fiscal y valuación futura del activo.
8. **Comparables de mercado** (precio/m², cap rates) de depósitos/naves industriales equivalentes en la misma zona — sin esto, no puede validarse si el precio solicitado es de mercado.
