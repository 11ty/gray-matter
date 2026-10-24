'use strict';

var assert = require('assert');
var matter = require('..');

describe('cache', function() {
  beforeEach(function() {
    matter.clearCache();
  });

  it('should return the raw front-matter block on a cache hit', function() {
    var fixture = '---\ntitle: Cached\n---\nbody';

    assert.equal(matter(fixture).matter, '\ntitle: Cached');
    assert.equal(matter(fixture).matter, '\ntitle: Cached');
  });

  it('should return the language on a cache hit', function() {
    var fixture = '---json\n{"title": "Cached"}\n---\nbody';

    assert.equal(matter(fixture).language, 'json');
    assert.equal(matter(fixture).language, 'json');
  });

  it('should return a working stringify method on a cache hit', function() {
    var fixture = '---\ntitle: Cached\n---\nbody';
    var expected = matter.stringify(fixture);

    matter.clearCache();
    matter(fixture);

    assert.equal(typeof matter(fixture).stringify, 'function');
    assert.equal(matter(fixture).stringify(), expected);
  });
});
