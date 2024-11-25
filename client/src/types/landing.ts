export interface AuthInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  placeholder: string;
  type?: string;
}

export interface AuthHeadingProps {
  children: React.ReactNode;
}

export interface AuthButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}
