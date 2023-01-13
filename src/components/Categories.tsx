import React from "react";

type CategoriesProps = {
  value: number;
  // ukazujemy typ (function)
  // ktory nie wymaga przy return zadnego znaczenia
  // void oznacza ze zwroci "nic"
  onClickCategory: (index: number) => void;
};

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

// ukazujemy ze wewnatrz siebie ma przyjmowac specjalny property
// wtedy React.FC automatycznie typyzuje props ktore przychodza
const Categories: React.FC<CategoriesProps> = ({
  value,
  onClickCategory,
}: CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
