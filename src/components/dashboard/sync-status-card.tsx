import { Card, CardBody } from "@heroui/react";
import { SuccessIcon, ErrorIcon } from "./icons";

interface SyncStatusCardProps {
  isConnected: boolean;
}

export const SyncStatusCard = ({ isConnected }: SyncStatusCardProps) => {
  return (
    <Card 
      className={isConnected 
        ? "bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 border-none" 
        : "bg-gradient-to-br from-red-500/20 via-pink-500/20 to-rose-500/20 border-none"
      }
    >
      <CardBody className="gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Sync Status</span>
          {isConnected ? (
            <div className="flex items-center gap-1 text-green-500">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-500">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <SuccessIcon className="text-green-500" size={20} />
              <span className="text-xl font-semibold">Connected</span>
            </>
          ) : (
            <>
              <ErrorIcon className="text-red-500" size={20} />
              <span className="text-xl font-semibold">Disconnected</span>
            </>
          )}
        </div>
        <p className="text-xs text-default-500">
          {isConnected
            ? "Your files are syncing in real-time"
            : "Trying to connect to the sync server..."}
        </p>
      </CardBody>
    </Card>
  );
};