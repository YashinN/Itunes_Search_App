import renderer from "react-test-renderer";
import App from "../App";

// test if app renders correctly
test("Display renders correclty", () => {
  const tree = renderer.create(<App></App>).toJSON;
  expect(tree).toMatchSnapshot();
});
