module.exports = (nga, admin) => {
  const edges = nga.entity('edges');

  const fields = [
    nga.field('source', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .remoteComplete(true)
      .validation({ required: true }),
    nga.field('target', 'reference')
      .targetEntity(nga.entity('nodes'))
      .targetField(nga.field('name'))
      .remoteComplete(true)
      .validation({ required: true }),
    nga.field('strengthOfRelationship', 'choice')
      .label('Strength of Relationship')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
    nga.field('clientId')
      .cssClasses('hidden')
      .label(''),
  ];

  edges
    .creationView()
    .fields(fields)
    .actions(['back'])
    .prepare(['entry', 'view', (entry, view) => {
      const { clientId } = entry.values;
      view._fields[0]._permanentFilters = { clientId };
      view._fields[1]._permanentFilters = { clientId };
    }])
    .onSubmitSuccess(['progression', 'route', '$state', 'entry',
      (progression, route, $state, entry) => {
        progression.done();
        $state.go('edit', { entity: 'clients', id: entry.values.clientId });
        return false;
      },
    ]);

  edges
    .editionView()
    .title('Edit: {{ entry.values.connection }}')
    .fields(fields)
    .actions(['back'])
    .onSubmitSuccess(['progression', 'route', '$state', 'entry',
      (progression, route, $state, entry) => {
        progression.done();
        $state.go('edit', { entity: 'clients', id: entry.values.clientId });
        return false;
      },
    ]);

  admin
    .addEntity(edges);

  return edges;
};
