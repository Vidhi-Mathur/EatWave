import { ClipboardList, BadgeCheck, CookingPot, Truck, House } from 'lucide-react';

export const getStatusIcon = (status, isCompleted) => {
    const color = isCompleted ? "White" : "Gray";
    switch (status) {
      case 'Placed': return <ClipboardList size={48} color={color} strokeWidth={1.5} />
      case 'Confirmed': return <BadgeCheck size={48} color={color} strokeWidth={1.5} />
      case 'Preparing': return <CookingPot size={48} color={color} strokeWidth={1.5} />
      case 'On the way': return <Truck size={48} color={color} strokeWidth={1.5} />
      case 'Delivered': return <House size={48} color={color} strokeWidth={1.5} />
      default: return null;
    }
};