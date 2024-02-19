import { open } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// AdjacencyList, using Map to store key-value
// key: the node itself
// value: a Set contains the node's neighbors

class Graph {
  adjacencyList;

  constructor() {
    this.adjacencyList = new Map()
  }

  hasNode(node) {
    return this.adjacencyList.has(node)
  }

  addNode(node) {
    if (this.hasNode(node)) return

    this.adjacencyList.set(node, new Set())
  }

  addEdge(node1, node2) {
    if (!this.hasNode(node1)) {
      this.addNode(node1)
    }

    if (!this.hasNode(node2)) {
      this.addNode(node2)
    }

    this.adjacencyList.get(node1).add(node2)
    this.adjacencyList.get(node2).add(node1)
  }

  getNeighbors(node) {
    return this.adjacencyList.get(node)
  }

  hasEdge(node1, node2) {
    return this.adjacencyList.get(node1).has(node2)
  }
}

async function main() {
  const graph = new Graph()

  // read data from file
  const fileHandle = await open(path.join(__dirname, './graph-data.txt'))
  const lines = await fileHandle.readLines()

  for await (const line of lines) {
    const data = line.split('\t').map(l => parseInt(l))
    const [node, ...neighbors] = data
    graph.addNode(node)
    neighbors.forEach(neighbor => graph.addEdge(node, neighbor))

    console.log(graph.adjacencyList)
  }
}

main().then()