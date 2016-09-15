module.exports = (nga, admin) => {
  const node = nga.entity('nodes');

  const fields = [
    nga.field('name'),
    nga.field('type', 'choice')
      .choices([
        { value: 'symptom', label: 'Symptom' },
        { value: 'causal', label: 'Causal Factor' },
        { value: 'treatment', label: 'Treatments' },
      ]),
    nga.field('size', 'choice')
      .label('Strength')
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

  node
    .listView()
    .fields([
      nga.field('id'),
      ...fields,
    ])
    .filters(fields);

  node.creationView().fields(fields);

  node.editionView().fields(fields);

  admin
    .addEntity(node);

  return node;
};
