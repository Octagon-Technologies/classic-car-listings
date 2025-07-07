import { supabase } from "../config/config";

export async function deleteVehicle(car) {
  console.log("car is ", car);
  const images = car.images.map((image) => `list/${image}`);
  console.log(images);

  // Remove car images from the Supabase Storage
  const { data, error } = await supabase.storage.from("cars").remove(images);

  if (error) {
    console.error("Image delete error", error);
    return false;
  }

  // Remove cars from Supabase DB
  const deleteResponse = await supabase
    .from("cars")
    .delete()
    .eq("slugName", car.slugName);

  console.log(`deleteResponse.status is ${deleteResponse.status}`);

  if (deleteResponse.error) {
    console.error("Car delete error", deleteResponse.error);
    return false;
  }

  return true;
}
