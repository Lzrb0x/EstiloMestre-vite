import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; 
import { Menu } from "lucide-react";
import { useState } from "react";


type NavItem = {
  label: string;
  href: string;
};

type SheetComponentProps = {
  navItems: NavItem[];
  ctaItem: NavItem[];
};

export const SheetComponent = ({ navItems, ctaItem }: SheetComponentProps) => {

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 text-slate-700" />
      </SheetTrigger>

      <SheetContent className="min-w-[80%] rounded-l-4xl p-5">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4" onClick={() => setOpen(false)}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-slate-700 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          {ctaItem.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="w-full mt-4 bg-primary text-white font-medium text-center px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};