module.exports = app => {
  app.directive('graph', ['$http', $http => {
    const directive = {
      restrict: 'E',
      scope: {
        //@ reads the attribute value,
        //= provides two-way binding,
        //& works with functions
        clientid: '@',
      },
      link(scope, element) {
        const { clientid } = scope;
        element.css({
          height: '600px',
          display: 'block',
        });

        const g = {
          nodes: [],
          edges: [],
        };

        const s = new sigma({
          graph: g,
          container: 'graph-{{clientid}}',
          settings: {
            defaultNodeColor: '#ff0000',
            labelThreshold: 4,
          },
        });

        Promise.all([
          $http.get(`/nodes?clientId=${clientid}`),
          $http.get(`/edges?clientId=${clientid}`),
        ]).then(resp => {
          const resp0 = resp[0].data;
          const edges = resp[1].data;

          const nodes = resp0.map(node => {
            if (!node.x && !node.y) {
              node.x = Math.random();
              node.y = Math.random();
            }
            return node;
          });

          nodes.forEach(node => s.graph.addNode(node));
          edges.forEach(edge => s.graph.addEdge(edge));
          s.refresh();

       });
      const dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

      dragListener.bind('startdrag', function(event) {
        console.log(event);
      });

      dragListener.bind('drag', function(event) {
        console.log(event);
      });

      dragListener.bind('drop', function(event) {
        console.log(event);
      });

      dragListener.bind('dragend', function(event) {
        const { node } = event.data;
        console.log(event);
        $http.put(`/nodes/${ node.id }`, node);
      });

      element.on('$destroy', () => s.graph.clear());

      },
      template: '<div id="graph-{{clientid}}" style="height: 100%;"></div>',
    };

    return directive;
  }]);
};
