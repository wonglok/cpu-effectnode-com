import { useRouter } from "next/router";

//
export default function ProjectEditor() {
  const router = useRouter();
  const { projectID } = router.query;

  return <div>Project Editor {projectID}</div>;
}
