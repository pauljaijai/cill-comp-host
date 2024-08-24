import { EventBusKey } from "@vueuse/core";
import { StringLiteral } from "typescript";

export type BusData = {
  type: 'add';
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  visible: boolean;
} |
{
  type: 'update';
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  visible: boolean;
}

export const eventKey: EventBusKey<BusData> = Symbol('wrapper-minecraft-block')
