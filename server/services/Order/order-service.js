import Order from "../../model/order.js";

// add order
export const save = async (newOrder) => {
  const course = new Order(newOrder); // created instance of course and saved in mongodb
  return await course.save();
};

//  find order by id
export const find = async (id) => {
  const courses = await Order.findById(id).exec(); //return promise so using await
  return courses;
};

// update order
export const update = async (updatedOrder, id) => {
  const course = await Order.findByIdAndUpdate(id, updatedOrder, {
    new: true,
  }).exec();
  return course;
};

// delete order
export const remove = async (id) => {
  return await Order.findByIdAndDelete(id).exec();
};

// get all orders
export const search = async (params = {}) => {
  const orders = await Order.find(params).exec(); //return promise so using await
  return orders;
};
