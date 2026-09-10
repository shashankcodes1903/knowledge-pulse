import { requireUser } from "@/lib/auth";
import { ProfileCard } from "@/components/profile/ProfileCard";

export const metadata = {
  title: "Account Profile | KnowledgePulse",
  description: "View and manage your KnowledgePulse account, selected services, and knowledge resources.",
};

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ProfileCard user={user} />
    </div>
  );
}
