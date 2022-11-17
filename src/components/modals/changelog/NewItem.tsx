interface NewItemProps {
  name?: string;
  description?: string;
}

export const NewItem = ({ name, description }: NewItemProps) => {
  return (
    <div className="changelog-item">
      <li className="changelog-list-item">
        <p className="changelog-list-item-name"><strong>{name}</strong> {description}</p>
      </li>
    </div>
  );
};
