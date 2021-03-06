import Ember from 'ember';
/*global Sifter*/

var filterByQuery = function(array, propertyKeys, query, options) {

  if (!query) {
    return array;
  }

  options = Ember.typeOf(options) === 'undefined' ? {} : options;
  propertyKeys = Ember.makeArray(propertyKeys);
  var input, sifter, result;

  input = array.map(function(item) {
    var hash = {};
    propertyKeys.forEach(function(key) {
      hash[key] = Ember.get(item, key);
    });
    return hash;
  });

  options.fields = options.fields || propertyKeys;
  options.limit = options.limit || array.length;
  options.sort = propertyKeys.map(function(key) {
    return {field: key, direction: 'asc'};
  });

  sifter = new Sifter(input);
  result = sifter.search(query, options);

  return result.items.map( function(item) {
    return array[item.id];
  });

};

export default filterByQuery;
