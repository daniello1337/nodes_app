import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "./App.css";
import { getMostSharedNode, getUniqueNodes } from "./Utils";

const INITIAL_NODE = "089ef556-dfff-4ff2-9733-654645be56fe";
const API_URL = "https://nodes-on-nodes-challenge.herokuapp.com/nodes";

const App = () => {
  const [allNodes, setAllNodes] = useState([INITIAL_NODE]);
  const [searchingNodes, setSearchingNodes] = useState([INITIAL_NODE]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newNodes = [];
    let foundNodes = [];

    fetch(`${API_URL}/${searchingNodes.map((nodeId) => nodeId)}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          if (item.child_node_ids.length) {
            item.child_node_ids.forEach((nodeChild) => {
              if (
                !allNodes.includes(nodeChild) &&
                !foundNodes.includes(nodeChild)
              ) {
                newNodes.push(nodeChild);
              }
              foundNodes.push(nodeChild);
            });
          }
        });

        if (!newNodes.length) {
          setLoading(false);
        } else {
          setAllNodes([...allNodes, ...foundNodes]);
          setSearchingNodes(newNodes);
        }
      })
      .catch((error) => console.log(error));
  }, [searchingNodes]);

  return (
    <div className="App">
      {loading ? (
        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
      ) : (
        <>
          <p>Unique nodes count: {getUniqueNodes(allNodes)}</p>
          <p>Most shared node id: {getMostSharedNode(allNodes)}</p>
        </>
      )}
    </div>
  );
};

export default App;
