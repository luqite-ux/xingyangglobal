export const workflowSteps = [
  {
    key: 'inquiry',
    title: 'Inquiry',
    text: 'You send material, output, voltage and quantity through the quote form or by email.',
  },
  {
    key: 'confirmation',
    title: 'Technical Confirmation',
    text: 'We review the details against the catalogue and confirm the model and build with you.',
  },
  {
    key: 'scheduling',
    title: 'Production Scheduling',
    text: 'Once the configuration is agreed, the order is placed into production scheduling.',
  },
  {
    key: 'inspection',
    title: 'Pre-shipment Inspection',
    text: 'The finished machine is checked against the agreed configuration before it ships.',
  },
] as const

export type WorkflowKey = (typeof workflowSteps)[number]['key']
