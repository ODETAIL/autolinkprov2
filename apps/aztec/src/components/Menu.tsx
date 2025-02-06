import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCoins,
  faFileInvoiceDollar,
  faGear,
  faHouse,
  faRightFromBracket,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { currentUser } from "@clerk/nextjs/server";

const menuItems = [
  {
    title: "GENERAL",
    items: [
      {
        icon: faHouse,
        label: "Home",
        href: "/",
        visible: ["admin", "member"],
      },
    ],
  },
  {
    title: "PEOPLE",
    items: [
      {
        icon: faUser,
        label: "Employee",
        href: "/list/employees",
        visible: ["admin", "member"],
      },
      {
        icon: faUserGroup,
        label: "Customer",
        href: "/list/customers",
        visible: ["admin", "member"],
      },
    ],
  },
  {
    title: "BUSINESS",
    items: [
      {
        icon: faCalendarDays,
        label: "Booking",
        href: "/appointments",
        visible: ["admin", "member"],
      },
      {
        icon: faFileInvoiceDollar,
        label: "Invoice",
        href: "/list/invoices",
        visible: ["admin", "member"],
      },
      {
        icon: faCoins,
        label: "Billing",
        href: "/list/billing",
        visible: ["admin"],
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
          <span className="hidden lg:block text-aztecBlue font-semibold my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-white py-2 md:px-2 rounded-md hover:text-aztecBlue font-light"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-white w-5"
                  />
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
