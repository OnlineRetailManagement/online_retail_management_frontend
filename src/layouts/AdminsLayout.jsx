//

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// sonner-toast
import { toast } from "sonner";
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
import { ADMIN_PATHS } from "../routes/paths";
// icons
import {
  LayoutDashboard,
  Users,
  Building,
  PackageSearch,
  Frame,
  CirclePower,
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

// ----------------------------------------

export default function AdminsLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const currentPageEle = adminPaths.paths.find((el) => el.url === pathname);

  const handleLogOut = async () => {
    await logout();

    toast.success("User has been logged out successfully ...!!!");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center space-x-2 m-2 my-4">
            <Frame className="size-4" />

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Online Retail</span>
            </div>
          </div>
        </SidebarHeader>

        <div className="border-t py-2" />

        <SidebarContent>
          <NavMain adminPaths={adminPaths} />
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={user} />
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
  const { adminPaths } = props;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {adminPaths?.paths?.map((item) => (
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
  const { user } = props;

  return (
    <SidebarMenu>
      <Link to={ADMIN_PATHS.profile}>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg flex items-center justify-center border">
            {user?.name ?? "NU"}
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.name ?? "-"}</span>
            <span className="truncate text-xs">{user?.email ?? "-"}</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenu>
  );
};
