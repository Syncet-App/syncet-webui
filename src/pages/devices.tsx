import { title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard-layouts";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip"; // Fixed import
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Progress } from "@heroui/progress";
import { Tooltip } from "@heroui/tooltip";

export default function DevicesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock data for devices
  const devices = [
    {
      id: 1,
      name: "MacBook Pro",
      type: "laptop",
      os: "macOS Monterey",
      lastSync: "2 minutes ago",
      status: "online",
      storageUsed: 78,
      totalStorage: 512,
      ip: "192.168.1.5",
      location: "Home Office",
      isCurrentDevice: true
    },
    {
      id: 2,
      name: "iPhone 13 Pro",
      type: "mobile",
      os: "iOS 16.5",
      lastSync: "15 minutes ago",
      status: "online",
      storageUsed: 12,
      totalStorage: 128,
      ip: "192.168.1.8",
      location: "Home"
    },
    {
      id: 3,
      name: "Windows Desktop",
      type: "desktop",
      os: "Windows 11 Pro",
      lastSync: "3 hours ago",
      status: "offline",
      storageUsed: 156,
      totalStorage: 1024,
      ip: "192.168.1.10",
      location: "Office"
    },
    {
      id: 4,
      name: "iPad Air",
      type: "tablet",
      os: "iPadOS 16.4",
      lastSync: "Yesterday",
      status: "online",
      storageUsed: 24,
      totalStorage: 64,
      ip: "192.168.1.12",
      location: "Living Room"
    },
    {
      id: 5,
      name: "Android Phone",
      type: "mobile",
      os: "Android 13",
      lastSync: "3 days ago",
      status: "offline",
      storageUsed: 8,
      totalStorage: 64,
      ip: "192.168.1.15",
      location: "Unknown"
    }
  ];

  // Device type icons
  const deviceIcons = {
    laptop: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="12" x="3" y="4" rx="2" ry="2"/>
        <line x1="2" x2="22" y1="20" y2="20"/>
      </svg>
    ),
    desktop: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="14" x="5" y="2" rx="2"/>
        <line x1="12" x2="12" y1="16" y2="20"/>
        <line x1="8" x2="16" y1="20" y2="20"/>
      </svg>
    ),
    mobile: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="8" height="16" x="8" y="4" rx="2" ry="2"/>
        <path d="M12 18h.01"/>
      </svg>
    ),
    tablet: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="12" height="16" x="6" y="4" rx="2" ry="2"/>
        <line x1="12" x2="12.01" y1="17" y2="17"/>
      </svg>
    )
  };

  return (
    <DashboardLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col gap-2 mb-6">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Devices</BreadcrumbItem>
          </Breadcrumbs>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className={title({ color: "foreground", size: "md" })}>Connected Devices</h1>
            <Button 
              color="primary"
              onClick={onOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect width="5" height="5" x="3" y="3" rx="1"/>
                <rect width="5" height="5" x="16" y="3" rx="1"/>
                <rect width="5" height="5" x="3" y="16" rx="1"/>
                <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
                <path d="M21 21v.01"/>
                <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
                <path d="M12 3h.01"/>
                <path d="M12 16v.01"/>
              </svg>
              Connect New Device
            </Button>
          </div>
        </div>
        
        {/* QR Code Modal (replacing Popover) */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Connect a new device</ModalHeader>
            <ModalBody className="text-center">
              <p className="text-default-500 text-sm mb-4">Scan this QR code with the Syncet app on your new device</p>
              <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 mb-4">
                {/* Simple mock QR code */}
                <div className="w-full h-full bg-grid-black/20 relative overflow-hidden">
                  <div className="absolute inset-2 border-4 border-black"></div>
                  <div className="absolute top-6 left-6 w-8 h-8 border-4 border-black bg-white"></div>
                  <div className="absolute top-6 right-6 w-8 h-8 border-4 border-black bg-white"></div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-4 border-black bg-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg opacity-70"></div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        
        {/* Devices List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {devices.map((device) => (
            <Card key={device.id} className="bg-content1/5 border-none">
              <CardHeader className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg ${
                  device.type === "laptop" ? "bg-blue-500/20 text-blue-500" :
                  device.type === "desktop" ? "bg-purple-500/20 text-purple-500" :
                  device.type === "mobile" ? "bg-green-500/20 text-green-500" :
                  "bg-amber-500/20 text-amber-500"
                } flex items-center justify-center`}>
                  {deviceIcons[device.type]}
                </div>
                
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{device.name}</h3>
                    {device.isCurrentDevice && (
                      <Chip size="sm" color="primary" variant="flat">Current</Chip>
                    )}
                  </div>
                  <p className="text-default-500 text-sm">{device.os}</p>
                </div>
                
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Device actions">
                    <DropdownItem>Rename Device</DropdownItem>
                    <DropdownItem>Sync Now</DropdownItem>
                    <DropdownItem>Device Settings</DropdownItem>
                    <DropdownItem className="text-danger" color="danger">Disconnect</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              
              <CardBody className="py-0">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-default-500">Status</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-success' : 'bg-danger'}`}></span>
                        <span className="text-sm capitalize">{device.status}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-500">Last Synced</p>
                      <p className="text-sm mt-1">{device.lastSync}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-500">IP Address</p>
                      <p className="text-sm mt-1">{device.ip}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-500">Location</p>
                      <p className="text-sm mt-1">{device.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-default-500">Storage</p>
                      <p className="text-xs">
                        {device.storageUsed} GB / {device.totalStorage} GB
                      </p>
                    </div>
                    <Tooltip content={`${Math.round(device.storageUsed / device.totalStorage * 100)}% used`}>
                      <Progress 
                        aria-label="Storage usage" 
                        value={device.storageUsed} 
                        maxValue={device.totalStorage}
                        className="h-2"
                        classNames={{
                          indicator: device.storageUsed / device.totalStorage > 0.9 
                            ? "bg-danger" 
                            : device.storageUsed / device.totalStorage > 0.7 
                              ? "bg-warning" 
                              : "bg-success"
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
              
              <CardFooter className="gap-2">
                <Button size="sm" variant="flat" className="flex-1">Sync Now</Button>
                <Button size="sm" variant="flat" className="flex-1">Settings</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}