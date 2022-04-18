import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  category: { type: String },
  price: { type: String },
  splash_image: { type: String },
  images: [{ type: String }],
  sale: { type: Boolean },
  street: { type: String },
  addres: { type: String },
  desc: { type: String },
  properties: [
    { bedrooms: { type: Number } },
    { parking: { type: Number } },
    { bathrooms: { type: Number } },
    { area: { type: String } },
  ],
  features: [
    { electricity: { type: Boolean } },
    { gas: { type: Boolean } },
    { city_water: { type: Boolean } },
    { sewrage: { type: Boolean } },
    { construction: { type: Number } },
    { energy_rating: { type: Boolean } },
  ],
  location: [{ lat: { type: String } }, { long: { type: String } }],
});

const propertys = mongoose.model("property", propertySchema);
export default propertys;
