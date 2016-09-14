const graphTemplate = require('../templates/graphTypeTemplate');

module.exports = (nga, admin) => {
  const contact = nga.entity('clients');

  const fields = [
    nga.field('firstName')
      .validation({
        required: true,
      }),
    nga.field('lastName'),
    nga.field('description', 'text'),
    nga.field('graph')
    .template(graphTemplate),
  ];

  contact
    .listView()
    .fields([
      nga.field('id'),
      ...fields,
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact.editionView().fields(fields);

  admin
    .addEntity(contact);

  return contact;
};
