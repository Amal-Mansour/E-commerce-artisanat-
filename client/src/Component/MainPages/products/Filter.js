import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { Form } from "react-bootstrap";

function Filter() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category,setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <Form>
          <Form.Control
            as="select"
            size="sm"
            name="category"
            onChange={handleCategory}
          >
            <option value="">All Products</option>
            {categories.map((category) => (
              <option value={"category=" + category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form>
      </div>

      <Form.Control
        className="search"
        type="search"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row sort">
        <Form>
          <Form.Control
            as="select"
            size="sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sorted By</option>
            <option value="">Newest</option>
            <option value="sort=oldest">Oldest</option>
            <option value="sort=-sold">Best sales</option>
            <option value="sort=-price">Price: Hight-Low</option>
            <option value="sort=price">Price: Low-Hight</option>
          </Form.Control>
        </Form>
      </div>
    </div>
  );
}

export default Filter;
