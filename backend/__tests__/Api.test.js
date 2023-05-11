// gets api request function to test.
const { search } = require("../controllers/favouriteController");

// tests api call is working.
describe("Api Call", () => {
  test("Tests if api call works", async () => {
    // runs search api with standard data.
    const response = await search("avatar", "movie");
    // checks if length of recevied data is equal to 3.
    expect(response).toHaveLength(3);
  });
});
