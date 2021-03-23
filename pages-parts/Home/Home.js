import { signIn, signOut, getSession } from "next-auth/client";

export default function HomePage() {
  return (
    <div>
      {/* <button onClick={signOut}>Logout</button> */}
      <div>My Works</div>
    </div>
  );
}
