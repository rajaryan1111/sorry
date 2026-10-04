export const sceneCount = 6;

export const sceneLabels = [
  'Tushi…',
  'Our little everyday world',
  'The Little Things',
  'Where I went wrong',
  'The letter',
  'Take your time',
] as const;

export const introLines = [
  'Tushi…',
  "I know you don't want to talk to me right now.",
  "And I'm going to respect that.",
  'But there is one thing I wanted to say properly.',
] as const;

export const everydayMemories = [
  {
    id: 'college',
    title: 'College',
    line: 'Same class. Somehow we still found a million things to talk about.',
  },
  {
    id: 'food',
    title: 'Food',
    line: "From ‘what are we eating?’ to actually eating together all the time.",
  },
  {
    id: 'gym',
    title: 'Gym',
    line: 'Going to the gym together… and pretending we had a proper workout plan.',
  },
  {
    id: 'everyday',
    title: 'Everyday',
    line: 'A lot of ordinary days became good memories.',
  },
] as const;

export type EverydayMemoryId = (typeof everydayMemories)[number]['id'];

export const littleThingsStars = [
  { id: 'college', label: 'College.' },
  { id: 'eating', label: 'Eating together.' },
  { id: 'gym', label: 'Gym.' },
  { id: 'talks', label: 'Random conversations.' },
  { id: 'teasing', label: 'Making fun of each other.' },
  { id: 'complaining', label: 'Complaining about college.' },
  { id: 'nothing', label: 'Doing absolutely nothing.' },
  { id: 'laughing', label: 'Laughing anyway.' },
] as const;

export type LittleThingId = (typeof littleThingsStars)[number]['id'];

export const littleThingsReveal = [
  'Nothing extraordinary.',
  'Just a lot of ordinary days that became good memories.',
  "That's why I didn't want things to become awkward between us.",
] as const;

export const apologyLines = [
  'Then I made things awkward.',
  'People started saying things about us.',
  'I told you about it.',
  "And now I realise I probably shouldn't have brought that into our friendship the way I did.",
  "I'm sorry.",
] as const;

export const letterParagraphs = [
  { text: 'Tushi,', emphasis: false },
  {
    text: "I don't want you to think that our friendship means something different to me just because other people decided to talk about it.",
    emphasis: false,
  },
  { text: "You're my friend.", emphasis: false },
  {
    text: 'One of the people I spend a huge part of my everyday life with.',
    emphasis: false,
  },
  {
    text: 'We study together, eat together, go to the gym together, laugh about stupid things and somehow make ordinary college days less boring.',
    emphasis: false,
  },
  { text: 'I never wanted to make that uncomfortable for you.', emphasis: false },
  { text: "I'm genuinely sorry for making things awkward.", emphasis: true },
  { text: "I don't expect you to reply right now.", emphasis: false },
  { text: 'Take your time.', emphasis: false },
  { text: 'I just wanted to say:', emphasis: false },
  { text: 'Please pardon me.', emphasis: true },
  { text: '— Aryan', emphasis: false, signature: true },
] as const;

export const oneLastThingLines = [
  "You don't owe me a reply.",
  "You don't owe me forgiveness today.",
  'I just hope someday we can go back to being the idiots who eat together, work out together and laugh at absolutely nothing.',
] as const;

export const seedEndingLines = [
  "Some things don't need to be forced.",
  'They just need a little time.',
  'Take your time.',
  'Thank you for reading this.',
] as const;

export const finalEndingLines = ["I'm sorry, Tushi.", '— Aryan'] as const;
