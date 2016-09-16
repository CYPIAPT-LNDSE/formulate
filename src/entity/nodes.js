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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
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
        { value: '1.5', label: '1.5' },
        { value: '2', label: '2' },
        { value: '2.5', label: '2.5' },
        { value: '3', label: '3' },
      ])
      .defaultValue(2),
    nga.field('description', 'text')
      .cssClasses('description_class'),
    nga.field('clientId')
      .cssClasses('hidden')
      .label(''),
  ];


  node
    .creationView()
    .fields(fields)
    .actions(['back'])
    .onSubmitSuccess(['progression', 'route', '$state', 'entry',
      (progression, route, $state, entry) => {
        progression.done();
        $state.go('edit', { entity: 'clients', id: entry.values.clientId });
        return false;
      },
    ]);

  node
    .editionView()
    .title('Edit: {{ entry.values.name }}')
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
    .addEntity(node);

  return node;
};
