# Inova 1

Aplicación de escritorio para Windows con barra de direcciones, botones atrás/adelante/recargar, pestañas y página de inicio.

## Importante sobre LibreWolf
Esta versión usa el motor Chromium incluido con Electron. **No incluye LibreWolf ni usa su motor Gecko.** LibreWolf no se puede incrustar directamente como un componente normal de Electron. Esta versión prioriza que la navegación ocurra dentro de la ventana de Inova 1.

## Crear instalador en GitHub
1. Sube el contenido de esta carpeta a la raíz de tu repositorio (no subas una carpeta adicional por encima).
2. Abre **Actions**.
3. Ejecuta **Build Inova 1 for Windows** con **Run workflow**, o haz un commit para activar la acción.
4. Cuando termine, entra en la ejecución y descarga el artifact **Inova-1-Windows-Installer**.
5. Dentro del artifact estará el instalador `.exe`.

No necesitas instalar Node.js en tu PC para que GitHub compile el instalador.
