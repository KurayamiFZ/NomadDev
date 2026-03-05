// components/Icon.tsx
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

type IconName = keyof typeof Icons;

interface IconComponentProps extends LucideProps {
  name: IconName;
}

export default function Icon({ name, ...props }: IconComponentProps) {
  const LucideIcon = Icons[name] as React.FC<LucideProps>;

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
}
