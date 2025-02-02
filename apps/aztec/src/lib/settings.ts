export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/employee(.*)": ["member", "admin"],
  "/customer(.*)": ["member", "admin"],
  "/invoice(.*)": ["member", "admin"],
  "/appointment(.*)": ["member", "admin"],
  "/list/employees": ["admin"],
  "/list/customers": ["admin", "member"],
  "/list/invoices": ["admin", "member"],
  "/list/appointments": ["admin", "member"],
};
