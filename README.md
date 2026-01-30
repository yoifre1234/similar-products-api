# Similar Products API - Backend Technical Assessment

REST API desarrollada en **Node.js** que actúa como orquestador (BFF/Aggregator) para recuperar productos similares. El servicio consume APIs externas, agrega la información y devuelve una respuesta unificada, priorizando la **tolerancia a fallos** y el **alto rendimiento**.

## 🚀 Características y Mejoras Arquitectónicas

Este proyecto va más allá de una implementación básica, incorporando patrones de diseño para entornos productivos:

- **Arquitectura en Capas:** Separación estricta de responsabilidades (Routes, Controllers, Services, Repositories).
- **Resiliencia HTTP (Retry Policies):** Implementación de `axios-retry` y **Timeouts** configurados. Si la API externa falla temporalmente, el sistema reintenta automáticamente antes de lanzar un error (Circuit Breaker pattern simplificado).
- **Estrategia de Caché (In-Memory):** Uso de `node-cache` para almacenar respuestas de productos.
  - **Resultado:** Reducción de latencia de red a **~4ms** en peticiones repetidas.
  - **Eficiencia:** Minimiza el impacto y coste sobre las APIs externas (upstream).
- **Manejo Centralizado de Errores:** Middleware dedicado para capturar y estandarizar excepciones, evitando bloques `try-catch` repetitivos en los controladores.
- **Concurrencia:** Uso de `Promise.all` para paralelizar la obtención de detalles de productos.

## 📂 Estructura del Proyecto

src/
├── config/ # Configuración del Cliente HTTP (Axios + Retries + Timeouts)
├── controllers/ # Manejo de peticiones HTTP (Input/Output)
├── middleware/ # Middleware global de manejo de errores
├── repositories/ # Acceso a datos externos (aislado de la lógica)
├── services/ # Lógica de negocio, Orquestación y Caching
├── utils/ # Utilidades compartidas (Instancia de Caché)
├── routes/ # Definición de endpoints
└── tests/ # Tests Unitarios y de Integración (Jest)
scripts/ # Scripts de prueba de carga (K6)

## Instalación y Ejecución

Prerrequisitos: Node.js v18+ y Docker (opcional para tests de carga).

Instalar dependencias:
npm install

Ejecutar el entorno completo: Se recomienda levantar los servicios en terminales separadas:

Terminal 1 - Mocks (Puerto 3001):
node mocks-server.js

Terminal 2 - API Backend (Puerto 5000):
npm start

La API estará disponible en: http://localhost:5000/product/{productId}/similar

## ✅ Testing y Calidad de Código

El proyecto cuenta con una cobertura de pruebas exhaustiva.

Tests Unitarios e Integración (Jest)
Cubren Controladores, Servicios (lógica de caché), Repositorios (mocks de axios) y Middleware, asegurando que cada capa funcione aislada y en conjunto.

npm run test

# Resultado esperado: 100% de tests pasando (7 suites)

## 🧪 Pruebas de Rendimiento (K6 + Docker)

Se incluye infraestructura Dockerizada para simular tráfico real y validar la estrategia de caché y resiliencia.

📊 Resultados de Benchmark
Gracias a la implementación de caché en memoria y optimización de promesas, se obtuvieron los siguientes resultados bajo carga:

VUs (Usuarios Virtuales): 20 concurrentes.

P95 Response Time: ~4.08ms (Objetivo inicial: <500ms).

Tasa de Error: 0.00% (0 fallos en 900 peticiones).

Throughput: ~22 req/s sostenidas sin degradación.

Cómo ejecutar la prueba de carga
Asegúrate de que tu API (puerto 5000) y los Mocks (puerto 3001) estén corriendo en tu máquina local.

Levantar el stack de monitoreo (InfluxDB + Grafana):
docker-compose up -d influxdb grafana

Lanzar el script de K6: Nota: El docker-compose.yml incluye configuración host-gateway para permitir que el contenedor acceda al localhost del anfitrión.

docker-compose run --rm k6 run /scripts/k6test.js
