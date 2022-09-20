interface FixProps {
  name: string;
  description: string;
}

export const NewItem = ({ name, description }: FixProps) => {
  return (
    <div className="changelog-item">
      <li className="changelog-list-item">
        <p className="changelog-list-item-name">{name}</p>
        <p className="changelog-list-item-description">{description}</p>
      </li>  
    </div>
  );
};