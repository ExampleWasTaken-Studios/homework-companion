
/**
 * @param data The subject data
 */
interface SubjectProps {
  data: Subject;
  onClick: () => void;
}

export const Subject = ({ data, onClick }: SubjectProps) => {

  return (
    <li 
      className="subject-list-item"
      onClick={onClick}
    >
      {data.name}
    </li>
  );
};