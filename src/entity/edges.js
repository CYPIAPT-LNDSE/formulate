module.exports = (nga, admin) => {
  const edges = nga.entity('edges');

  const fields = [
    nga.field('source', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .validation({
        required: true,
      }),
    nga.field('target', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .validation({
        required: true,
      }),
    nga.field('clientId')
      .validation({
        required: true,
      }),
  ];

  edges
    .listView()
    .fields([
      nga.field('id'),
      ...fields,
    ])
    .filters(fields);

  edges.creationView().fields(fields);

  edges.editionView().fields(fields);

  admin
    .addEntity(edges);

  return edges;
};
