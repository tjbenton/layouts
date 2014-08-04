/*!
 * layouts <https://github.com/jonschlinkert/layouts>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

var should = require('should');
var Layouts = require('..');
var layouts = new Layouts();


describe('.set():', function () {
  describe('when layouts are defined as objects:', function () {
    var layouts = new Layouts();

    layouts.set({a: { layout: 'b', content: 'A above\n{%body%}\nA below' }});
    layouts.set({b: { layout: 'c', content: 'B above\n{%body%}\nB below' }});
    layouts.set({c: { layout: 'd', content: 'C above\n{%body%}\nC below' }});
    layouts.set({d: { layout: 'e', content: 'D above\n{%body%}\nD below' }});
    layouts.set({last: { layout: undefined, content: 'last!\n{%body%}\nlast!' }});
    layouts.set({e: { layout: 'f', content: 'E above\n{%body%}\nE below' }});
    layouts.set({f: { layout: 'last', content: 'F above\n{%body%}\nF below' }});
    layouts.set({first: { layout: 'a', content: 'I\'m a <%= title %>' }});

    it('should extend the `cache`.', function () {
      var actual = layouts.stack('first');
      var expected = [
        'last!',
        'F above',
        'E above',
        'D above',
        'C above',
        'B above',
        'A above',
        'I\'m a <%= title %>', // should not be compiled
        'A below',
        'B below',
        'C below',
        'D below',
        'E below',
        'F below',
        'last!'
      ].join('\n');
      actual.content.should.eql(expected);
    });
  });

  describe('when layouts are defined with string values:', function () {
    var layouts = new Layouts();

    layouts.set('first', 'a', 'I\'m a <%= title %>');
    layouts.set('a', 'b', 'A above\n{%body%}\nA below');
    layouts.set('b', 'c', 'B above\n{%body%}\nB below');
    layouts.set('c', 'd', 'C above\n{%body%}\nC below');
    layouts.set('d', 'e', 'D above\n{%body%}\nD below');
    layouts.set('e', 'f', 'E above\n{%body%}\nE below');
    layouts.set('f', 'last', 'F above\n{%body%}\nF below');
    layouts.set('last', undefined, 'last!\n{%body%}\nlast!');

    it('should extend the `cache`.', function () {
      var actual = layouts.stack('first');
      var expected = [
        'last!',
        'F above',
        'E above',
        'D above',
        'C above',
        'B above',
        'A above',
        'I\'m a <%= title %>', // should not be compiled
        'A below',
        'B below',
        'C below',
        'D below',
        'E below',
        'F below',
        'last!'
      ].join('\n');
      actual.content.should.eql(expected);
    });
  });

  describe('when an object is passed as the second parameter:', function () {
    describe('when a `layout` propery is defined:', function () {
      var layouts = new Layouts();

      layouts.set('first', {layout: 'a'}, 'I\'m a <%= title %>');
      layouts.set('a', {layout: 'b'}, 'A above\n{%body%}\nA below');
      layouts.set('b', {layout: 'c'}, 'B above\n{%body%}\nB below');
      layouts.set('c', {layout: 'd'}, 'C above\n{%body%}\nC below');
      layouts.set('d', {layout: 'e'}, 'D above\n{%body%}\nD below');
      layouts.set('e', {layout: 'f'}, 'E above\n{%body%}\nE below');
      layouts.set('f', {layout: 'last'}, 'F above\n{%body%}\nF below');
      layouts.set('last', {layout: undefined}, 'last!\n{%body%}\nlast!');

      it('should extend the `cache` with the layout', function () {
        var actual = layouts.stack('first');
        var expected = [
          'last!',
          'F above',
          'E above',
          'D above',
          'C above',
          'B above',
          'A above',
          'I\'m a <%= title %>', // should not be compiled
          'A below',
          'B below',
          'C below',
          'D below',
          'E below',
          'F below',
          'last!'
        ].join('\n');
        actual.content.should.eql(expected);
      });
    });

    describe('when a `content` propery is defined:', function () {
      var layouts = new Layouts();

      layouts.set('first', {layout: 'a', content: 'I\'m a <%= title %>'});
      layouts.set('a', {layout: 'b', content: 'A above\n{%body%}\nA below'});
      layouts.set('b', {layout: 'c', content: 'B above\n{%body%}\nB below'});
      layouts.set('c', {layout: 'd', content: 'C above\n{%body%}\nC below'});
      layouts.set('d', {layout: 'e', content: 'D above\n{%body%}\nD below'});
      layouts.set('e', {layout: 'f', content: 'E above\n{%body%}\nE below'});
      layouts.set('f', {layout: 'last', content: 'F above\n{%body%}\nF below'});
      layouts.set('last', {layout: undefined, content: 'last!\n{%body%}\nlast!'});

      it('should extend the `cache` with the layout', function () {
        var actual = layouts.stack('first');
        var expected = [
          'last!',
          'F above',
          'E above',
          'D above',
          'C above',
          'B above',
          'A above',
          'I\'m a <%= title %>', // should not be compiled
          'A below',
          'B below',
          'C below',
          'D below',
          'E below',
          'F below',
          'last!'
        ].join('\n');
        actual.content.should.eql(expected);
      });
    });

    describe('when multiple layouts are defined', function () {
      var layouts = new Layouts();

      layouts.set({
        a: { layout: 'b', content: 'A above\n{%body%}\nA below' },
        b: { layout: 'c', content: 'B above\n{%body%}\nB below' },
        c: { layout: 'd', content: 'C above\n{%body%}\nC below' },
        d: { layout: 'e', content: 'D above\n{%body%}\nD below' },
        last: { layout: undefined, content: 'last!\n{%body%}\nlast!' },
        e: { layout: 'f', content: 'E above\n{%body%}\nE below' },
        f: { layout: 'last', content: 'F above\n{%body%}\nF below' },
        first: { layout: 'a', content: 'I\'m a <%= title %>' }
      });

      it('should extend the `cache` with the layout', function () {
        var actual = layouts.stack('first');
        var expected = [
          'last!',
          'F above',
          'E above',
          'D above',
          'C above',
          'B above',
          'A above',
          'I\'m a <%= title %>', // should not be compiled
          'A below',
          'B below',
          'C below',
          'D below',
          'E below',
          'F below',
          'last!'
        ].join('\n');
        actual.content.should.eql(expected);
      });
    });
  });
});