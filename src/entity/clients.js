module.exports = (nga, admin) => {
  const contact = nga.entity('clients');

  const fields = [
    nga.field('firstName')
      .label('First Name')
      .validation({
        required: true,
      }),
    nga.field('lastName')
      .label('Last Name'),
  ];

  contact
    .listView()
    .fields([
      nga.field('fullName')
        .isDetailLink(true)
        .label('Full Name'),
      ...fields,
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact
    .editionView()
    .title('{{ entry.values.fullName }}')
    .fields([
      nga.field('graph')
        .label('')
        .template('<graph clientid="{{ entry.values.id }}"/>'),
      nga.field('buttons').label('')
        .template('<ma-create-button entity-name="nodes" size="sm" label="Create variable" default-values="{ clientId: entry.values.id }"></ma-create-button><ma-create-button entity-name="edges" size="sm" label="Create connection" default-values="{ clientId: entry.values.id }"></ma-create-button>'),
      nga.field('Variables', 'referenced_list')
        .targetEntity(nga.entity('nodes'))
        .targetReferenceField('clientId')
        .sortField('type')
        .targetFields([
          nga.field('name')
            .isDetailLink(true),
          nga.field('type'),
          nga.field('size')
            .label('Intensity'),
        ])
        .listActions(['edit', 'delete']),
      nga.field('Connections', 'referenced_list')
        .targetEntity(nga.entity('edges'))
        .targetReferenceField('clientId')
        .targetFields([
          nga.field('connection'),
          nga.field('size')
            .label('Strength'),
        ])
        .listActions(['edit', 'delete']),
      nga.field('description', 'text')
      .label('Notes'),
    ]);

  admin
    .addEntity(contact);

  return contact;
};
