'use strict';

var checker = require('../checker');

describe('Test for malformed tree check when input is parent child', function(){
  it("should be success for (A B)(A C)(B G)(C H)(E F)(B D)(C E)", function(){
    var input = "(A B)(A C)(B G)(C H)(E F)(B D)(C E)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "SUCCESS");
  });

  it("should be error E1 for (A B)(A C)(A D)", function(){
    var input = "(A B)(A C)(A D)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "E1");
  });

  it("should be error E2,E5 for (A B)(A B)", function(){
    var input = "(A B)(A B)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "E2,E5");
  });

  it("should be error E3 for (A B)(B C)(C A)", function(){
    var input = "(A B)(B C)(C A)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "E3");
  });

  it("should be error E4 for (A B)(C D)", function(){
    var input = "(A B)(C D)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "E4");
  });

  it("should be error E3,E5 for (A B)(B C)(A C)", function(){
    var input = "(A B)(B C)(A C)";
    var result = checker(input);
    console.assert(result.split(":")[0] === "E3,E5");
  });

});