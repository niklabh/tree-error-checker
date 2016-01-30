'use strict';

var fs = require('fs');
var Node = require('./Node');

function checker(inputData) {
  var nodes = {};
  var roots = {};
  var errors = {};

  // Adding ) ( to data to parse it correctly
  var data = ")" + inputData + "(";
  data.toString().split(')(').forEach(function(pc){
    if (!pc.length) return;

    var parent = pc.split(' ')[0];
    var child = pc.split(' ')[1];
    var parentNode, childNode;

    if (!nodes[parent]) {
      parentNode = new Node(parent); 
      nodes[parent] = parentNode;
    } else {
      parentNode = nodes[parent];
    }

    if (!nodes[child]) {
      childNode = new Node(child);
      nodes[child] = childNode;
    } else {
      childNode = nodes[child];
    }

    if (!parentNode.parents.length) roots[parent] = parentNode;
    delete roots[child];

    // Multiple Parents
    if (childNode.parents.length) {
      errors.E5 = true;
    } else {
      childNode.parents.push(parentNode);
    }

    if (parentNode.childs.indexOf(childNode) !== -1) {
      errors.E2 = true;
    } else {
      parentNode.childs.push(childNode);
    }
    
    if (parentNode.childs.length > 2) {
      errors.E1 = true;
    }
  });

  if (Object.keys(roots).length > 1) {
    errors.E4 = true;
  } else if (!Object.keys(roots).length) {
    errors.E3 = true;
  }

  // Multiple parents
  Object.keys(roots).forEach(function(root){
    var visited = {};
    var queue = [];
    root = nodes[root];

    queue.push(root);

    while(queue.length) {
      root = queue.shift();
      if (!visited[root.data]) {
        visited[root.data] = true;
        root.childs.forEach(function(child) {
          queue.push(child);
        });
      } else {
        errors.E3 = true;
        return;
      }
    }
  });


  if (Object.keys(errors).length) {
    return Object.keys(errors).sort() + ":" + inputData;
  } else {
    return "SUCCESS:" + inputData;
  }
}

module.exports = checker;

if (require.main === module) {
  var filename = process.argv[2];
  var inputData = fs.readFileSync(filename);
  var result = checker(inputData);
  console.log(result);
}


