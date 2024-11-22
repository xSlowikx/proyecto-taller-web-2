export enum PriorityEnum {
  URGENTE = 1,
  NORMAL = 2,
  BAJA = 3,
}
export const Priority = [
  {
    codigo: PriorityEnum.URGENTE,
    description: 'Urgente',
  },
  {
    codigo: PriorityEnum.NORMAL,
    description: 'Normal',
  },
  {
    codigo: PriorityEnum.BAJA,
    description: 'Baja',
  },
];
