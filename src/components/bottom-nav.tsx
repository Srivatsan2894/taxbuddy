import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calculator, GitCompareArrows, BookOpen, User } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

const tabs: Array<{
  to: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/calculator", label: "Calculator", Icon: Calculator },
  { to: "/compare", label: "Compare", Icon: GitCompareArrows },
  { to: "/learn", label: "Learn", Icon: BookOpen },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-card/95 px-2 py-2 backdrop-blur"
    >
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`grid size-9 place-items-center rounded-xl transition-colors ${
                    active ? "bg-foreground text-background" : "bg-transparent"
                  }`}
                >
                  <Icon className="size-[18px]" strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}