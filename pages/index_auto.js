import { signIn, signOut, useSession } from "next-auth/client";
import Home from "../pages-parts/Home/Home";
import LandingPage from "../pages-parts/LandingPage/LandingPage";

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center bg-white">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {!session && (
        <>
          <LandingPage></LandingPage>
        </>
      )}
      {session && (
        <>
          <Home session={session}></Home>
          {/* {JSON.stringify(session.user)}
          Signed in as {session.user.name} <br />
          <img src={session.user.image} className={" h-14"}></img>
          <button onClick={() => signOut()}>Sign out</button> */}
        </>
      )}
    </>
  );
}
