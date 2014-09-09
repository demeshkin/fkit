'use strict';

var core = require('../src/core');

describe('function', function() {
  describe('#id', function() {
    it('should return a function that returns its argument', function() {
      expect(core.id(1)).to.equal(1);
    });
  });

  describe('#apply', function() {
    it('should apply the given function', function() {
      function f(a) { return a + 1; }
      expect(core.apply(f)(1)).to.equal(f(1));
    });
  });

  describe('#applyRight', function() {
    it('should apply the given function', function() {
      function f(a) { return a + 1; }
      expect(core.applyRight(1)(f)).to.equal(f(1));
    });
  });

  describe('#compose', function() {
    it('should compose two functions', function() {
      function f(a) { return a / 2; }
      function g(a) { return a + 2; }
      var h = core.compose(f, g);
      expect(h(1)).to.equal(f(g(1)));
    });

    it('should compose any number of functions', function() {
      function f(a) { return a / 2; }
      function g(a) { return a + 2; }
      function h(a) { return a * 2; }
      var i = core.compose(f, g, h);
      expect(i(1)).to.equal(f(g(h(1))));
    });
  });

  describe('#flip', function() {
    it('should flip the arguments for the given function', function() {
      function f(a, b) {}
      var spy = sinon.spy(f);
      core.flip(spy)('hello', 'world');
      expect(spy.calledWithExactly('world', 'hello')).to.be.true;
    });
  });

  describe('#const', function() {
    it('should return a function that returns a constant value', function() {
      var f = core.const(1);
      expect(f()).to.equal(1);
    });
  });

  describe('#curry', function() {
    it('should not curry a nullary function', function() {
      function f() {}
      var g = core.curry(f);
      expect(f).to.equal(g);
    });

    it('should not curry a unary function', function() {
      function f(a) {}
      var g = core.curry(f);
      expect(f).to.equal(g);
    });

    it('should curry a binary function', function() {
      function f(a, b) {}
      var spy = sinon.spy(f);
      var g = core.curry(spy);

      expect(f).to.not.equal(g);
      g('hello')('world');
      expect(spy.calledWithExactly('hello', 'world')).to.be.true;
    });
  });

  describe('#unary', function() {
    it('should return a unary function', function() {
      var spy = sinon.spy();
      core.unary(spy)(1, 2, 3);
      expect(spy.calledWithExactly(1)).to.be.true;
    });
  });

  describe('#binary', function() {
    it('should return a binary function', function() {
      var spy = sinon.spy();
      core.binary(spy)(1, 2, 3);
      expect(spy.calledWithExactly(1, 2)).to.be.true;
    });
  });

  describe('#variadic', function() {
    it('should return a variadic function', function() {
      function f(a, b) {}
      var spy = sinon.spy(f);
      core.variadic(spy)(1, 2, 3);
      expect(spy.calledWithExactly(1, [2, 3])).to.be.true;
    });
  });

  describe('#tap', function() {
    it('should return apply the given function to a value and return the value', function() {
      function f(a) {}
      var spy = sinon.spy(f);
      expect(core.tap(spy)(1)).to.be.equal(1);
      expect(spy.calledWithExactly(1)).to.be.true;
    });
  });
});

