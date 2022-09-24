interface SettingsCategoryListItemProps {
  name: string;
  isActive?: boolean;
}

export const SettingsCategoryListItem = ({ name, isActive }: SettingsCategoryListItemProps) => {

  let css;
  if (isActive) {
    css = "settings-category-list-item active";
  } else {
    css ="settings-category-list-item";
  }

  return (
    <div className={css}>
      {name}
    </div>
  );
};
