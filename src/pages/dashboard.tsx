import { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard-layouts";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { SyncStatusCard } from "@/components/dashboard/sync-status-card";
import { RecentFilesCard } from "@/components/dashboard/recent-files-card";
import { SyncStatsCard } from "@/components/dashboard/sync-stats-card";
import { DirectoryCard } from "@/components/dashboard/directory-card";
import { BandwidthChart } from "@/components/dashboard/bandwidth-chart";

export default function DashboardPage() {
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Simulate connection status change
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col gap-2">
          <h1 className={title({ color: "foreground", size: "md" })}>Dashboard</h1>
          <p className="text-default-500">Monitor your file synchronization status and activity</p>
        </div>
        
        {/* Status Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <SyncStatusCard isConnected={isConnected} />
          <SyncStatsCard 
            filesCount={2854} 
            syncedCount={2842} 
            pendingCount={12} 
          />
          <DirectoryCard 
            watchedDirs={["./test", "./documents", "./photos"]}
          />
          <Card className="bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border-none">
            <CardBody className="gap-2 overflow-hidden">
              <div className="flex flex-col">
                <span className="text-sm text-white/80">Storage Used</span>
                <span className="text-xl font-semibold">248 MB / 2 GB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 mt-2">
                <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <Card className="lg:col-span-2 bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border-none">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Bandwidth Usage</h4>
              <p className="text-default-500 text-small">Upload and download over time</p>
            </CardHeader>
            <CardBody>
              <BandwidthChart />
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-br from-sky-500/10 via-blue-500/10 to-indigo-500/10 border-none">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Sync Activity</h4>
              <p className="text-default-500 text-small">Files synced in last 24h</p>
            </CardHeader>
            <CardBody>
              <div className="h-52 w-full flex items-center justify-center">
                <div className="relative h-52 w-52">
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                    124
                  </div>
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-blue-500/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#blueGradient)"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="50"
                      className="transform -rotate-90 origin-center"
                    />
                    <defs>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="mt-6">
          <RecentFilesCard />
        </div>
      </section>
    </DashboardLayout>
  );
}