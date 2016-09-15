module.exports = (nga, admin) => {
  const edges = nga.entity('edges');

  const fields = [
    nga.field('source', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .validation({ required: true }),
    nga.field('target', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .validation({ required: true }),
    nga.field('strengthOfRelationship', 'choice')
      .label('Strength of Relationship')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('clientId')
      .cssClasses('hidden')
      .label(''),
  ];

  edges
    .listView()
    .fields([
      nga.field('connection').isDetailLink(true),
      ...fields,
    ])
    .filters(fields);

  edges.creationView().fields(fields);

  edges.editionView().fields(fields);

  admin
    .addEntity(edges);

  return edges;
};
