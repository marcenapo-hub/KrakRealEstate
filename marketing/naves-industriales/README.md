# Embudo de captación — Naves industriales GBA

Trabajo de arquitectura de funnel para la cartera de naves industriales en
alquiler de Krak Real Estate (Zona Norte, Sur y Oeste).

## Archivos

| Archivo | Qué es |
|---|---|
| `funnel-naves-industriales.html` | Documento estratégico completo: diagnóstico, comparación de arquitecturas A/B/C, mapa TOFU-MOFU-BOFU, matriz de audiencias, plan de medición, auditoría del borrador v1 y plan por fases. Publicado como Artifact. |
| `funnel-naves-industriales-v2.excalidraw` | Mapa de recorrido rediseñado con lógica Funnelytics. Abrir en excalidraw.com. |
| `funnel-naves-industriales-v1-borrador.excalidraw` | Borrador original auditado, conservado como referencia. |

## Convenciones del diagrama v2

Cada nodo tiene **tipo visual** (fuente, campaña, anuncio, página, evento,
acción, offline/CRM) y un **slot de datos** debajo con el formato
`pers. —  conv. —`, vacío hasta que la Fase 1 aporte los números. Todas las
conexiones son flechas con origen y destino vinculados: los nodos se pueden
mover sin romper el flujo.

## Decisión central

Arquitectura híbrida: campaña fría unificada en Meta con creativos zonales,
campañas de Search separadas por zona, y diferenciación real por intención
declarada en el hub y en Tokko. La zona es un atributo del contacto, no un
carril paralelo; el eje que predice el cierre es m² + timing.

## Pendiente antes de comprometer presupuesto

Presupuesto mensual, distribución de cartera por zona y m², capacidad
comercial semanal, histórico de consultas de Tokko y tasas de conversión
consulta → visita → firma.
