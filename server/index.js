const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
console.log("This is the root:", root);
const MERKLE_ROOT =
  "16a1a470a1b432b0b610db7b2e070cd84b721cb656f6c28184ad41fc67d66a2f";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name, root } = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
