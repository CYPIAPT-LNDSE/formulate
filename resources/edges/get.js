dpd.nodes.get((result, err) => {
  if(err) return console.log(err);
  var source = 'unknown';
  var target = 'unknown';
  result.forEach((element) => {
    if (element.id === this.source) {
      source = element.name;
    }
    if (element.id === this.target) {
      target = element.name;
    }
  });
  this.connection = source + ' to ' + target;
});
