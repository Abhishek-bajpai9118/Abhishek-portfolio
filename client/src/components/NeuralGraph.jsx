// A small neural-network graph: three layers of nodes with connecting
// edges that pulse, standing in for the "software dev -> AI" transition.

const layerX = [80, 320, 560];
const layers = [
  [60, 160, 260, 360], // input layer y-positions
  [40, 130, 220, 310, 400], // hidden layer y-positions
  [110, 210, 310], // output layer y-positions
];

function buildEdges() {
  const edges = [];
  for (let l = 0; l < layers.length - 1; l++) {
    layers[l].forEach((y1, i) => {
      layers[l + 1].forEach((y2, j) => {
        edges.push({
          id: `${l}-${i}-${j}`,
          x1: layerX[l],
          y1,
          x2: layerX[l + 1],
          y2,
          delay: ((i + j + l * 2) % 6) * 0.4,
        });
      });
    });
  }
  return edges;
}

const edges = buildEdges();

export default function NeuralGraph() {
  return (
    <svg
      viewBox="0 0 640 440"
      className="neural-graph"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b7fff" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {edges.map((e) => (
        <line
          key={e.id}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="url(#edgeGrad)"
          strokeWidth="1"
          className="neural-graph__edge"
          style={{ animationDelay: `${e.delay}s` }}
        />
      ))}

      {layers.map((layer, l) =>
        layer.map((y, i) => (
          <circle
            key={`${l}-${i}`}
            cx={layerX[l]}
            cy={y}
            r={l === 1 ? 5 : 6}
            className="neural-graph__node"
            style={{ animationDelay: `${((l + i) % 5) * 0.3}s` }}
          />
        ))
      )}
    </svg>
  );
}
