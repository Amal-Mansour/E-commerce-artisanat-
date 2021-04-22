import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { Form, Button } from "react-bootstrap";
import Loading from "../utils/loading/Loading";
import { useHistory, useParams } from "react-router-dom";
import "./createProduct.css";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "traditional necklace it's available in our store. Promo codes, flash sales, free delivery, find the product of your dreams",
  content: "available in our web store...!!!",
  category: "",
  _id: "",
};
function CreateProducts() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.usersAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!isAdmin) return alert("You 're not authorized...!!");
      const file = e.target.files[0];

      if (!file) return alert("File not exist...!!");

      if (file.size > 1024 * 1024)
        //1mb
        return alert("Size too large...!!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect...!!");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isAdmin) return alert("You 're not authorized...!!");
      if (!images) return alert("no Image Upload...!!");

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          `/api/products`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
      }

      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Product reference:</Form.Label>
          <Form.Control
            type="text"
            name="product_id"
            className="input_text"
            disabled={onEdit}
            value={product.product_id}
            onChange={handleChangeInput}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Product name:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            className="input_text"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Product price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            className="input_text"
            value={product.price}
            onChange={handleChangeInput}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            name="description"
            className="input_textarea"
            value={product.description}
            onChange={handleChangeInput}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            className="input_textarea"
            value={product.content}
            onChange={handleChangeInput}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Categories:</Form.Label>
          <Form.Control
            as="select"
            name="category"
            className="categ"
            value={product.category}
            onChange={handleChangeInput}
          >
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="secondary" className="btn3" type="submit">
          {" "}
          {onEdit ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateProducts;
