import { EventBusKey } from "@vueuse/core";
import { StringLiteral } from "typescript";

export type BusData = {
  type: 'add';
  height: number;
  width: number;
  x: number;
  y: number;
} |
{
  type: 'update';
  x: number;
  y: number;
}

export const eventKey: EventBusKey<BusData> = Symbol('wrapper-minecraft-block')
