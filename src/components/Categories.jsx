const Categories = ({ value, onClickCategory }) => {
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  const ListItem = ({ categoryName, index }) => (
    <li
      onClick={() => onClickCategory(index)}
      className={value === index ? "active" : ""}
      type="button"
    >
      {categoryName}
    </li>
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <ListItem key={index} categoryName={elem} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
