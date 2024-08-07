import React from 'react';
import Brand from './shopBy/Brand';
import Category from './shopBy/Category';
import Color from './shopBy/Color';
import SubCategory from './shopBy/subCtegory';
//import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <SubCategory />
      <Brand />
      <Color />
      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;
