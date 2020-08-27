import helper from "node-red-node-test-helper"
import { Node, NodeMessage } from "node-red"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const <%= nodename %> = require("./<%= nodename %>_node")

beforeEach(done => helper.startServer(done))
afterEach(done => {
  helper.unload()
  helper.stopServer(done)
})

test("node registration", done => {
  const flow = [{ id: "n1", type: "<%= nodename %>", name: "test name" }]
  helper.load(<%= nodename %>, flow, function () {
    const n1 = helper.getNode("n1")
    expect(n1.name).toBe("test name")
    done()
  })
})

test("process node", done => {
  const flow = [
    {
      id: "n1",
      type: "<%= nodename %>",
      name: "test name",
      wires: [["n2"]]
    },
    { id: "n2", type: "helper" }
  ]
  helper.load(<%= nodename %>, flow, function () {
    const n1: Node = helper.getNode("n1")
    const n2: Node = helper.getNode("n2")
    n2.on("input", function (msg: NodeMessage) {
      expect(msg.payload).toBe("MIXED CASE")
      done()
    })
    n1.receive({ payload: "Mixed Case" })
  })
})
