'use strict';

var fold = require('../../src/list/fold');

describe('list.fold', function() {
  describe('#concat', function() {
    it('should handle a list of arrays', function() {
      expect(fold.concat([])).to.be.eql([]);
      expect(fold.concat([1], [2, 3], [4, 5, 6])).to.be.eql([1, 2, 3, 4, 5, 6]);
      expect(fold.concat([[1]], [[2, 3]], [[4, 5, 6]])).to.be.eql([[1], [2, 3], [4, 5, 6]]);
    });

    it('should handle a list of strings', function() {
      expect(fold.concat('')).to.be.equal('');
      expect(fold.concat('f', 'oo', 'bar')).to.be.equal('foobar');
    });

    it('should handle an array of arrays', function() {
      expect(fold.concat([[1], [2, 3], [4, 5, 6]])).to.be.eql([1, 2, 3, 4, 5, 6]);
      expect(fold.concat([[[1]], [[2, 3]], [[4, 5, 6]]])).to.be.eql([[1], [2, 3], [4, 5, 6]]);
    });

    it('should handle an array of strings', function() {
      expect(fold.concat(['f', 'oo', 'bar'])).to.be.eql('foobar');
      expect(fold.concat([['f'], ['oo'], ['bar']])).to.be.eql(['f', 'oo', 'bar']);
    });

    it('should handle heterogenous lists', function() {
      expect(fold.concat([1, 2, 3], 'foo')).to.be.eql([1, 2, 3, 'foo']);
      expect(fold.concat('foo', [1, 2, 3])).to.be.eql(['foo', 1, 2, 3]);
    });
  });

  describe('#concatMap', function() {
    it('should handle arrays', function() {
      function f(a) { return [a, '-']; }
      expect(fold.concatMap(f)([])).to.be.eql([]);
      expect(fold.concatMap(f)([1, 2, 3])).to.be.eql([1, '-', 2, '-', 3, '-']);
    });

    it('should handle strings', function() {
      function f(a) { return a + '-'; }
      expect(fold.concatMap(f)('')).to.be.eql('');
      expect(fold.concatMap(f)('foo')).to.be.eql('f-o-o-');
    });
  });

  describe('#fold', function() {
    it('should handle arrays', function() {
      function f(b, a) { return [a].concat(b); }
      expect(fold.fold(f)([])([1, 2, 3])).to.be.eql([3, 2, 1]);
    });

    it('should handle strings', function() {
      function f(b, a) { return a + b; }
      expect(fold.fold(f)('')('foo')).to.be.equal('oof');
    });
  });

  describe('#foldRight', function() {
    it('should handle arrays', function() {
      function f(a, b) { return b.concat(a); }
      expect(fold.foldRight(f)([])([1, 2, 3])).to.be.eql([3, 2, 1]);
    });

    it('should handle strings', function() {
      function f(a, b) { return b + a; }
      expect(fold.foldRight(f)('')('foo')).to.be.equal('oof');
    });
  });

  describe('#scan', function() {
    it('should handle arrays', function() {
      function f(b, a) { return [a].concat(b); }
      expect(fold.scan(f)([])([1, 2, 3])).to.be.eql([[], [1], [2, 1], [3, 2, 1]]);
    });

    it('should handle strings', function() {
      function f(b, a) { return a + b; }
      expect(fold.scan(f)('')('foo')).to.be.eql(['', 'f', 'of', 'oof']);
    });
  });

  describe('#scanRight', function() {
    it('should handle arrays', function() {
      function f(a, b) { return b.concat(a); }
      expect(fold.scanRight(f)([])([1, 2, 3])).to.be.eql([[3, 2, 1], [3, 2], [3], []]);
    });

    it('should handle strings', function() {
      function f(a, b) { return b + a; }
      expect(fold.scanRight(f)('')('foo')).to.be.eql(['oof', 'oo', 'o', '']);
    });
  });

  describe('#maximum', function() {
    it('should handle arrays of numbers', function() {
      expect(fold.maximum([1, 2, 3])).to.be.equal(3);
    });

    it('should handle strings', function() {
      expect(fold.maximum('foo')).to.be.equal('o');
    });
  });

  describe('#minimum', function() {
    it('should handle arrays of numbers', function() {
      expect(fold.minimum([1, 2, 3])).to.be.equal(1);
    });

    it('should handle strings', function() {
      expect(fold.minimum('foo')).to.be.equal('f');
    });
  });

  describe('#sum', function() {
    it('should handle arrays of numbers', function() {
      expect(fold.sum([1, 2, 3])).to.be.equal(6);
    });
  });

  describe('#product', function() {
    it('should handle arrays of numbers', function() {
      expect(fold.product([2, 3, 4])).to.be.equal(24);
    });
  });
});
