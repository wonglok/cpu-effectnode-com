import { signIn, signOut, useSession } from "next-auth/client";
import * as Projects from "../util/apis/ProjectsAPI";

export const MyProjects = ({ session }) => {
  let onCreateProject = () => {
    if (session && session.user) {
      Projects.create({
        userID: session.user.uid,
        displayName: "loklok",
      }).then(console.log);
    }
  };

  return (
    <button onClick={onCreateProject} className="p-3 m-3">
      Create Project
    </button>
  );
};

export default function Page() {
  const [session, loading] = useSession();

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <div>Test</div>

          <div>
            <MyProjects session={session}></MyProjects>
          </div>

          <div>Test</div>

          <pre>
            {JSON.stringify(session.user, null, "  ")}
            Signed in as {session.user.name} <br />
            <img src={session.user.image} className={" h-14"}></img>
            <button onClick={() => signOut()}>Sign out</button>
          </pre>
        </>
      )}
    </>
  );
}
