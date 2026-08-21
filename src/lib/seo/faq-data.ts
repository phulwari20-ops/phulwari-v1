import type { FaqItem } from './schema'

/**
 * Plain-text mirror of the FAQ rendered at /legal/faq.
 *
 * The page renders several answers as JSX (bulleted lists, program cards), which
 * cannot go into JSON-LD. This module holds the same answers as flat prose so
 * the FAQPage markup matches what a visitor actually reads — Google treats FAQ
 * markup that does not match visible page content as a violation.
 *
 * If you edit an answer on the FAQ page, edit it here too.
 */
export const CENTRE_FAQS: FaqItem[] = [
  {
    question: 'What is Phulwari Mother & Child Activity Centre?',
    answer:
      'Phulwari is a unique activity centre where children can learn, play, explore and develop ' +
      'through engaging activities, while mothers can participate in dedicated fitness programs ' +
      'and family-oriented experiences.',
  },
  {
    question: 'What is the minimum age for admission?',
    answer:
      'Children aged 3 years and above can join our regular activity programs and batches. For ' +
      'younger children we offer the Mother & Toddler Program, designed for toddlers aged 1 to 3 ' +
      'years together with their mothers.',
  },
  {
    question: 'What activities are available at Phulwari?',
    answer:
      'Phulwari runs music classes, dance classes, gymnastics, MMA training, roller skating, ' +
      'art & craft, cricket training, yoga, play zone activities, the Mother & Toddler Program ' +
      'and a fitness program for mothers.',
  },
  {
    question: 'Do you have programs for mothers?',
    answer:
      'Yes. We offer a dedicated Fitness Program for Mothers that helps mothers stay active, ' +
      'healthy and energetic while their children participate in activities.',
  },
  {
    question: 'What programs and batches are available?',
    answer:
      'Phulwari Premium Circle runs 5:00 PM onwards, Monday to Sunday, for ages 3+ and includes ' +
      'the mothers fitness program, play zone access and customised activity options. Phulwari ' +
      'Core runs 6:30 PM onwards, Wednesday to Sunday, for ages 3+ and covers dance, art & craft, ' +
      'gymnastics and yoga. The Mother & Toddler Program runs 10:30 AM to 11:30 AM, Monday to ' +
      'Saturday, for ages 1 to 3 years.',
  },
  {
    question: 'Is the environment safe for children?',
    answer:
      'Absolutely. Child safety and well-being are our highest priorities. We provide a secure, ' +
      'clean, hygienic and child-friendly environment with trained instructors and staff.',
  },
  {
    question: 'How do you organise birthday parties?',
    answer:
      'Birthday celebrations at Phulwari include theme decorations, fun activities, entertainment, ' +
      'customised packages and photo-friendly setups.',
  },
  {
    question: 'Do you organize Summer Camps?',
    answer:
      'Yes. Our summer camp covers dance, music, art & craft, sports & games, fitness activities ' +
      'and personality development sessions.',
  },
  {
    question: 'Do you organize Winter Camps?',
    answer:
      'Yes. Our winter camp covers creative learning, art & craft, fitness activities, ' +
      'sports & games, team building activities and fun competitions.',
  },
  {
    question: 'Can parents visit the centre before enrollment?',
    answer:
      'Yes. Parents are welcome to visit our centre, explore the facilities, meet our team and ' +
      'understand the programs before enrollment.',
  },
  {
    question: 'How can I enroll my child?',
    answer:
      'You can call us, contact us on WhatsApp, or visit the centre directly to complete the ' +
      'admission process.',
  },
  {
    question: 'Are customized activity options available?',
    answer:
      'Yes. Customized activity options are available under Phulwari Premium Circle, subject to ' +
      'availability and requirements.',
  },
  {
    question: 'Do you have a Play Zone?',
    answer:
      'Yes. We provide a safe, clean and enjoyable Play Zone where children can play, interact ' +
      'and have fun in a supervised environment.',
  },
  {
    question: 'Do you conduct special events and competitions?',
    answer:
      'Yes. Phulwari hosts competitions, talent shows, celebrations, children’s events and ' +
      'family engagement activities through the year.',
  },
  {
    question: 'What are your operating hours?',
    answer:
      'The Mother & Toddler Program runs 10:30 AM to 11:30 AM, Monday to Saturday. Evening ' +
      'activity batches generally begin from 5:00 PM onwards and continue according to the ' +
      'selected batch.',
  },
  {
    question: 'Where is Phulwari located?',
    answer:
      'Phulwari is at M/32, Road No. 25, Sri Krishna Nagar, Kidwaipuri Main Road, Patna, ' +
      'Bihar – 800001.',
  },
  {
    question: 'How can I contact Phulwari?',
    answer:
      'Call or WhatsApp +91 62073 68839, or email phulwari02@gmail.com. You can also visit the ' +
      'centre in Kidwaipuri, Patna.',
  },
]
