import { open } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Edge {
  constructor(s, d) {
    this.src = s;
    this.dest = d;
  }
}

class Graph {
  constructor(v, e) {
    this.V = v;
    this.E = e;
    this.edge = [];
  }
}

class subset {
  constructor(p, r) {
    this.parent = p;
    this.rank = r;
  }
}

function kargerMinCut(graph) {
  let V = graph.V;
  let E = graph.E;
  let edge = graph.edge;

  let subsets = [];

  for (let v = 1; v <= V; v++) {
    subsets[v] = new subset(v, 0);
  }

  let vertices = V;

  while (vertices > 2) {
    let i = Math.floor(Math.random() * E) % E;

    let subset1 = find(subsets, edge[i].src);
    let subset2 = find(subsets, edge[i].dest);

    if (subset1 === subset2) {
      continue;
    } else {
      // console.log("Contracting edge " + edge[i].src + "-" + edge[i].dest);
      vertices--;
      Union(subsets, subset1, subset2);
    }
  }

  let cutedges = 0;
  for (let i = 0; i < E; i++) {
    let subset1 = find(subsets, edge[i].src);
    let subset2 = find(subsets, edge[i].dest);
    if (subset1 !== subset2) {
      cutedges++;
    }
  }
  return cutedges;
}


function find(subsets, i) {
  if (subsets[i].parent !== i) {
    subsets[i].parent = find(subsets, subsets[i].parent);
  }
  return subsets[i].parent;
}

function Union(subsets, x, y) {
  let xroot = find(subsets, x);
  let yroot = find(subsets, y);

  if (subsets[xroot].rank < subsets[yroot].rank) {
    subsets[xroot].parent = yroot;
  } else if (subsets[xroot].rank > subsets[yroot].rank) {
    subsets[yroot].parent = xroot;
  } else {
    subsets[yroot].parent = xroot;
    subsets[xroot].rank++;
  }
}
// Driver program to test above functions
async function main() {
  // Let us create following unweighted graph
  // 0------1
  // | \    |
  // |  \   |
  // |   \  |
  // |    \ |
  // 3------2

  // let V = 4, E = 5;
  // let graph = new Graph(V, E);
  //
  // graph.edge[0] = new Edge(0, 1);
  // graph.edge[1] = new Edge(0, 2);
  // graph.edge[2] = new Edge(0, 3);
  // graph.edge[3] = new Edge(1, 2);
  // graph.edge[4] = new Edge(2, 3);

  let V = 200, E = 2517;
  let graph = new Graph(V, E);

  // read data from file
  const fileHandle = await open(path.join(__dirname, './graph-data.txt'))
  const lines = await fileHandle.readLines()

  let i = 0;

  for await (const line of lines) {
    const data = line.split('\t').map(value => parseInt(value))
    const [node, ...neighbors] = data


    // remove parallel edges
    neighbors.forEach(neighbor => {
      let src
      let dest

      if (node <= neighbor) {
        src = node
        dest = neighbor
      } else {
        src = neighbor
        dest = node
      }

      const index = graph.edge.findIndex(edge => edge.src === src && edge.dest === dest)
      if (index !== -1) return

      graph.edge[i] = new Edge(node, neighbor)
      i++
    })
  }

  // Use a different seed value for every run.
  let r = Math.random();
  let min = 9999999999999

  while (1) {
    let res = kargerMinCut(graph);

    if (res < min) {
      min = res
      console.log(
        "Cut found by Karger's randomized algo is " + min
      );
    }
  }
}

main().then();