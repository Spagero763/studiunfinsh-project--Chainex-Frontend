import { MembershipPanel } from "@/components/MembershipPanel";
import { StakePanel } from "@/components/StakePanel";

export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StakePanel />
        </div>
        <div className="lg:col-span-1">
          <MembershipPanel />
        </div>
      </div>
    </div>
  );
}
