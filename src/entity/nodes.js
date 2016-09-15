module.exports = (nga, admin) => {
  const node = nga.entity('nodes');

  const fields = [
    nga.field('name'),
    nga.field('clientId')
      .validation({
        required: true,
      }),
    nga.field('type', 'choice')
      .choices([
        { value: 'symptom', label: 'Symptom' },
        { value: 'causal', label: 'Causal Factor' },
        { value: 'treatment', label: 'Treatments' },
      ]),
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
