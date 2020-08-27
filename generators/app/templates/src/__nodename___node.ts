import { uppercase } from "./<%= nodename %>"
import { NodeAPI, Node, NodeDef, NodeMessage } from "node-red"


export interface MyMessage extends NodeMessage {
  payload: string
}
export const isMyMessage = (msg: NodeMessage): msg is MyMessage => msg?.payload instanceof String

/**
 * modue.exports is the function exported by this module
 *
 * @param {*} RED A node-red API instance, where we will register this node
 */
module.exports = (RED: NodeAPI) => {
  /**
   * A node red node handler
   *
   * @param {*} config the node's configuration, usually an object
   */
  function createNodeInstance(config: NodeDef) {
    const node: Node = this
    RED.nodes.createNode(node, config)
    node.on("input", async function (msg) {
      try {
        if (isMyMessage(msg)) {
          node.status({ fill: "blue", text: "Processing" })
          const payload = uppercase(msg.payload)
          node.send(
            { ...msg, payload }
          )
          node.status("")
        } else throw new Error("Unexpected message format");

      } catch (error) {
        node.status({ fill: "red", text: error.toString() })
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
