import { useState } from "react";
import { Link } from "@heroui/link";
import { Avatar } from "@heroui/react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";

import { Logo } from "@/components/syncet-logo";

// Sidebar icons
import { 
  DashboardIcon, 
  FolderIcon, 
  SettingsIcon, 
  NotificationsIcon,
  LogoutIcon,
  UsersIcon,
  DevicesIcon
} from "@/components/dashboard/icons";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: <DashboardIcon />, label: "Dashboard", href: "/dashboard", active: true },
    { icon: <FolderIcon />, label: "Files", href: "/files" },
    { icon: <DevicesIcon />, label: "Devices", href: "/devices" },
    { icon: <UsersIcon />, label: "Shared", href: "/file-sharing" },
    { icon: <SettingsIcon />, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-gradient-to-br from-background to-background-900">
      {/* Sidebar */}
      <aside 
        className={clsx(
          "z-20 flex flex-col border-r border-divider backdrop-blur-md bg-background/80",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-divider">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={32} />
            {!isCollapsed && <span className="text-xl font-bold">Syncet</span>}
          </Link>
          <div className="">
          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle Sidebar"
            className={clsx("md:flex hidden", isCollapsed && "rotate-180")}
            onClick={toggleSidebar}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Tooltip
                  content={isCollapsed ? item.label : ""}
                  placement="right"
                  delay={200}
                  closeDelay={0}
                  isDisabled={!isCollapsed}
                >
                  <Link 
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      "hover:bg-primary/10",
                      item.active ? "bg-primary text-white hover:bg-primary" : "text-foreground"
                    )}
                  >
                    <div className="text-xl">{item.icon}</div>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom actions */}
        <div className="p-4 border-t border-divider">
          <Dropdown placement="top-start">
            <DropdownTrigger>
              <div className={clsx(
                "flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-content1",
                isCollapsed && "justify-center"
              )}>
                <Avatar 
                  src="https://i.pravatar.cc/150?img=3" 
                  size="sm" 
                  className="border-2 border-primary/30"
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Alex Johnson</p>
                    <p className="text-xs text-default-400 truncate">alex@example.com</p>
                  </div>
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" textValue="Profile">
                Profile
              </DropdownItem>
              <DropdownItem key="settings" textValue="Account Settings">
                Account Settings
              </DropdownItem>
              <DropdownItem key="logout" className="text-danger" color="danger" textValue="Logout">
                <div className="flex items-center gap-2">
                  <LogoutIcon />
                  <span>Logout</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-divider bg-background/80 backdrop-blur-md z-10">
          <div className="md:hidden">
            <Button
              isIconOnly
              variant="light"
              aria-label="Menu"
              onClick={toggleSidebar}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <Button isIconOnly variant="light" aria-label="Notifications">
              <NotificationsIcon />
            </Button>
            <ThemeSwitch />
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}