import React from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface IconProps {
  Icon: LucideIcon;
  size?: number;
  className?: string;
}

export default function Icon({ Icon, size = 24, className = '' }: IconProps) {
  return <Icon size={size} className={className} />;
}
