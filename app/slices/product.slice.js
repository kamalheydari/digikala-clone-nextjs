import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const fetchDetails = createAsyncThunk(
  "product/fetchDetails",
  async (categoryID) => {
    const res = await fetch(`/api/details/${categoryID}`);
    const data = await res.json();
    return data?.details;
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productID) => {
    const res = await fetch(`/api/products/${productID}`);
    const data = await res.json();
    return data?.product;
  }
);

const initialState = {
  product: {
    title: "",
    price: 0,
    discount: 0,
    description: "",
    images: [],
    sizes: [],
    colors: [],
    category: "",
    inStock: 0,
    info: [],
    specification: [],
  },
  infoArray: [],
  specificationArray: [],
  optionsType: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    changeProductItems: (state, action) => {
      state.product[action.payload.name] = action.payload.value;
    },
    addItem: (state, action) => {
      const { type, value } = action.payload;

      if (type === "sizes")
        state.product.sizes.push({ id: nanoid(), size: value });

      if (type === "colors")
        state.product.colors.push({ id: nanoid(), ...value });

      if (type === "images") state.product.images.push(...value);

      if (type === "uploaded-images") state.product.images = value;
    },
    deleteItem: (state, action) => {
      const { type, id } = action.payload;
      const index = state.product[type].findIndex((item) => item.id === id);

      if (type === "sizes" && index !== -1)
        state.product.sizes.splice(index, 1);
      if (type === "colors" && index !== -1)
        state.product.colors.splice(index, 1);
    },
    deleteImage: (state, action) => {
      state.product.images.splice(action.payload, 1);
    },

    editItem: (state, action) => {
      const { id, type, value } = action.payload;
      state.product[type].forEach((item) => {
        if (item.id === id) {
          if (type == "colors") {
            item.name = value.name;
            item.hashCode = value.hashCode;
          }
          if (type === "sizes") item.size = value;
        }
      });
    },
    resetProduct: (state, action) => {
      state.product = initialState.product;
      state.infoArray = [];
      state.specificationArray = [];
      state.optionsType = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDetails.fulfilled, (state, action) => {
      const { optionsType, specification, info } = action.payload;
      state.infoArray = info.map((item) => item.name);
      state.specificationArray = specification.map((item) => item.name);
      state.optionsType = optionsType;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default productSlice.reducer;

export const {
  changeProductItems,
  addInfo,
  addSpecification,
  addCategory,
  addItem,
  deleteItem,
  editItem,
  deleteImage,
  resetProduct,
} = productSlice.actions;
