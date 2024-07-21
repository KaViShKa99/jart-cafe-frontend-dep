import { materials, commonSizes } from "../data/Data";

const initializeMaterialsSizes = () => {
  return materials.map((material) => ({
    material: material.name,
    sizes: commonSizes.map((size) => ({ size, price: "" })),
    expanded: false,
  }));
};

export const PREVIEW_STATE = {
  category: "",
  title: "",
  description: "",
  price: "",
  lastPrice: 0,
  images: [],
  materials: initializeMaterialsSizes(),
};
