import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider
} from "~/common/components/ui/sidebar";
import { MessageCard } from "../components/message-card";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="h-[calc(100vh-14rem)] max-h-[calc(100vh-14rem)] min-h-full overflow-hidden">
      <Sidebar variant="floating" className="pt-16">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageCard
                  key={index}
                  id={index.toString()}
                  name={`User ${index}`}
                  lastMessage={`Last message ${index}`}
                  avatarUrl="https://github.com/shadcn.png"
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="h-full w-full overflow-y-auto">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
