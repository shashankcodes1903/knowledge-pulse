import { ChatWindow } from "@/components/chat/ChatWindow";
import { PageHeader } from "@/components/shared/PageHeader";

export const dynamic = "force-dynamic";

export default function AskPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ask"
        description="Ask questions grounded in your connected knowledge."
      />

      <ChatWindow />
    </div>
  );
}
