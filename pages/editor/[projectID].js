import { useRouter } from "next/router";
import AppEditor from "../../pages-parts/AppEditor/AppEditor";

//
export default function ProjectEditor() {
  const router = useRouter();
  const { projectID } = router.query;

  return projectID ? (
    <AppEditor projectID={projectID}></AppEditor>
  ) : (
    <div></div>
  );
}
