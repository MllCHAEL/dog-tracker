export interface NewDog {
  name: string;
  barksALot: boolean;
}

export interface Dog extends NewDog {
  id: string;
}
