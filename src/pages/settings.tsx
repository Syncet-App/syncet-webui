import { useState } from "react";
import { title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard-layouts";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { Switch } from "@heroui/switch";
import { Divider } from "@heroui/divider";
import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState("account");
  
  // Mock user data
  const userData = {
    name: "Alex Syncet",
    email: "alex.syncet@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    plan: "pro",
    storageUsed: 248,
    storageTotal: 2048,
    twoFactorEnabled: true,
    notificationsEnabled: true,
    syncFrequency: "realtime",
    syncConflict: "newest",
    syncNetworkType: "any"
  };
  
  // Form states
  const [userForm, setUserForm] = useState({
    name: userData.name,
    email: userData.email,
  });
  
  const [syncSettings, setSyncSettings] = useState({
    frequency: userData.syncFrequency,
    conflict: userData.syncConflict,
    networkType: userData.syncNetworkType
  });
  
  const [notifications, setNotifications] = useState({
    syncComplete: true,
    syncError: true,
    newDevice: true,
    storageWarning: true
  });
  
  const handleUserFormChange = (key: string, value: string) => {
    setUserForm(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSyncSettingsChange = (key: string, value: string) => {
    setSyncSettings(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <DashboardLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col gap-2 mb-6">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Settings</BreadcrumbItem>
          </Breadcrumbs>
          <h1 className={title({ color: "foreground", size: "md" })}>Settings</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs for larger screens */}
          <div className="md:w-64 flex-shrink-0">
            <Card className="bg-content1/5 border-none sticky top-20">
              <CardBody className="p-0">
                <nav className="flex flex-col md:py-2">
                  <SettingsNavItem 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    } 
                    title="Account" 
                    active={selectedTab === "account"}
                    onClick={() => setSelectedTab("account")}
                  />
                  <SettingsNavItem 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                        <path d="M12 12v9"/>
                        <path d="m8 17 4 4 4-4"/>
                      </svg>
                    } 
                    title="Sync" 
                    active={selectedTab === "sync"}
                    onClick={() => setSelectedTab("sync")}
                  />
                  <SettingsNavItem 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                      </svg>
                    } 
                    title="Notifications" 
                    active={selectedTab === "notifications"}
                    onClick={() => setSelectedTab("notifications")}
                  />
                  <SettingsNavItem 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                    } 
                    title="History" 
                    active={selectedTab === "history"}
                    onClick={() => setSelectedTab("history")}
                  />
                  <SettingsNavItem 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"/>
                        <path d="M2 13h10"/>
                        <path d="m9 16 3-3-3-3"/>
                      </svg>
                    } 
                    title="Advanced" 
                    active={selectedTab === "advanced"}
                    onClick={() => setSelectedTab("advanced")}
                  />
                </nav>
              </CardBody>
            </Card>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1">
            {selectedTab === "account" && (
              <div className="space-y-6">
                {/* User Profile */}
                <Card className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">User Profile</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
                      <Avatar 
                        src={userData.avatar} 
                        className="w-20 h-20 text-large"
                        showFallback
                      />
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{userData.name}</h3>
                        <p className="text-default-500">{userData.email}</p>
                        <Button size="sm" color="primary" variant="flat">Change Avatar</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Input
                          label="Full Name"
                          value={userForm.name}
                          onChange={(e) => handleUserFormChange('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          label="Email Address"
                          value={userForm.email}
                          onChange={(e) => handleUserFormChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Input
                          label="Current Password"
                          type="password"
                          placeholder="Enter current password to save changes"
                        />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary">Save Changes</Button>
                  </CardFooter>
                </Card>
                
                {/* Subscription & Storage */}
                <Card className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Subscription & Storage</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-sm">Current Plan</p>
                          <p className="text-lg font-semibold capitalize">{userData.plan} Plan</p>
                        </div>
                        <Button color="primary">Upgrade Plan</Button>
                      </div>
                      <p className="text-default-500 text-sm">Your plan renews on April 15, 2025</p>
                    </div>
                    
                    <Divider className="my-4" />
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Storage Usage</p>
                        <p className="text-sm font-medium">
                          {userData.storageUsed} MB / {userData.storageTotal} MB
                        </p>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-red-500 h-2.5 rounded-full" 
                          style={{ width: `${(userData.storageUsed / userData.storageTotal) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-default-500 text-sm">
                        {Math.round((userData.storageUsed / userData.storageTotal) * 100)}% of your storage used
                      </p>
                    </div>
                  </CardBody>
                </Card>
                
                {/* Security */}
                <Card className="bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Security</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-default-500 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Switch 
                          isSelected={userData.twoFactorEnabled}
                          color="primary"
                        />
                      </div>
                      
                      <div>
                        <Button color="primary" variant="flat">Change Password</Button>
                      </div>
                      
                      <div>
                        <p className="font-medium mb-2">Active Sessions</p>
                        <div className="bg-content1/20 rounded-lg p-3 mb-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">Current Session</p>
                              <p className="text-xs text-default-500">MacBook Pro · Chrome · San Francisco, CA</p>
                            </div>
                            <Chip color="success" size="sm">Active</Chip>
                          </div>
                        </div>
                        <div className="bg-content1/20 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm font-medium">iPhone 13 Pro</p>
                              <p className="text-xs text-default-500">iOS · Syncet App · San Francisco, CA</p>
                            </div>
                            <Button size="sm" variant="flat" color="danger">Log Out</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
            
            {selectedTab === "sync" && (
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-sky-500/10 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Sync Settings</h2>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <div>
                      <Select
                        label="Sync Frequency"
                        placeholder="Select frequency"
                        selectedKeys={[syncSettings.frequency]}
                        onChange={(e) => handleSyncSettingsChange('frequency', e.target.value)}
                        className="max-w-xs"
                      >
                        <SelectItem key="realtime" value="realtime">Real-time</SelectItem>
                        <SelectItem key="5min" value="5min">Every 5 minutes</SelectItem>
                        <SelectItem key="15min" value="15min">Every 15 minutes</SelectItem>
                        <SelectItem key="30min" value="30min">Every 30 minutes</SelectItem>
                        <SelectItem key="hourly" value="hourly">Hourly</SelectItem>
                        <SelectItem key="manual" value="manual">Manual only</SelectItem>
                      </Select>
                    </div>
                    
                    <div>
                      <Select
                        label="Conflict Resolution Strategy"
                        placeholder="Select strategy"
                        selectedKeys={[syncSettings.conflict]}
                        onChange={(e) => handleSyncSettingsChange('conflict', e.target.value)}
                        className="max-w-xs"
                      >
                        <SelectItem key="newest" value="newest">Newest file wins</SelectItem>
                        <SelectItem key="largest" value="largest">Largest file wins</SelectItem>
                        <SelectItem key="ask" value="ask">Always ask</SelectItem>
                      </Select>
                    </div>
                    
                    <div>
                      <Select
                        label="Sync on Network Type"
                        placeholder="Select network type"
                        selectedKeys={[syncSettings.networkType]}
                        onChange={(e) => handleSyncSettingsChange('networkType', e.target.value)}
                        className="max-w-xs"
                      >
                        <SelectItem key="any" value="any">Any network</SelectItem>
                        <SelectItem key="wifi" value="wifi">Wi-Fi only</SelectItem>
                        <SelectItem key="wificharging" value="wificharging">Wi-Fi when charging</SelectItem>
                      </Select>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Pause Syncing</p>
                        <p className="text-default-500 text-sm">Temporarily stop file synchronization</p>
                      </div>
                      <Switch color="primary" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Background Sync</p>
                        <p className="text-default-500 text-sm">Sync files even when the app is closed</p>
                      </div>
                      <Switch isSelected={true} color="primary" />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary">Save Settings</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-content1/5 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Watched Directories</h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2 mb-4">
                      <div className="bg-content1/20 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">./test</p>
                            <p className="text-xs text-default-500">36 files, 12 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="flat" color="danger">Remove</Button>
                      </div>
                      <div className="bg-content1/20 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">./documents</p>
                            <p className="text-xs text-default-500">128 files, 64 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="flat" color="danger">Remove</Button>
                      </div>
                      <div className="bg-content1/20 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">./photos</p>
                            <p className="text-xs text-default-500">215 files, 172 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="flat" color="danger">Remove</Button>
                      </div>
                    </div>
                    <Button color="primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        <path d="M12 11v6" />
                        <path d="M9 14h6" />
                      </svg>
                      Add Directory
                    </Button>
                  </CardBody>
                </Card>
              </div>
            )}
            
            {selectedTab === "notifications" && (
              <Card className="bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-rose-500/10 border-none">
                <CardHeader className="pb-0">
                  <h2 className="text-xl font-bold">Notification Settings</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Enable Notifications</p>
                      <p className="text-default-500 text-sm">Receive all notifications from Syncet</p>
                    </div>
                    <Switch isSelected={userData.notificationsEnabled} color="primary" />
                  </div>
                  
                  <Divider />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sync Complete</p>
                      <p className="text-default-500 text-sm">Notify when files finish syncing</p>
                    </div>
                    <Switch 
                      isSelected={notifications.syncComplete} 
                      onChange={() => setNotifications(prev => ({ ...prev, syncComplete: !prev.syncComplete }))}
                      color="primary" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Sync Errors</p>
                      <p className="text-default-500 text-sm">Notify when files fail to sync</p>
                    </div>
                    <Switch 
                      isSelected={notifications.syncError} 
                      onChange={() => setNotifications(prev => ({ ...prev, syncError: !prev.syncError }))}
                      color="primary" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">New Device Connected</p>
                      <p className="text-default-500 text-sm">Notify when a new device connects to your account</p>
                    </div>
                    <Switch 
                      isSelected={notifications.newDevice} 
                      onChange={() => setNotifications(prev => ({ ...prev, newDevice: !prev.newDevice }))}
                      color="primary" 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Storage Warning</p>
                      <p className="text-default-500 text-sm">Notify when storage is almost full</p>
                    </div>
                    <Switch 
                      isSelected={notifications.storageWarning} 
                      onChange={() => setNotifications(prev => ({ ...prev, storageWarning: !prev.storageWarning }))}
                      color="primary" 
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Button color="primary">Save Preferences</Button>
                </CardFooter>
              </Card>
            )}
            
            {selectedTab === "history" && (
              <Card className="bg-content1/5 border-none">
                <CardHeader className="pb-0">
                  <h2 className="text-xl font-bold">Sync History</h2>
                </CardHeader>
                <CardBody>
                  <div className="relative">
                    {/* Timeline */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-content1/30"></div>
                    
                    <div className="space-y-6 pl-12 relative">
                      <HistoryItem 
                        time="10:42 AM"
                        date="Today"
                        title="Project Presentation.pptx"
                        description="File updated on MacBook Pro"
                        status="success"
                      />
                      
                      <HistoryItem 
                        time="09:15 AM"
                        date="Today"
                        title="Budget 2024.xlsx"
                        description="File created on Desktop"
                        status="success"
                      />
                      
                      <HistoryItem 
                        time="Yesterday"
                        date="4:30 PM"
                        title="Client Contract.docx"
                        description="Sync failed - Connection error"
                        status="error"
                      />
                      
                      <HistoryItem 
                        time="Yesterday"
                        date="2:15 PM"
                        title="Profile Picture.png"
                        description="File added on iPhone"
                        status="success"
                      />
                      
                      <HistoryItem 
                        time="03/15/2025"
                        date="11:20 AM"
                        title="Project Timeline.xlsx"
                        description="Sync conflict resolved - Newest file kept"
                        status="warning"
                      />
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button color="primary" variant="flat">View Complete History</Button>
                </CardFooter>
              </Card>
            )}
            
            {selectedTab === "advanced" && (
              <div className="space-y-6">
                <Card className="bg-content1/5 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Advanced Settings</h2>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Developer Mode</p>
                        <p className="text-default-500 text-sm">Enable additional logging and debugging features</p>
                      </div>
                      <Switch color="primary" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Experimental Features</p>
                        <p className="text-default-500 text-sm">Try new features before they're released</p>
                      </div>
                      <Switch color="primary" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Sync Port</p>
                      <Input 
                        type="number" 
                        placeholder="3000" 
                        labelPlacement="outside" 
                        className="max-w-xs"
                      />
                      <p className="text-default-500 text-xs">Default is 3000. Change only if you need to use a different port.</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="font-medium">Cache Location</p>
                      <Input 
                        type="text" 
                        placeholder="/path/to/cache" 
                        labelPlacement="outside" 
                        className="max-w-xs"
                      />
                      <p className="text-default-500 text-xs">Leave empty to use the default location.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button color="danger" variant="flat">Clear Application Cache</Button>
                      <p className="text-default-500 text-xs">This won't delete your files, only temporary app data.</p>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary">Save Advanced Settings</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-500/10 via-pink-500/10 to-rose-500/10 border-none">
                  <CardHeader className="pb-0">
                    <h2 className="text-xl font-bold">Danger Zone</h2>
                  </CardHeader>
                  <CardBody className="space-y-6">
                    <div className="bg-danger/10 rounded-lg p-4 border border-danger/20">
                      <h3 className="text-lg font-medium text-danger mb-2">Delete Account</h3>
                      <p className="text-default-500 text-sm mb-4">
                        This will permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button color="danger">Delete Account</Button>
                    </div>
                    
                    <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
                      <h3 className="text-lg font-medium text-warning mb-2">Reset Sync Data</h3>
                      <p className="text-default-500 text-sm mb-4">
                        This will reset all sync history and force a complete resync of all files. This won't delete your files.
                      </p>
                      <Button color="warning">Reset Sync Data</Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

// Helper Components
const SettingsNavItem = ({ icon, title, active, onClick }: { icon: React.ReactNode, title: string, active: boolean, onClick: () => void }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-3 w-full text-left transition-colors rounded-lg ${
        active ? 'bg-primary text-white' : 'hover:bg-content1/20'
      }`}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span>{title}</span>
    </button>
  );
};

const HistoryItem = ({ time, date, title, description, status }: { time: string, date: string, title: string, description: string, status: 'success' | 'error' | 'warning' }) => {
  return (
    <div className="relative pb-2">
      <div className={`absolute -left-12 mt-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
        status === 'success' ? 'bg-success/20 text-success' : 
        status === 'error' ? 'bg-danger/20 text-danger' : 
        'bg-warning/20 text-warning'
      }`}>
        {status === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        ) : status === 'error' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 6-12 12"/>
            <path d="m6 6 12 12"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
            <path d="m9 3 1.5 1.5"/>
            <path d="M12 3v1.5"/>
            <path d="m15 3-1.5 1.5"/>
            <path d="M3 9h1.5"/>
            <path d="M3 12h1.5"/>
            <path d="M3 15h1.5"/>
            <path d="M9 21l1.5-1.5"/>
            <path d="M12 21v-1.5"/>
            <path d="m15 21-1.5-1.5"/>
            <path d="M21 9h-1.5"/>
            <path d="M21 12h-1.5"/>
            <path d="M21 15h-1.5"/>
          </svg>
        )}
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-default-500">{time}</span>
        </div>
        <p className="text-sm text-default-500">{description}</p>
        <p className="text-xs text-default-500 mt-1">{date}</p>
      </div>
    </div>
  );
};