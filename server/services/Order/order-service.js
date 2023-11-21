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
export const getAll = async (params = {}) => {
  const orders = await Order.find(params).exec(); //return promise so using await
  return orders;
};

// search orders
export const search = async (params = {}, page = 1, pageSize = 10) => {
  try {
    // Extract page and pageSize from the request query parameters
    const { page: reqPage, pageSize: reqPageSize } = params;

    // Use the extracted values or fallback to default values if not provided
    const skip = ((reqPage || page) - 1) * (reqPageSize || pageSize);

    const orders = await Order.find(params)
      .skip(skip)
      .limit(reqPageSize || pageSize)
      .exec();

    return orders;
  } catch (error) {
    // Handle errors (e.g., log, throw, or return a default value)
    console.error("Error in orderService.search:", error);
    throw error;
  }
};
