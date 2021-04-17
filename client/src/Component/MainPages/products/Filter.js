import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

// import { Form } from "react-bootstrap";

const Filter = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.categoriesAPI.categories;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;
  // const handleChange = (e) => {
  //   setSearch(e.target.value.toLowerCase());
  return (
    <div className="filter_menu">
      <div>
        <span>FIlter:</span>
        <select name="category" value={category}>
          <option value="">Categry</option>
          {categories.map((category) => {
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>;
          })}
        </select>
      </div>

      <div className="search">
        <input type="text" placeholder="Enter your search!" />
      </div>

      <div className="row sort">
        <span>Sort By: </span>
        <select>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
};

// const state = useContext(GlobalState);
//const [categories] = state.categoriesAPI.categories
//const [sort, setSort] = state.productsAPI.sort;
// const [search, setSearch] = state.productsAPI.search;

export default Filter;
