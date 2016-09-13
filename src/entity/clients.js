module.exports = (nga, admin) => {
  const contact = nga.entity('clients');

  const fields = [
    nga.field('firstName')
      .validation({
        required: true,
      }),
    nga.field('lastName'),
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
