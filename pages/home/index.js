import AppProjects from "../../pages-parts/AppProjects/AppProjects";
import { StackedLayout } from "../../pages-parts/Layouts/StackedLayout";

export default function HomeProfile() {
  return (
    <StackedLayout title="My Projects">
      <AppProjects></AppProjects>
    </StackedLayout>
  );
}
