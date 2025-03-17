import { Card, CardBody } from "@heroui/react";

interface SyncStatsCardProps {
  filesCount: number;
  syncedCount: number;
  pendingCount: number;
}

export const SyncStatsCard = ({ 
  filesCount, 
  syncedCount, 
  pendingCount 
}: SyncStatsCardProps) => {
  
  const syncPercentage = (syncedCount / filesCount) * 100;
  
  return (
    <Card className="bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-none">
      <CardBody className="gap-2">
        <span className="text-sm">Files Synced</span>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-semibold">{syncedCount}</span>
          <span className="text-sm text-default-500">/ {filesCount}</span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${syncPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-default-500 pt-1">
          <span>{syncPercentage.toFixed(1)}% complete</span>
          {pendingCount > 0 && (
            <span className="text-amber-400">{pendingCount} pending</span>
          )}
        </div>
      </CardBody>
    </Card>
  );
};