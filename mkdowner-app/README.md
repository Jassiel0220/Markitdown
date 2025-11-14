# Markdown Converter App

Una aplicación React modularizada que replica el diseño y funcionalidades del archivo HTML original para convertir archivos a formato Markdown usando Microsoft MarkItDown.

## Estructura del Proyecto

```
src/
├── components/           # Componentes React modularizados
│   ├── Container/       # Contenedor principal
│   ├── Header/          # Encabezado con título y subtítulo
│   ├── UploadArea/      # Área de carga con drag & drop
│   ├── FileList/        # Lista de archivos seleccionados
│   ├── SupportedFormats/ # Información de formatos soportados
│   └── index.ts         # Exportaciones de componentes
├── hooks/               # Custom hooks
│   └── useFileUpload.ts # Hook para manejo de archivos
├── services/            # Servicios para API
│   └── api.ts           # Funciones para comunicación con backend
├── styles/              # Estilos globales
│   └── global.css       # CSS global de la aplicación
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```
VITE_API_BASE_URL=http://localhost:8000
```

### Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## Funcionalidades

- ✅ Drag & drop de archivos
- ✅ Selección múltiple de archivos
- ✅ Barra de progreso durante la conversión
- ✅ Lista de archivos seleccionados
- ✅ Información de formatos soportados
- ✅ Descarga automática de resultados
- ✅ Diseño responsive y moderno

## Componentes

### Container
Contenedor principal con estilos de tarjeta.

### Header
Encabezado con título y descripción de la aplicación.

### UploadArea
Área de carga con funcionalidad de drag & drop, selección de archivos y botón de envío.

### FileList
Muestra la lista de archivos seleccionados con sus tamaños.

### SupportedFormats
Información detallada sobre los formatos de archivo soportados.

## Hooks

### useFileUpload
Custom hook que maneja:
- Estado de archivos seleccionados
- Estado de carga y progreso
- Comunicación con la API
- Descarga de resultados

## API

La aplicación se comunica con un backend Python que debe estar ejecutándose en el puerto configurado en `VITE_API_BASE_URL`.

### Endpoint

- `POST /upload` - Recibe archivos y devuelve el resultado convertido
