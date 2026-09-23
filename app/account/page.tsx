import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Account", description: "Sign in or create a LAMI MEAT account to save your cart and reorder faster." };

export default function AccountPage() {
  return (
    <>
      <PageHeader eyebrow="Account" line1="Welcome" line2="back.">
        <p className="m-0">Sign in to save your box and reorder faster. The account icon in the nav opens the same sign-in.</p>
      </PageHeader>
      <ComingSoon design="Lami-Auth.dc.html" sections={["Sign in / Create account tabs using lib/auth-validate.ts + lib/session.ts", "Signed-in state: “Good to see you.”, View cart (n) / The range / Sign out", "Right column: framed image + 3 benefits"]} />
    </>
  );
}
