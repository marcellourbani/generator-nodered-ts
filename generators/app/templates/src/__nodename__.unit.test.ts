import { uppercase } from "./<%= nodename %>"

test("core logic", () => {
  expect(uppercase("Test")).toBe("TEST")
})
