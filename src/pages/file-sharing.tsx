import React, { useMemo, useCallback, useState } from "react";
import { title } from "@/components/primitives";
import DashboardLayout from "@/layouts/dashboard-layouts";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  Card,
  CardBody
} from "@heroui/react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure 
} from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import { Tabs, Tab } from "@heroui/tabs";
import {
  ImageIcon, 
  DocIcon, 
  FolderIcon,
} from "@/components/dashboard/icons";

// Define reusable icon components
export type IconSvgProps = {
  size?: number;
  width?: number;
  height?: number;
  [key: string]: any;
};

const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </svg>
);

const PlusIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
);

const VerticalDotsIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

const ShareIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M8.59 13.51L15.42 17.49"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M15.41 6.51L8.59 10.49"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const DownloadIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12 16L12 8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M9 13L12 16L15 13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M7 20H17C19.2091 20 21 18.2091 21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const LinkIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M13.19 8.688C15.32 6.564 18.64 6.564 20.77 8.688C22.9 10.816 22.9 14.136 20.77 16.264L15.24 21.794C13.11 23.922 9.79 23.922 7.66 21.794C5.53 19.666 5.53 16.346 7.66 14.218L13.19 8.688ZM19.06 10.399C18.85 10.189 18.85 9.851 19.06 9.641C19.27 9.43 19.61 9.43 19.818 9.641C21.03 10.853 21.03 12.831 19.818 14.044L18.105 15.759C17.895 15.969 17.555 15.969 17.345 15.759C17.135 15.549 17.135 15.21 17.345 15C17.555 14.79 18.848 13.497 18.848 13.497C19.632 12.713 19.632 11.481 18.848 10.697C18.848 10.5 18.06 10.399 19.06 10.399ZM14.52 7.575L9.524 12.566C8.74 13.35 8.74 14.581 9.524 15.365C9.734 15.575 9.734 15.914 9.524 16.124C9.314 16.334 8.975 16.334 8.765 16.124C7.553 14.912 7.553 12.935 8.765 11.722L13.761 6.731C14.973 5.519 16.948 5.519 18.16 6.731C18.37 6.941 18.37 7.28 18.16 7.49C17.95 7.7 17.61 7.7 17.4 7.49C16.616 6.706 15.384 6.706 14.6 7.49C14.6 7.49 14.73 7.367 14.52 7.575ZM4.4 16.457C4.4 16.457 4.4 16.457 4.4 16.457L6.113 14.744C6.323 14.534 6.663 14.534 6.873 14.744C7.083 14.954 7.083 15.293 6.873 15.503L5.16 17.216C3.948 18.428 3.948 20.406 5.16 21.618C6.372 22.83 8.35 22.83 9.563 21.618L14.558 16.627C15.77 15.415 15.77 13.438 14.558 12.226C14.348 12.016 14.348 11.677 14.558 11.467C14.768 11.257 15.107 11.257 15.317 11.467C16.529 12.679 16.529 14.657 15.317 15.869L10.322 20.86C8.497 22.685 5.523 22.685 3.7 20.86C1.877 19.035 1.877 16.062 3.7 14.239C3.7 14.239 4.4 14.239 4.4 16.457Z"
      fill="currentColor"
    />
  </svg>
);

const ClipboardIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="8"
      y="2"
      width="8"
      height="4"
      rx="1"
      ry="1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Mock file data with shared status
const files = [
  { 
    id: 1, 
    name: "Project Presentation.pptx", 
    type: "document", 
    size: "4.2 MB", 
    syncStatus: "synced", 
    lastModified: "2 mins ago",
    device: "Laptop",
    thumbnail: null,
    sharedWith: ["alex@example.com", "sarah@example.com"],
    isPublic: false
  },
  { 
    id: 2, 
    name: "Profile Picture.png", 
    type: "image", 
    size: "1.8 MB", 
    syncStatus: "synced", 
    lastModified: "15 mins ago",
    device: "Phone",
    thumbnail: "https://i.pravatar.cc/150?img=3",
    sharedWith: [],
    isPublic: true
  },
  { 
    id: 3, 
    name: "Quarterly Report.pdf", 
    type: "document", 
    size: "2.5 MB", 
    syncStatus: "syncing", 
    lastModified: "37 mins ago",
    device: "Laptop",
    thumbnail: null,
    sharedWith: ["team@example.com"],
    isPublic: false
  },
  { 
    id: 4, 
    name: "Budget 2024.xlsx", 
    type: "document", 
    size: "3.1 MB", 
    syncStatus: "synced", 
    lastModified: "1 hour ago",
    device: "Tablet",
    thumbnail: null,
    sharedWith: ["finance@example.com", "ceo@example.com"],
    isPublic: false
  },
  { 
    id: 5, 
    name: "Vacation Photos.jpg", 
    type: "image", 
    size: "5.7 MB", 
    syncStatus: "synced", 
    lastModified: "2 hours ago",
    device: "Phone",
    thumbnail: "https://i.pravatar.cc/150?img=5",
    sharedWith: ["family@example.com"],
    isPublic: false
  },
  { 
    id: 6, 
    name: "Client Contract.docx", 
    type: "document", 
    size: "578 KB", 
    syncStatus: "synced", 
    lastModified: "3 hours ago",
    device: "Desktop",
    thumbnail: null,
    sharedWith: [],
    isPublic: false
  },
  { 
    id: 7, 
    name: "Project Timeline.xlsx", 
    type: "document", 
    size: "1.2 MB", 
    syncStatus: "synced", 
    lastModified: "5 hours ago",
    device: "Laptop",
    thumbnail: null,
    sharedWith: ["team@example.com", "manager@example.com"],
    isPublic: false
  },
  { 
    id: 8, 
    name: "App Mockup.fig", 
    type: "design", 
    size: "8.4 MB", 
    syncStatus: "failed", 
    lastModified: "Yesterday",
    device: "Desktop",
    thumbnail: null,
    sharedWith: ["designer@example.com"],
    isPublic: true
  }
];

// Mock user contacts for sharing
const contacts = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Sarah Davis", email: "sarah@example.com", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Team Group", email: "team@example.com", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 4, name: "Finance Department", email: "finance@example.com", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 5, name: "CEO Office", email: "ceo@example.com", avatar: "https://i.pravatar.cc/150?img=20" },
  { id: 6, name: "Family Group", email: "family@example.com", avatar: "https://i.pravatar.cc/150?img=25" },
  { id: 7, name: "Design Team", email: "designer@example.com", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 8, name: "Project Manager", email: "manager@example.com", avatar: "https://i.pravatar.cc/150?img=40" },
  { id: 9, name: "Client Support", email: "support@example.com", avatar: "https://i.pravatar.cc/150?img=45" },
  { id: 10, name: "Marketing Team", email: "marketing@example.com", avatar: "https://i.pravatar.cc/150?img=50" }
];

// Column definitions
const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "SIZE", uid: "size", sortable: true },
  { name: "MODIFIED", uid: "lastModified", sortable: true },
  { name: "SHARED WITH", uid: "sharedWith", sortable: false },
  { name: "STATUS", uid: "syncStatus", sortable: true },
  { name: "ACTIONS", uid: "actions" }
];

// Status filter options
const statusOptions = [
  { name: "Synced", uid: "synced" },
  { name: "Syncing", uid: "syncing" },
  { name: "Pending", uid: "pending" },
  { name: "Failed", uid: "failed" }
];

// Type filter options 
const typeOptions = [
  { name: "Document", uid: "document" },
  { name: "Image", uid: "image" },
  { name: "Video", uid: "video" },
  { name: "Design", uid: "design" }
];

// Sharing filter options
const sharingOptions = [
  { name: "Shared", uid: "shared" },
  { name: "Not Shared", uid: "not-shared" },
  { name: "Public", uid: "public" }
];

// Status color mapping
const statusColorMap = {
  synced: "success",
  syncing: "warning",
  pending: "secondary",
  failed: "danger"
};

// Helper function to capitalize string
function capitalize(str: string) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
}

// Initial columns to display
const INITIAL_VISIBLE_COLUMNS = ["name", "type", "sharedWith", "syncStatus", "actions"];

type File = typeof files[0];
type Contact = typeof contacts[0];

export default function FileSharingPage() {
  // States for filtering, sorting, and pagination
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [typeFilter, setTypeFilter] = useState<Selection>("all");
  const [sharingFilter, setSharingFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  
  // Share modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [publicLink, setPublicLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("people");
  
  // Calculate total pages
  const pages = Math.ceil(files.length / rowsPerPage);
  
  // Check if search filter is applied
  const hasSearchFilter = Boolean(filterValue);

  // Get only the visible columns
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  // Apply filters to items
  const filteredItems = useMemo(() => {
    let filteredFiles = [...files];

    // Filter by search term
    if (hasSearchFilter) {
      filteredFiles = filteredFiles.filter((file) =>
        file.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    
    // Filter by status
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredFiles = filteredFiles.filter((file) =>
        Array.from(statusFilter).includes(file.syncStatus),
      );
    }
    
    // Filter by type
    if (typeFilter !== "all" && Array.from(typeFilter).length !== typeOptions.length) {
      filteredFiles = filteredFiles.filter((file) =>
        Array.from(typeFilter).includes(file.type),
      );
    }
    
    // Filter by sharing status
    if (sharingFilter !== "all" && Array.from(sharingFilter).length !== sharingOptions.length) {
      filteredFiles = filteredFiles.filter((file) => {
        const sharingStatus = Array.from(sharingFilter);
        
        if (sharingStatus.includes("shared") && file.sharedWith.length > 0) {
          return true;
        }
        
        if (sharingStatus.includes("not-shared") && file.sharedWith.length === 0 && !file.isPublic) {
          return true;
        }
        
        if (sharingStatus.includes("public") && file.isPublic) {
          return true;
        }
        
        return false;
      });
    }

    return filteredFiles;
  }, [files, filterValue, statusFilter, typeFilter, sharingFilter]);

  // Pagination
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Sort items
  const sortedItems = useMemo(() => {
    return [...items].sort((a: File, b: File) => {
      const first = a[sortDescriptor.column as keyof File];
      const second = b[sortDescriptor.column as keyof File];
      
      // String comparison
      if (typeof first === 'string' && typeof second === 'string') {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      
      // Array length comparison for sharedWith
      if (Array.isArray(first) && Array.isArray(second)) {
        const cmp = first.length - second.length;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
      
      // Numeric/default comparison
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Handle share button click
  const handleShare = (file: File) => {
    setSelectedFile(file);
    setSelectedContacts(new Set(file.sharedWith));
    setPublicLink(file.isPublic);
    setLinkCopied(false);
    onOpen();
  };
  
  // Toggle contact selection for sharing
  const toggleContact = (email: string) => {
    const newSelection = new Set(selectedContacts);
    if (newSelection.has(email)) {
      newSelection.delete(email);
    } else {
      newSelection.add(email);
    }
    setSelectedContacts(newSelection);
  };
  
  // Copy public link to clipboard
  const copyLink = () => {
    if (!selectedFile) return;
    
    // Generate fake URL for demo
    const baseUrl = "https://syncet.app/share/";
    const fileId = selectedFile.id.toString().padStart(6, '0');
    const linkText = `${baseUrl}${fileId}`;
    
    navigator.clipboard.writeText(linkText).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };
  
  // Apply sharing changes
  const applySharing = () => {
    if (!selectedFile) return;
    
    // Update the file's sharing settings
    const updatedFiles = files.map(file => {
      if (file.id === selectedFile.id) {
        return {
          ...file,
          sharedWith: Array.from(selectedContacts),
          isPublic: publicLink
        };
      }
      return file;
    });
    
    // In a real app, you would send this to your backend
    console.log("Updated sharing for file:", selectedFile.name);
    console.log("- Shared with:", Array.from(selectedContacts));
    console.log("- Public link:", publicLink);
    
    onClose();
  };

  // Render the cell content based on column
  const renderCell = useCallback((file: File, columnKey: React.Key) => {
    const cellValue = file[columnKey as keyof File];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={file.thumbnail ? {
              radius: "lg",
              size: "sm",
              src: file.thumbnail
            } : {
              radius: "lg",
              size: "sm",
              showFallback: true,
              fallback: getFileIcon(file.type, 18)
            }}
            classNames={{
              description: "text-default-500",
            }}
            description={file.size}
            name={cellValue}
          >
            {file.size}
          </User>
        );
      case "type":
        return (
          <div className="flex items-center gap-2">
            {getFileIcon(file.type, 16)}
            <span className="capitalize">{cellValue}</span>
          </div>
        );
      case "syncStatus":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[file.syncStatus]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "sharedWith":
        if (Array.isArray(cellValue) && cellValue.length > 0) {
          return (
            <div className="flex items-center gap-1">
              {file.isPublic && (
                <Chip size="sm" color="secondary" variant="dot">Public</Chip>
              )}
              <Chip size="sm" color="primary">{cellValue.length} people</Chip>
            </div>
          );
        } else if (file.isPublic) {
          return <Chip size="sm" color="secondary" variant="dot">Public</Chip>;
        } else {
          return <span className="text-default-400">Not shared</span>;
        }
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button 
              isIconOnly 
              size="sm" 
              variant="flat" 
              color="primary" 
              className="text-primary"
              onClick={() => handleShare(file)}
            >
              <ShareIcon size={18} />
            </Button>
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="download" startContent={<DownloadIcon size={18} />}>
                  Download
                </DropdownItem>
                <DropdownItem key="share" startContent={<ShareIcon size={18} />} onClick={() => handleShare(file)}>
                  Share
                </DropdownItem>
                <DropdownItem key="rename">Rename</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  // Helper function to get file icon based on type
  function getFileIcon(fileType: string, size: number = 20) {
    switch (fileType) {
      case 'image':
        return <ImageIcon className="text-fuchsia-500" size={size} />;
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="m10 4 6 4-6 4V4Z"/>
            <path d="M19 17v-6"/>
            <rect width="20" height="16" x="2" y="4" rx="2" ry="2"/>
          </svg>
        );
      case 'design':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
            <path d="m2 9 3-3 3 3"/>
            <path d="M13 18H7a2 2 0 0 1-2-2V6"/>
            <path d="m16 15 3 3 3-3"/>
            <path d="M22 12V6a2 2 0 0 0-2-2h-6"/>
          </svg>
        );
      default:
        return <DocIcon className="text-blue-500" size={size} />;
    }
  }

  // Handle rows per page change
  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  // Handle search input change
  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  // Top content with search, filters and actions
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 bg-content1/20",
            }}
            placeholder="Search files..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Type
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="File Type Filter"
                closeOnSelect={false}
                selectedKeys={typeFilter}
                selectionMode="multiple"
                onSelectionChange={setTypeFilter}
              >
                {typeOptions.map((type) => (
                  <DropdownItem key={type.uid} className="capitalize">
                    {capitalize(type.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Sharing
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Sharing Filter"
                closeOnSelect={false}
                selectedKeys={sharingFilter}
                selectionMode="multiple"
                onSelectionChange={setSharingFilter}
              >
                {sharingOptions.map((option) => (
                  <DropdownItem key={option.uid} className="capitalize">
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button 
              className="bg-gradient-to-r from-primary to-primary-500 text-white" 
              endContent={<PlusIcon />} 
              size="sm"
            >
              Upload File
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {filteredItems.length} files</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="8" selected>8</option>
              <option value="12">12</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue, 
    statusFilter,
    typeFilter,
    sharingFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    filteredItems.length
  ]);

  // Bottom content with pagination
  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-primary text-white",
          }}
          color="primary"
          isDisabled={hasSearchFilter && filteredItems.length === 0}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All files selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, filteredItems.length]);

  // Table style classes
  const classNames = useMemo(
    () => ({
      wrapper: ["w-full", "bg-content1/5", "rounded-lg", "border-none", "shadow-sm"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "py-3",
        "group-data-[first=true]/row:first:before:rounded-none",
        "group-data-[first=true]/row:last:before:rounded-none",
        "group-data-[middle=true]/row:before:rounded-none",
        "group-data-[last=true]/row:first:before:rounded-none",
        "group-data-[last=true]/row:last:before:rounded-none",
      ],
    }),
    [],
  );

  // Filter contacts for search
  const filteredContacts = useMemo(() => {
    return contacts;
  }, []);

  return (
    <DashboardLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col gap-2 mb-6">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="/files">Files</BreadcrumbItem>
            <BreadcrumbItem>Sharing</BreadcrumbItem>
          </Breadcrumbs>
          <h1 className={title({ color: "foreground", size: "md" })}>File Sharing</h1>
          <p className="text-default-500">Share your files securely with team members or via public links</p>
        </div>
        
        <div className="bg-gradient-to-br from-content1/5 to-background rounded-xl p-4 md:p-6">
          <Table
            isCompact
            removeWrapper
            aria-label="File sharing table with search, filtering and actions"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            checkboxesProps={{
              classNames: {
                wrapper: "after:bg-primary after:text-white text-primary",
              },
            }}
            classNames={classNames}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody 
              emptyContent={
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-content1/20 flex items-center justify-center text-default-500 mb-4">
                    <FolderIcon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No files found</h3>
                  <p className="text-default-500 max-w-md mb-6">
                    {filterValue 
                      ? `No files matching "${filterValue}" were found.` 
                      : "No files match the current filters."}
                  </p>
                  <Button 
                    color="primary"
                    onClick={() => {
                      setFilterValue("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                      setSharingFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              } 
              items={sortedItems}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
      
      {/* Sharing Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedFile && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-default-100">
                      {getFileIcon(selectedFile.type, 24)}
                    </div>
                    <div>
                      <h3>Share "{selectedFile.name}"</h3>
                      <p className="text-small text-default-500">Choose how you want to share this file</p>
                    </div>
                  </div>
                )}
              </ModalHeader>
              <ModalBody>
                <Tabs 
                  selectedKey={activeTab}
                  onSelectionChange={setActiveTab as any}
                  aria-label="Sharing options"
                >
                  <Tab key="people" title="People">
                    <Card className="bg-content1/10 border-none">
                      <CardBody>
                        <div className="flex flex-col gap-4">
                          <Input
                            isClearable
                            placeholder="Search people or email addresses..."
                            startContent={<SearchIcon className="text-default-300" />}
                            variant="bordered"
                          />
                          
                          <div className="max-h-60 overflow-y-auto">
                            {filteredContacts.map((contact: Contact) => (
                              <div 
                                key={contact.id} 
                                className="flex items-center gap-3 py-2 border-b border-divider last:border-none"
                              >
                                <Checkbox
                                  isSelected={selectedContacts.has(contact.email)}
                                  onValueChange={() => toggleContact(contact.email)}
                                />
                                <User
                                  avatarProps={{
                                    src: contact.avatar,
                                    size: "sm",
                                  }}
                                  description={contact.email}
                                  name={contact.name}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="link" title="Public Link">
                    <Card className="bg-content1/10 border-none">
                      <CardBody>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-medium font-medium">Anyone with the link can view</h4>
                              <p className="text-small text-default-500">
                                Create a public link that can be shared with anyone
                              </p>
                            </div>
                            <Switch 
                              isSelected={publicLink}
                              onValueChange={setPublicLink}
                              color="primary"
                            />
                          </div>
                          
                          {publicLink && (
                            <div className="mt-4">
                              <div className="flex gap-2">
                                <Input
                                  isReadOnly
                                  value={selectedFile ? `https://syncet.app/share/${selectedFile.id.toString().padStart(6, '0')}` : ''}
                                  variant="bordered"
                                  classNames={{
                                    inputWrapper: "bg-content1/20"
                                  }}
                                  startContent={<LinkIcon className="text-default-400" size={16} />}
                                />
                                <Button 
                                  color={linkCopied ? "success" : "primary"}
                                  onClick={copyLink}
                                  startIcon={linkCopied ? <CheckIcon size={16} /> : <ClipboardIcon size={16} />}
                                >
                                  {linkCopied ? "Copied!" : "Copy"}
                                </Button>
                              </div>
                              <p className="text-tiny text-default-500 mt-2">
                                Anyone with this link will be able to view and download this file.
                              </p>
                            </div>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={applySharing}>
                  Share
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
}