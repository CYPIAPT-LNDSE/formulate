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
      ])
      .defaultValue(2),
    nga.field('clientId')
      .cssClasses('hidden')
      .label(''),
  ];

  edges
    .creationView()
    .fields(fields)
    .actions(['back']);

  edges
    .editionView()
    .fields(fields)
    .actions(['back']);

  admin
    .addEntity(edges);

  return edges;
};
