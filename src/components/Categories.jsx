import { useState } from "react";

function Categories() {
  const [indexOn, setIndexOn] = useState(0);

  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  const onCategory = (x) => {
    setIndexOn(x);
  };

  const ListItem = ({ elem, index }) => (
    <li
      onClick={() => onCategory(index)}
      className={indexOn == index ? "active" : ""}
    >
      {elem}
    </li>
  );

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <ListItem key={index} elem={elem} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default Categories;
