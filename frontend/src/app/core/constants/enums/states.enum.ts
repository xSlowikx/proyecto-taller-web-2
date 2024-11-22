export enum StatesEnum {
    EN_PROGRESO = 2,
    FINALIZADA = 4,
    ELIMINADA = 5,
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
  