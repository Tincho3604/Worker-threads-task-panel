 export const COLUMNS_DEFAULT: string[] = [
      "Worker ID",
      "Estado",
      "CPU (%)",
      "RAM (MB)",
      "Tiempo de ejecución",
      "Tiempo de finalización",
      "Reemplazo de worker"
    ];

export const threadStatus: Record<number, string> = {
  0: 'Activo',
  1: 'Inactivo'
}