import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { paginationItems } from "../../../constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleBrand, toggleColor } from "../../../redux/orebiSlice";

const CategoryPage = () => {
  const { category } = useParams();

  //get selected brand
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );

  const selectedColors = useSelector(
    (state) => state.orebiReducer.checkedColors
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(paginationItems);
    console.log(categoryData);
  }, [data]);

  const filteredItems = data.filter((item) => {
    const isBrandSelected =
      selectedBrands.length === 0 ||
      selectedBrands.some((brand) => brand.title === item.brand);

    const isCategorySelected = item.cat === category; // Compare with category from URL

    const isColorSelected =
      selectedColors.length === 0 ||
      selectedColors.some((color) => color.title === item.color);

    return isBrandSelected && isCategorySelected && isColorSelected;
  });

  const categoryData = filteredItems.filter((item) => item.cat === category);
  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {categoryData.map((data) => (
          <Product
            key={data._id}
            _id={data._id}
            img={data.img}
            productName={data.productName}
            price={data.price}
            color={data.color}
            badge={true}
            des={data.des}
            ficheTech={data.ficheTech}
            video={data.video}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
