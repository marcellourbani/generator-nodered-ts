import { uppercase } from "./<%= nodename %>"
import { NodeAPI, Node, NodeDef, NodeMessage } from "node-red"


export interface MyMessage extends NodeMessage {
  payload: string
}

export const isMyMessage = (msg: NodeMessage): msg is MyMessage =>
  typeof msg?.payload === "string"

interface Credentials {
  password: string
}

module.exports = (RED: NodeAPI) => {
  function createNodeInstance(this: Node<Credentials>, config: NodeDef) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const node = this
    RED.nodes.createNode(node, config)
    node.on("input", async function (msg) {
      try {
        if (isMyMessage(msg)) {
          node.status({ fill: "blue", text: "Processing" })
          const payload = uppercase(msg.payload)
          node.send({ ...msg, payload })
          node.status("")
        } else throw new Error("Unexpected message format")
      } catch (error) {
        node.error(error.toString(), msg)
      }
    })
  }
  // register the node handler
  RED.nodes.registerType("<%= nodename %>", createNodeInstance, {
    credentials: {// should match <%= nodename %>_node.html
      password: { type: "password" }
    }
  })
}
