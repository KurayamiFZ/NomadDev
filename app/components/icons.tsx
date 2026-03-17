// components/icons.tsx
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

export type IconName = keyof typeof Icons; // ← add this export

interface IconComponentProps extends LucideProps {
  // ← also fix __LucideProps__ → LucideProps
  name: IconName;
}

export default function Icon({ name, ...props }: IconComponentProps) {
  const LucideIcon = Icons[name] as React.FC<LucideProps>;
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
