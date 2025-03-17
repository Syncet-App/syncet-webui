import { Card, CardHeader, CardBody, Avatar, Chip } from "@heroui/react";
import { FileIcon, ImageIcon, DocIcon } from "./icons";

// Sample recent files data
const recentFiles = [
  { 
    id: 1, 
    name: "presentation.pptx", 
    type: "document", 
    size: "4.2 MB", 
    syncStatus: "synced", 
    lastModified: "2 mins ago",
    device: "Laptop" 
  },
  { 
    id: 2, 
    name: "profile-picture.png", 
    type: "image", 
    size: "1.8 MB", 
    syncStatus: "synced", 
    lastModified: "15 mins ago",
    device: "Phone" 
  },
  { 
    id: 3, 
    name: "report.pdf", 
    type: "document", 
    size: "2.5 MB", 
    syncStatus: "syncing", 
    lastModified: "37 mins ago",
    device: "Laptop" 
  },
  { 
    id: 4, 
    name: "budget-2024.xlsx", 
    type: "document", 
    size: "3.1 MB", 
    syncStatus: "synced", 
    lastModified: "1 hour ago",
    device: "Tablet" 
  },
  { 
    id: 5, 
    name: "vacation.jpg", 
    type: "image", 
    size: "5.7 MB", 
    syncStatus: "synced", 
    lastModified: "2 hours ago",
    device: "Phone" 
  }
];

export const RecentFilesCard = () => {
  return (
    <Card className="bg-gradient-to-br from-background/70 to-background-800/70 border-none shadow-md">
      <CardHeader className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Recent Activity</h4>
      </CardHeader>
      <CardBody className="px-0 py-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-divider">
                <th className="px-4 py-3 text-left text-xs font-medium text-default-500 uppercase tracking-wider">File</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-default-500 uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-default-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-default-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-default-500 uppercase tracking-wider">Device</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-content1/5 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-md bg-content1/20">
                        {file.type === 'image' ? (
                          <ImageIcon className="text-fuchsia-500" size={18} />
                        ) : (
                          <DocIcon className="text-blue-500" size={18} />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium">{file.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-default-500">{file.size}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {file.syncStatus === 'synced' ? (
                      <Chip size="sm" variant="flat" color="success">Synced</Chip>
                    ) : (
                      <Chip size="sm" variant="flat" color="warning">
                        <div className="flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-warning"></span>
                          </span>
                          Syncing
                        </div>
                      </Chip>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-default-500">{file.lastModified}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-default-500">{file.device}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};