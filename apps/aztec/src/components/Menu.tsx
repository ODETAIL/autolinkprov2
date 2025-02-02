import { currentUser } from "@clerk/nextjs/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faFileInvoiceDollar,
  faGear,
  faHouse,
  faRightFromBracket,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: faHouse,
        label: "Home",
        href: "/",
        visible: ["admin", "member"],
      },
      {
        icon: faUserGroup,
        label: "Employees",
        href: "/list/employees",
        visible: ["admin", "member"],
      },
      {
        icon: faUser,
        label: "Customers",
        href: "/list/customers",
        visible: ["admin", "member"],
      },
      {
        icon: faCalendarDays,
        label: "Bookings",
        href: "/list/appointments",
        visible: ["admin", "member"],
      },
      {
        icon: faFileInvoiceDollar,
        label: "Invoices",
        href: "/list/invoices",
        visible: ["admin", "member"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: faUser,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "member"],
      },
      {
        icon: faGear,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "member"],
      },
      {
        icon: faRightFromBracket,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "member"],
      },
    ],
  },
];

const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-aztecBlue font-bold text-md my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white font-medium py-2 md:px-2 rounded-md hover:text-aztecBlue"
                >
                  <FontAwesomeIcon icon={item.icon} className="text-lg w-5 " />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
