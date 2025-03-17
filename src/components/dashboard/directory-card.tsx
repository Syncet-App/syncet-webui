import { Card, CardBody } from "@heroui/react";
import { FolderIcon } from "./icons";

interface DirectoryCardProps {
  watchedDirs: string[];
}

export const DirectoryCard = ({ watchedDirs }: DirectoryCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 border-none">
      <CardBody className="gap-2">
        <span className="text-sm">Watched Directories</span>
        <span className="text-xl font-semibold">{watchedDirs.length}</span>
        
        <div className="space-y-1 mt-1">
          {watchedDirs.slice(0, 3).map((dir, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <FolderIcon size={14} />
              <span className="truncate">{dir}</span>
            </div>
          ))}
          
          {watchedDirs.length > 3 && (
            <div className="text-xs text-default-500">
              +{watchedDirs.length - 3} more directories
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};