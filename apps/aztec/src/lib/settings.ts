export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/employee(.*)": ["admin"],
  "/billing(.*)": ["admin"],
  "/customer(.*)": ["admin", "member"],
  "/invoice(.*)": ["admin", "member"],
  "/appointment(.*)": ["admin", "member"],
  "/list/employees": ["admin", "member"],
  "/list/customers": ["admin", "member"],
  "/list/invoices(.*)": ["admin", "member"],
};
