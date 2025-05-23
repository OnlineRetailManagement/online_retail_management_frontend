//

import React from "react";
import { Link, Outlet } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import { Avatar } from "@/components/ui/avatar";
// paths
import { ADMIN_PATHS } from "../routes/paths";
// icons
import {
  LayoutDashboard,
  Users,
  Building,
  PackageSearch,
  Frame,
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
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center space-x-2 m-2 my-4">
            <Frame />
            <div className="text-sm">Online Retail</div>
          </div>
        </SidebarHeader>

        <div className="border-t py-2" />

        <SidebarContent>
          <NavMain adminPaths={adminPaths} />
        </SidebarContent>

        <SidebarFooter>
          <NavUser user={null} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <Outlet />
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
  return (
    <SidebarMenu>
      <Link to={ADMIN_PATHS.profile}>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">UN</Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{"User Name"}</span>
            <span className="truncate text-xs">{"User Email"}</span>
          </div>
        </SidebarMenuButton>
      </Link>
    </SidebarMenu>
  );
};
