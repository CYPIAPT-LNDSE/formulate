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

  contact.editionView().fields([
    ...fields,
    nga.field('description', 'text'),
    nga.field('').label('')
      .template('<ma-create-button entity-name="nodes" size="sm" label="Create node" default-values="{ clientId: entry.values.id }"></ma-create-button></span>'),
    nga.field('').label('')
      .template('<ma-create-button entity-name="edges" size="sm" label="Create connection" default-values="{ clientId: entry.values.id }"></ma-create-button></span>'),
    nga.field('')
      .label('Graph')
      .template('<graph clientid="{{ entry.values.id }}"/>'),
  ]);

  admin
    .addEntity(contact);

  return contact;
};
