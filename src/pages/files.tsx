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
  SortDescriptor
} from "@heroui/react";
import { useDisclosure } from "@heroui/modal";
import { 
  ImageIcon, 
  DocIcon, 
  FolderIcon 
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

// Mock file data
const files = [
  { 
    id: 1, 
    name: "Project Presentation.pptx", 
    type: "document", 
    size: "4.2 MB", 
    syncStatus: "synced", 
    lastModified: "2 mins ago",
    device: "Laptop",
    thumbnail: null
  },
  { 
    id: 2, 
    name: "Profile Picture.png", 
    type: "image", 
    size: "1.8 MB", 
    syncStatus: "synced", 
    lastModified: "15 mins ago",
    device: "Phone",
    thumbnail: "https://i.pravatar.cc/150?img=3"
  },
  { 
    id: 3, 
    name: "Quarterly Report.pdf", 
    type: "document", 
    size: "2.5 MB", 
    syncStatus: "syncing", 
    lastModified: "37 mins ago",
    device: "Laptop",
    thumbnail: null
  },
  { 
    id: 4, 
    name: "Budget 2024.xlsx", 
    type: "document", 
    size: "3.1 MB", 
    syncStatus: "synced", 
    lastModified: "1 hour ago",
    device: "Tablet",
    thumbnail: null
  },
  { 
    id: 5, 
    name: "Vacation Photos.jpg", 
    type: "image", 
    size: "5.7 MB", 
    syncStatus: "synced", 
    lastModified: "2 hours ago",
    device: "Phone",
    thumbnail: "https://i.pravatar.cc/150?img=5"
  },
  { 
    id: 6, 
    name: "Client Contract.docx", 
    type: "document", 
    size: "578 KB", 
    syncStatus: "synced", 
    lastModified: "3 hours ago",
    device: "Desktop",
    thumbnail: null
  },
  { 
    id: 7, 
    name: "Project Timeline.xlsx", 
    type: "document", 
    size: "1.2 MB", 
    syncStatus: "synced", 
    lastModified: "5 hours ago",
    device: "Laptop",
    thumbnail: null
  },
  { 
    id: 8, 
    name: "App Mockup.fig", 
    type: "design", 
    size: "8.4 MB", 
    syncStatus: "failed", 
    lastModified: "Yesterday",
    device: "Desktop",
    thumbnail: null
  },
  { 
    id: 9, 
    name: "Team Meeting Notes.txt", 
    type: "document", 
    size: "12 KB", 
    syncStatus: "synced", 
    lastModified: "Yesterday",
    device: "Phone",
    thumbnail: null
  },
  { 
    id: 10, 
    name: "Product Demo.mp4", 
    type: "video", 
    size: "24.8 MB", 
    syncStatus: "pending", 
    lastModified: "2 days ago",
    device: "Desktop",
    thumbnail: null
  },
  { 
    id: 11, 
    name: "Marketing Plan.pdf", 
    type: "document", 
    size: "3.7 MB", 
    syncStatus: "synced", 
    lastModified: "3 days ago",
    device: "Laptop",
    thumbnail: null
  },
  { 
    id: 12, 
    name: "Logo Design.ai", 
    type: "design", 
    size: "5.2 MB", 
    syncStatus: "synced", 
    lastModified: "5 days ago",
    device: "Desktop",
    thumbnail: null
  }
];

// Column definitions
const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "SIZE", uid: "size", sortable: true },
  { name: "MODIFIED", uid: "lastModified", sortable: true },
  { name: "DEVICE", uid: "device", sortable: true },
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
const INITIAL_VISIBLE_COLUMNS = ["name", "type", "size", "syncStatus", "actions"];

type File = typeof files[0];

export default function FilesPage() {
  // States for filtering, sorting, and pagination
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [typeFilter, setTypeFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  
  // Used for modal dialog
  const { isOpen, onOpen, onClose } = useDisclosure();

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

    return filteredFiles;
  }, [files, filterValue, statusFilter, typeFilter]);

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
      
      // Numeric/default comparison
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
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
                <DropdownItem key="share" startContent={<ShareIcon size={18} />}>
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

  return (
    <DashboardLayout>
      <section className="py-8 md:py-10">
        <div className="flex flex-col gap-2 mb-6">
          <Breadcrumbs>
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Files</BreadcrumbItem>
          </Breadcrumbs>
          <h1 className={title({ color: "foreground", size: "md" })}>Files</h1>
        </div>
        
        <div className="bg-gradient-to-br from-content1/5 to-background rounded-xl p-4 md:p-6">
          <Table
            isCompact
            removeWrapper
            aria-label="Files table with search, filtering and actions"
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
    </DashboardLayout>
  );
}