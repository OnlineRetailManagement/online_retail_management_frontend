//

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// auth
import useAuth from "../hooks/useAuth";
// ui
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// paths
import { ADMIN_PATHS, USER_PATHS, VENDOR_PATHS } from "../routes/paths";
// icons
import {
  LayoutDashboard,
  Users,
  Building,
  PackageSearch,
  Frame,
  CirclePower,
  ShoppingCart,
  ShoppingBasket,
} from "lucide-react";

// ----------------------------------------

const adminPaths = {
  paths: [
    {
      name: "Dashboard",
      url: ADMIN_PATHS.dashboard,
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      url: ADMIN_PATHS.products,
      icon: PackageSearch,
    },
    {
      name: "Users",
      url: ADMIN_PATHS.users,
      icon: Users,
    },
    {
      name: "Vendors",
      url: ADMIN_PATHS.vendors,
      icon: Building,
    },
  ],
};

const vendorPaths = {
  paths: [
    {
      name: "dashboard",
      url: VENDOR_PATHS.dashboard,
      icon: LayoutDashboard,
    },
    {
      name: "products",
      url: VENDOR_PATHS.products,
      icon: PackageSearch,
    },
    {
      name: "orders",
      url: VENDOR_PATHS.orders,
      icon: ShoppingCart,
    },
  ],
};

const userPaths = {
  paths: [
    // {
    //   name: "dashboard",
    //   url: USER_PATHS.dashboard,
    //   icon: LayoutDashboard,
    // },
    {
      name: "products",
      url: USER_PATHS.products,
      icon: PackageSearch,
    },
    {
      name: "cart",
      url: USER_PATHS.cart,
      icon: ShoppingCart,
    },
    {
      name: "orders",
      url: USER_PATHS.orders,
      icon: ShoppingBasket,
    },
  ],
};

// ----------------------------------------

export default function NavBarLayout() {
  const { user, userRole, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const navPaths =
    userRole === "admin"
      ? adminPaths
      : userRole === "vendor"
      ? vendorPaths
      : userRole === "user"
      ? userPaths
      : [];

  const headerText =
    userRole === "admin"
      ? "Bestellix (Admin Portal)"
      : userRole === "vendor"
      ? "Bestellix (Vendor Portal)"
      : "Bestellix";

  const currentPageEle = navPaths.paths.find((el) => el.url === pathname);

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center space-x-2 m-2 my-4">
            <Frame className="size-4" />

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{headerText}</span>
            </div>
          </div>
        </SidebarHeader>

        <div className="border-t py-2" />

        <SidebarContent>
          <NavMain visiblePaths={navPaths} />
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={user} userRole={userRole} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {currentPageEle?.name ?? "Profile"}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 px-4">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleLogOut}
            >
              <CirclePower /> Log Out
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// ----------------------------------------

const NavMain = (props) => {
  const { visiblePaths } = props;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {visiblePaths?.paths?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

// ----------------------------------------

const NavUser = (props) => {
  const { user, userRole } = props;

  const userNameInitials = user?.user?.first_name
    ? user?.user?.first_name?.charAt(0) + user?.user?.last_name?.charAt(0)
    : "NU";

  const userName = user?.user?.first_name + " " + user?.user?.last_name;

  const redirectToPath =
    userRole === "admin"
      ? ADMIN_PATHS.profile
      : userRole === "vendor"
      ? VENDOR_PATHS.profile
      : userRole === "user"
      ? USER_PATHS.profile
      : null;

  return (
    <SidebarMenu>
      <Link to={redirectToPath}>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border">
            {userNameInitials}
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{userName}</span>
            <span className="truncate text-xs">{user?.email ?? "-"}</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenu>
  );
};
