(function () {
  'use strict';

  angular
    .module('workflowEditor')
    .service('modelService', modelService);

  function modelService() {

    // nodes currently on canvas, {id: node}
    // format of each node: {id: id_number, interface: interface, x: x, y: y}
    // where id is a number and the node_object properties are interface, x position, and y position
    var current_nodes = {};

    var input_dataset = {"inputs": {}, "outputs": {"dataset": null}, "name": "input dataset"};
    current_nodes[0] = {id: 0, x: 0, y: 0, interface: input_dataset};

    var next_node_id = 1;

    // list of edges currently on canvas
    // format of each edge: {id: id_number, out_node: out_node, outlet: outlet, in_node: in_node, inlet: inlet}
    var current_edges = {};

    var next_edge_id = 0;

    var model = {
      nodes: current_nodes,
      edges: current_edges
    };


    return {
      getModel: function () {
        return angular.copy(model);
      },
      addNewNode: function (nipype_interface) {
        model.nodes[next_node_id] = {
          id: next_node_id,
          x: (5*next_node_id),
          y: (5*next_node_id),
          interface: nipype_interface
        };
        next_node_id++;
      },
      changeNodePosition: function (nodeID, newX, newY) {
        model.nodes[nodeID].x = newX;
        model.nodes[nodeID].y = newY;
      },
      addNewEdge: function (out_node, outlet, in_node, inlet, startPoint, endPoint) {
        model.edges[next_edge_id] = {
          id: next_edge_id,
          out_node: out_node,
          outlet: outlet,
          in_node: in_node,
          inlet: inlet,
          startPoint: startPoint,
          endPoint: endPoint
        };
        next_edge_id++;
      }
    };
  }
})();
