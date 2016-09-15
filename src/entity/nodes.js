module.exports = (nga, admin) => {
  const node = nga.entity('nodes');

  const fields = [
    nga.field('name')
    .cssClasses('name_class'),
    nga.field('type', 'choice')
      .cssClasses('type_class')
      .choices([
        { value: 'symptom', label: 'Symptom' },
        { value: 'causal', label: 'Causal Factor' },
        { value: 'treatment', label: 'Treatments' },
      ]),
    nga.field('size', 'choice')
      .cssClasses('intensity_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'treatment')
        ) && 'hidden'
      )
      .label('Intensity')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('frequency', 'choice')
      .cssClasses('frequency_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'treatment')
        ) && 'hidden'
      )
      .label('Frequency')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('duration', 'choice')
      .cssClasses('duration_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'treatment')
        ) && 'hidden'
      )
      .label('Duration')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('modifiability', 'choice')
      .cssClasses('modifiability_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'treatment')
        ) && 'hidden'
      )
      .label('Modifiability')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('clientAgreement', 'choice')
      .cssClasses('clientAgreement_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'treatment')
        ) && 'hidden'
      )
      .label('Client Agreement')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('clinicianAgreement', 'choice')
      .cssClasses('clinicianAgreement_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'symptom' || entry.values.type === 'causal')
        ) && 'hidden'
      )
      .label('Clinician Agreement')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('MDTAgreement', 'choice')
      .cssClasses('MDTAgreement_class')
      .cssClasses(entry =>
         (entry && entry.values &&
          (entry.values.type === 'symptom' || entry.values.type === 'causal')
        ) && 'hidden'
      )
      .label('MDT Agreement')
      .choices([
        { value: '1', label: '1' },
        { value: '1.5', label: '2' },
        { value: '2', label: '3' },
        { value: '2.5', label: '4' },
        { value: '3', label: '5' },
      ]),
    nga.field('description', 'text')
      .cssClasses('description_class'),
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
