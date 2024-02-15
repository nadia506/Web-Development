import Bookmark from "../model/Bookmark.js";

class BookmarkDAO {
  // return the created bookmark
  // throws error when title or url are invalid
  async create({ title, url }) {
    try {
      const bookmark = await Bookmark.create({ title, url });
      return bookmark;
    } catch (err) {
      throw new ApiError(400, err.message)
    }

  }

  // return all bookmarks
  async readAll({ title, url }) {
    const filter = {};
    if (title) {
      filter.title = title;
    }

    if (url) {
      filter.url = url;
    }

    const bookmarks = await Bookmark.find(filter);
    return bookmarks;
  }

  // return the bookmark with the given id
  // return undefined if id does not exist in our database
  async read(id) {
    const bookmark = await Bookmark.findById(id);
    return bookmark;
  }

  // return the updated bookmark
  async update({ id, title, url }) {
    const bookmark = await Bookmark.findByIdAndUpdate(
      id,
      { title, url },
      { new: true, runValidators: true }
    );
    return bookmark;
  }

  // return the deleted bookmark
  async delete(id) {
    const bookmark = await Bookmark.findByIdAndDelete(id).select("-__v");
    return bookmark;
  }

  async deleteAll() {
    await Bookmark.deleteMany({});
  }
}

export default BookmarkDAO;
