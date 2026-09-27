# HIVE 2 — Handoff de sesión

**Última actualización: 2026-09-27.** Este archivo es el punto de entrada.
Si retomás el proyecto en otra sesión (local o en la nube), leé esto primero.

---

## Cómo levantar el proyecto en una sesión local

El trabajo está en la rama **`claude/hive-2-storage-campaign-2nx9j3`**, que no
es la rama por defecto del repo. Al clonar hay que cambiarse a ella:

```bash
git clone https://github.com/marcenapo-hub/KrakRealEstate.git
cd KrakRealEstate
git checkout claude/hive-2-storage-campaign-2nx9j3
```

Si el pull request está mergeado, el trabajo ya está en la rama por defecto y el
checkout no hace falta.

El `CLAUDE.md` de la raíz carga automáticamente todo el contexto de Hive 2
—números, decisiones tomadas, lo que no se comunica— así que una sesión nueva
arranca informada sin necesidad de releer los 16 documentos.

---

## Estado al 2026-09-27

### Cerrado y aprobado
- **Brief completo.** Trazabilidad en `02` a `06`.
- **Ficha Maestra v1.0 aprobada** por Marce el 2026-09-07 (`07`).
- **Las diez fases del plan escritas** (`08` a `16`).
- **Landing maquetada** (`landing/index.html`), con los slots de imagen
  marcados dentro de la propia página.
- **Ángulos creativos v2**, reformulados por devolución de Marce del 2026-09-21:
  se abandonó el ángulo de precio comparado y se pasó a valor operativo.

### Lo que falta, y de quién depende

| # | Qué | De quién | Bloquea |
|---|---|---|---|
| 1 | **Cuadro definitivo de las 18 unidades** | Stark (terminado, sin entregar) | Las superficies de la landing y del modelo. Hoy figuran 17 de 18 |
| 2 | **Render: corte de nave** con los 7 m y el entrepiso, con figura humana | Stark | El ángulo A entero |
| 3 | **Render: calle interna con semirremolque** maniobrando | Stark | El ángulo B entero |
| 4 | Render de la tipología J (207 m²) | Stark | Es la unidad de entrada y no tiene imagen |
| 5 | Imagen del ingreso al Polo Industrial (primer anillo) | Stark | El bloque de seguridad de la landing |
| 6 | **Expensas** estimadas | Stark | Una FAQ de la landing |
| 7 | ¿Se pueden unir dos unidades? | Stark | Una FAQ de la landing |
| 8 | Brochure actualizado sin coworking | Stark (en camino) | Descarga de la landing y material del vendedor |
| 9 | Niveles de rack que admite la altura + resistencia del piso en kg/m² | Stark | Convierte el ángulo A en argumento con números |
| 10 | ¿Hay cámaras con monitoreo, además del doble anillo? | Stark | Define si puede decirse "seguridad 24 horas" |
| 11 | **Número de WhatsApp de guardia comercial** | Krak | La landing tiene un placeholder en 10 lugares |
| 12 | Presupuesto de producción, landing y herramientas | Marce | Dimensionar la producción |
| 13 | Fecha objetivo de lanzamiento | Marce | Arranca el roadmap |

### Próximo paso natural

Las **placas estáticas y adaptaciones para Meta** (12 adaptaciones de render +
8 placas de datos), con el mismo criterio de dejar marcado dónde va cada imagen.
Es lo último del kit creativo que no depende de Stark.

Después: ejecutar el **Bloque 0 y las semanas 1-2 del roadmap** (`16`), que son
tareas de Krak y no dependen de nadie más — armar la lista maestra en Tokko,
configurar el pipeline, crear las redes, y contactar la lista maestra antes de
encender la pauta.

---

## Cosas que no hay que volver a discutir

Ya se decidieron y están fundamentadas en los documentos:

1. **USD 300/mes de Meta es correcto.** El modelo económico (`15`) demuestra que
   más presupuesto no compra más ventas: el límite es el inventario de 18
   unidades y la capacidad comercial, no la pauta.
2. **Los ángulos van por valor, no por precio.** Rechazado explícitamente.
3. **El precio se publica** ("desde USD 260.820"). Con este ticket, publicar
   filtra y el equipo no pierde tiempo.
4. **WhatsApp es la conversión primaria**, el formulario es la alternativa.
5. **La base propia es el motor.** El outbound produce 4 de las 5 ventas
   proyectadas.
6. **La comisión de comercialización queda fuera del kit.**

## Riesgos abiertos que conviene no perder de vista

- **El 50% de anticipo** es la mayor barrera comercial: 83% del ticket integrado
  en los primeros 12 meses, contra 19% de Arbox. La automatización 13 del CRM
  (`13`) cuenta las pérdidas por este motivo justamente para construir el caso
  de negocio de renegociarlo con Stark.
- **El fideicomiso no está conformado** y la subdivisión no está registrada. El
  equipo necesita el guion de respuesta preparado (`08`, sección 5).
- **La agenda de Stark** para las reuniones de cierre es un cuello: hay que
  fijar dos ventanas semanales antes de lanzar.
- **Posible categoría especial de Meta** para inmobiliario: no se pudo verificar
  en la fuente oficial (facebook.com está bloqueado en el entorno remoto). La
  arquitectura de campañas está diseñada para funcionar igual si aplica.
