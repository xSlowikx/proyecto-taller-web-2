export enum StatesEnum {
    EN_PROGRESO = 1,
    FINALIZADA = 2,
    ELIMINADA = 3,
  }
  export const States = [
    {
      codigo: StatesEnum.EN_PROGRESO,
      description: 'En progreso',
    },
    {
      codigo: StatesEnum.FINALIZADA,
      description: 'Finalizada',
    },
    {
        codigo: StatesEnum.ELIMINADA,
        description: 'Eliminada',
      },
  ];
  