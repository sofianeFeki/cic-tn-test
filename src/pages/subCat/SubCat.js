import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useParams } from "react-router-dom";
import Brand from "../../components/pageProps/shopPage/shopBy/Brand";
import Color from "../../components/pageProps/shopPage/shopBy/Color";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/home/Products/Product";
import Heading from "../../components/home/Products/Heading";
import { paginationItems } from "../../constants";

const Offer = () => {
  const [prevLocation] = useState("");
  const { subCat } = useParams();
  const dispatch = useDispatch();

  //get selected brand
  const selectedBrands = useSelector(
    (state) => state.orebiReducer.checkedBrands
  );
  const selectedCategories = useSelector(
    (state) => state.orebiReducer.checkedCategorys
  );
  const selectedColors = useSelector(
    (state) => state.orebiReducer.checkedColors
  );

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(paginationItems);
    console.log(paginationItems);
  }, [data]);

  //   const filteredItems = data.filter((item) => {
  //     const isBrandSelected =
  //       selectedBrands.length === 0 ||
  //       selectedBrands.some((brand) => brand.title === item.brand);

  //     const isCategorySelected =
  //       selectedCategories.length === 0 ||
  //       selectedCategories.some((category) => category.title === item.cat);

  //     const isColorSelected =
  //       selectedColors.length === 0 ||
  //       selectedColors.some((color) => color.title === item.color);

  //     return isBrandSelected && isCategorySelected && isColorSelected;
  //   });

  const categoryData = paginationItems.filter((item) => item.subCat === subCat);
  const renderFilters = () => {
    switch (subCat) {
      case "toner":
        return <Brand />;
      case "toner":
        return <Color />;
      // Add more cases for other categories as needed
      default:
        return null;
    }
  };

  return (
    // <div className="max-w-container mx-auto">
    //   <Breadcrumbs title={category} prevLocation={prevLocation} />
    //   <div className="pb-10">
    //     <SpecialOffers />
    //   </div>
    // </div>

    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title={subCat} prevLocation={prevLocation} />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          {renderFilters()}
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <div className="w-full pb-20">
            <Heading heading="Special Offers" />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
              {paginationItems.map((data) => (
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
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Offer;
