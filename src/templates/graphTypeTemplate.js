module.exports = `
      <style>
        #graph-container {
          height: 600px;
        }
      </style>

      <div id="graph-container"></div>
      <div id="sidebar">
        <input type="button" name="" id="button" value="add shit" />
      </div>
      <script>
      /**
       * This example shows how to use the dragNodes plugin.
       */
      var i,
          s,
          N = 10,
          E = 500,
          g = {
            nodes: [],
            edges: []
          };

      // Generate a random graph:
      function randomNode(i){
        return {
          id: 'n' + i,
          label: 'Node ' + i,
          x: Math.random(),
          y: Math.random(),
          size: Math.random(),
          color: '#666'
        };
      }

      for (i = 0; i < N; i++)
        g.nodes.push(randomNode(i));

      function randomEdge(i) {
        return {
          id: 'e' + i,
          source: 'n' + (Math.random() * N | 0),
          target: 'n' + (Math.random() * N | 0),
          size: Math.random(),
          color: '#ccc'
        };
      }
      for (i = 0; i < E; i++)
        g.edges.push(randomEdge(i));
      // sigma.renderers.def = sigma.renderers.canvas
      // Instantiate sigma:
      s = new sigma({
        graph: g,
        container: 'graph-container'
      });

      // Initialize the dragNodes plugin:
      var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);

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
        console.log(event);
      });


      var button = document.getElementById('button');

      button.addEventListener('click', function(event) {
        var len = s.graph.nodes().length;
        s.graph.addNode(randomNode(len));

        s.refresh();
      });
      </script>
`;
