 export const response: any = {
  "mainThreat": {
    columns: [
      "Worker ID",
      "Estado",
      "CPU (%)",
      "RAM (MB)",
      "Tiempo de ejecución"
    ],
    rows: [
      {
        threadId: 1,
        memory: '87 MB',
        cpu: 2453000,
        status: 0,
        time: '10232ms'
      },
      {
        threadId: 2,
        memory: '87 MB',
        cpu: 2453000,
        status: 0,
        time: '10232ms'
      },
      {
        threadId: 3,
        memory: '87 MB',
        cpu: 2453000,
        status: 1,
        time: '10232ms'
      },
      {
        threadId: 4,
        memory: '87 MB',
        cpu: 2453000,
        status: 1,
        time: '10232ms'
      }
    ]
  }
}

export const threadStatus: Record<number, string> = {
  0: 'Activo',
  1: 'Inactivo'
}