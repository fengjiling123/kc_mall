import { setCookie, getCookie } from "@/util/methods";

export const ORDER_FLAG = "ORDER_FLAG";

export const ORDER_NEW = "ORDER_NEW";
export const ORDER_CLEARED = "ORDER_CLEARED";

export function setNewOrder() {
  setCookie(ORDER_FLAG, ORDER_NEW, 7);
  return { type: ORDER_FLAG, data: ORDER_NEW };
}

export function clearNewOrder() {
  setCookie(ORDER_FLAG, ORDER_CLEARED, 7);
  return { type: ORDER_FLAG, data: ORDER_CLEARED };
}
