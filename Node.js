'use strict';

function Node(data) {
  this.data = data;
  this.childs = [];
  this.parents = [];
}

module.exports = Node;