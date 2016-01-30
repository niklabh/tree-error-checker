Malformed Input Checker for parent child relation
------------------------------

Given a binary tree as a sequence of (parent, child) tuples:
(A B)(A C)(B G)(C H)(E F)(B D)(C E)
Write a program to find following errors in the tree:

- E1: More than 2 children
- E2: Duplicate Tuples
- E3: Cycle present
- E4: Multiple roots
- E5: Multiple parents

Input is a expression containing parent child relations. output is Error codes or success.

Sample test cases
=================

- Input: (A B)(A C)(B G)(C H)(E F)(B D)(C E) Output: Success
- Input: (A B)(A C)(A D) Output: E1
- Input: (A B)(A B) Output: E2
- Input: (A B)(B C)(C A) Output: E3
- Input: (A B)(C D) Output: E4
- Input: (A B)(B C)(A C) Output: E5

Solution
--------

Code is written in node.js javascript. Tests are using mocha.
Major trick in this question is that the data structure need to hold such data is not a binary tree but a graph. Or a graph with two sets of edges children and parents.

I used this DS in javascript to solve:
```js
function Node(data) {
  this.data = data;
  this.childs = [];
  this.parents = [];
}
```


To run:
=====

- install node http://nodejs.org
- sudo npm install -g mocha  // for test
- npm test


To run custom test case:

- node checker.js filename
- file should contain test case in one line
- check : node checker.js test/testcase
