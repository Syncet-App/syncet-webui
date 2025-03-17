import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
  size = 36,
  height,
  ...props
}) => (
  <svg
    height={size || height}
    viewBox="0 0 36 36"
    width={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="syncetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff9a9e" />
        <stop offset="30%" stopColor="#fad0c4" />
        <stop offset="62%" stopColor="#fbc2eb" />
        <stop offset="100%" stopColor="#a6c1ee" />
      </linearGradient>
    </defs>
    <path
      d="M18 4c7.732 0 14 6.268 14 14s-6.268 14-14 14S4 25.732 4 18 10.268 4 18 4zm0 4c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8zm4.242 3.172l1.414 1.414-7.07 7.07-4.243-4.242 1.414-1.415 2.829 2.829 5.656-5.656z"
      fill="url(#syncetGradient)"
    />
  </svg>
);