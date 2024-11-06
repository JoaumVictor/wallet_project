export interface IMovementLog {
  type: "buy" | "sale";
  name: string;
  quantity: number;
  date: string;
}
