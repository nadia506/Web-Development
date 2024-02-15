import Client from "../model/Client.js";
import ApiError from "../model/ApiError.js";

class ClientDao {
  // returns the new client data
  // name and email should be defined and nonempty (otherwise, returns an error)
  async create({ name, email }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every client must have a none-empty name!");
    }

    if (email === undefined || email === "") {
      throw new ApiError(400, "Every client must have a valid email!");
    }

    const client = await Client.create({ name, email });
    return client;
  }

  // clients may not change their email!
  // returns the updated client data
  // returns an error if there is no client with the given ID
  async update(id, { name }) {
    const client = await Client.findById(id);
    if (!client) {
      throw new ApiError(404, "There is no client with the given ID!");
    } else {
      const client = await Client.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );
      return client;
    }
  }

  // returns the deleted client data
  // returns an error if there is no client with the given ID
  async delete(id) {
    const client = await Client.findById(id);
    if (!client) {
      throw new ApiError(404, "There is no client with the given ID!");
    } else {
      const client = await Client.findByIdAndDelete(id);
      return client;
    }
  }

  // returns an empty array if there is no client with the given ID
  async read(id) {
    const client = await Client.findById(id);
    if (client) {
      return client;
    } else {
      return [];
    }
  }

  // returns an empty array if there is no client in the database
  //  or no client matches the search queries
  async readAll(query = "") {
    const client = await Client.find();
    if (!client) {
      return [];
    } else {
      return client;
    }
  }
}

export default ClientDao;
