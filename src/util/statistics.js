import { setPage, setPageFalse } from "./methods";

export function statistics() {
  let p = window.location.pathname.toLowerCase();
  if (p.indexOf("/goodsdetail") !== -1) {
    setPageFalse();
    setPage("/goodsdetail", `${window.location.origin}`);

  } else {
    setPageFalse();
    setPage(`${window.location.pathname}`, `${window.location.origin}`);
  }
}