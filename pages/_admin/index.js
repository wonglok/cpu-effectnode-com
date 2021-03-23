import { useSession } from "next-auth/client";
import { useEffect } from "react";

export default function system() {
  const [session, loading] = useSession();
  useEffect(() => {
    if (!loading) {
      if (session) {
        if (session.user.isAdmin) {
          // ok
        } else {
          window.location =
            "/api/auth/signin?callbackUrl=" +
            encodeURIComponent(`${window.location.href}`);
        }
      } else if (!session) {
        setTimeout(() => {
          window.location =
            "/api/auth/signin?callbackUrl=" +
            encodeURIComponent(`${window.location.href}`);
        }, 1.5 * 1000);
      }
    }
  }, [loading, session]);

  if (loading) {
    return <div>Checking Security...</div>;
  }
  if (session) {
    return <div>System</div>;
  } else {
    return <div>Needs Login...</div>;
  }
}
