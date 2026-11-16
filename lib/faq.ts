import { l, type Localized } from '@/lib/i18n'

export type FaqItem = { id: string; question: Localized; answer: Localized }

export const faqs: FaqItem[] = [
  {
    id: 'moq',
    question: l('What is the minimum order quantity?'),
    answer: l('The minimum order is one machine. You can start with a single unit of any listed family.'),
  },
  {
    id: 'choose-model',
    question: l('How do I choose the right model?'),
    answer: l(
      'Start with the material you process, the output you expect per hour and the power supply at your site. Send those through the inquiry form and we will suggest a model from the catalogue for you to review.',
    ),
  },
  {
    id: 'voltage',
    question: l('Which voltage do the machines use?'),
    answer: l(
      'It depends on the model. For example, the supplied mixer sheet lists 220 V for the 15, 30 and 50 Type and 380 V for the 100 and 200 Type, and the 420 Type wood crusher is listed at three-phase 380 V. Tell us your local supply when you inquire.',
    ),
  },
  {
    id: 'stainless',
    question: l('Can I get stainless steel contact parts?'),
    answer: l(
      'Stainless Steel Pulverizers and Stainless Steel Mixers are listed as separate families. The mixer sheet describes 201 stainless steel builds and notes that custom 304 stainless steel can be requested. State your contact-material requirement and we will confirm the build.',
    ),
  },
  {
    id: 'screen-mesh',
    question: l('Can output fineness be adjusted?'),
    answer: l(
      'On the wood crusher sheet, the screening mesh can be replaced with different sizes according to customer requirements to adjust the fineness of the output. Describe the particle size you want for other families.',
    ),
  },
  {
    id: 'custom',
    question: l('Do you build customized equipment?'),
    answer: l(
      'The factory operates one automated production line and one customized line. Send your requirement and we will confirm whether it fits a catalogue model or needs a customized build.',
    ),
  },
  {
    id: 'prices',
    question: l('Where can I see prices?'),
    answer: l(
      'Prices are not published online because they depend on model and configuration. Use the quote form and we will respond with a quotation for the machine you describe.',
    ),
  },
]
