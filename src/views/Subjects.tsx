import { SubjectsContainer } from "../components/subjects/SubjectsContainer";
import { Sidebar } from "../components/utils/Sidebar";

export const Subjects = () => {
  return (
    <div className="container">
      <Sidebar activeItem="subjects" />
      <SubjectsContainer />
    </div>
  );
};
