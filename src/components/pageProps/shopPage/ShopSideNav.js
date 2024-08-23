import React from 'react';
import Brand from './shopBy/Brand';
import Category from './shopBy/Category';
import Color from './shopBy/Color';
import SubCategory from './shopBy/subCtegory';
import { useSelector } from 'react-redux';
//import Price from "./shopBy/Price";

const ShopSideNav = () => {
  const checkedCategories = useSelector(
    (state) => state.orebi.filters.category
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      {checkedCategories.includes('Consommable') && <SubCategory />}
      <Brand />
      <Color />
      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;
