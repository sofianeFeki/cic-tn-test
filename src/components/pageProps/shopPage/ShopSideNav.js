import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
//import Price from "./shopBy/Price";

function Items({
  currentItems,
  selectedBrands,
  selectedCategories,
  selectedColors,
}) {
  // Filter items based on selected brands and categories
  const filteredItems = currentItems.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) => category.title === item.cat);

    const isColorSelected =
      isCategorySelected && item.cat === "Encre"
        ? selectedColors.length === 0 ||
          selectedColors.some((color) => color.title === item.color)
        : true;

    return isBrandSelected && isCategorySelected && isColorSelected;
  });

  return (
    <>
      {filteredItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
            pdf={item.pdf}
            ficheTech={item.ficheTech}
          />
        </div>
      ))}
    </>
  );
}

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <Brand />
      <Color />
      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;
