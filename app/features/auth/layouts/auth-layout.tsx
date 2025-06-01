import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/ui/magicui/flickering-grid";

export default function AuthLayout() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2">
      <div>
        <FlickeringGrid
          squareSize={4}
          gridGap={5}
          maxOpacity={0.5}
          flickerChance={0.2}
          color="var(--color-primary)"
        />
      </div>
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
