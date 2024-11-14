import { render, screen } from "@testing-library/react";
import AvatarCircle from "./AvatarCircle";

test("should have correct custom styles", () => {
  render(<AvatarCircle name={"John Doe"} size={"50px"} textSize={"20px"} />);
  const avatar = screen.getByText("JD");
  expect(avatar).toHaveStyle({
    height: "50px",
    width: "50px",
    fontSize: "50px",
  });
});
