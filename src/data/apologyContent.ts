export const sceneCount = 6;

export const siteTitle = 'For Tushi — Just One Thing';

export const sceneLabels = [
  'Tushi…',
  'Everyday friendship',
  'The Little Things',
  'Where I went wrong',
  'The letter',
  'Take care',
] as const;

export const introLines = [
  'Tushi…',
  'I know things are awkward right now.',
  'And I understand that I probably played a part in making them that way.',
  'I just wanted to say one thing properly.',
] as const;

export const introButtonLabel = 'Can I say something?';

export const everydayScene = {
  eyebrow: '02 / Everyday friendship',
  title: 'It was simple to me: friendship.',
  body: [
    'Same class. Studying together for exams. Same food breaks. Same gym sessions. Random conversations. Stupid jokes. Complaining about college. Somehow, ordinary days became good days.',
    'None of that was complicated to me. It was just friendship — and it is a friendship I genuinely value.',
  ],
  actionAriaLabel: 'Open small friendship notes',
  scrollHint: 'explore gently · then scroll',
} as const;

export const everydayMemories = [
  {
    id: 'college',
    title: 'College',
    line: 'Same class. A lot of ordinary conversations around ordinary college days.',
  },
  {
    id: 'study',
    title: 'Study',
    line: 'Studying together before exams — going through notes, figuring things out, and getting through college together.',
  },
  {
    id: 'food',
    title: 'Food',
    line: 'Food breaks became part of the routine — simple, normal, and friendly.',
  },
  {
    id: 'gym',
    title: 'Gym',
    line: 'Gym sessions together, with no big story attached. Just another part of the day.',
  },
  {
    id: 'everyday',
    title: 'Everyday',
    line: 'Random talks, stupid jokes, college complaints, and doing nothing sometimes.',
  },
] as const;

export type EverydayMemoryId = (typeof everydayMemories)[number]['id'];

export const littleThingsScene = {
  eyebrow: '03 / THE LITTLE THINGS',
  title: 'The little things mattered too.',
  subtitle: [
    'College. Studying together. Food breaks. Gym sessions. Random conversations. Stupid jokes.',
    'Nothing extraordinary — just the ordinary things that made our friendship what it is.',
  ],
  actionAriaLabel: 'Activate little things in the constellation',
  revealThreshold: 4,
} as const;

export const littleThingsStars = [
  { id: 'college', label: 'College' },
  { id: 'study', label: 'Studying together' },
  { id: 'food', label: 'Food' },
  { id: 'gym', label: 'Gym' },
  { id: 'talks', label: 'Random talks' },
  { id: 'teasing', label: 'Teasing each other' },
  { id: 'complaining', label: 'Complaining about college' },
  { id: 'nothing', label: 'Doing absolutely nothing' },
  { id: 'laughing', label: 'Laughing at stupid things' },
] as const;

export type LittleThingId = (typeof littleThingsStars)[number]['id'];

export const littleThingsReveal = [
  'Nothing extraordinary.',
  'Just ordinary days that became good memories.',
] as const;

export const apologyScene = {
  eyebrow: '04 / Where I went wrong',
  title: 'Where I went wrong',
} as const;

export const apologyLines = [
  'People started saying things about us.',
  'I brought that up with you, and looking back, I can understand why that made things uncomfortable.',
  "I shouldn't have let other people's opinions become something you had to deal with in our friendship.",
  'I could have handled that conversation much better.',
  'I\'m sorry for making something that should have stayed simple and comfortable feel complicated.',
  "I'm genuinely sorry, Tushi.",
] as const;

export const letterScene = {
  eyebrow: '05 / A short letter',
  title: 'One thing, properly.',
  intro: 'A short letter. No expectation attached.',
  openButton: 'Open it.',
  completedHint: 'The final note is just below, whenever you want to continue.',
  closeButton: 'Close this letter',
} as const;

export const letterParagraphs = [
  { text: 'Tushi,', emphasis: false },
  { text: "I didn't really know how to say all of this properly.", emphasis: false },
  {
    text: "I don't want other people's opinions to change the way I see our friendship.",
    emphasis: false,
  },
  { text: "You're my friend.", emphasis: false },
  {
    text: 'Someone I spend a huge part of my everyday life with — class, studying for exams, food, gym, random conversations, stupid jokes and everything in between.',
    emphasis: false,
  },
  { text: 'I never wanted any of that to become uncomfortable for you.', emphasis: false },
  {
    text: "I realise I could have handled the situation much better, and I'm genuinely sorry for that.",
    emphasis: true,
  },
  { text: 'Honestly, I wish I had handled it differently.', emphasis: false },
  { text: "I don't expect you to reply.", emphasis: false },
  { text: "I don't expect you to forgive me immediately.", emphasis: false },
  { text: 'I just wanted to say sorry properly.', emphasis: false },
  { text: '— Aryan', emphasis: false, signature: true },
] as const;

export const endingScene = {
  title: 'One last thing',
  button: 'One last thing…',
  intro: 'No request attached.',
} as const;

export const endingLines = [
  "You don't owe me a reply.",
  "You don't owe me forgiveness today.",
  'Take whatever time you need.',
  "I just wanted to say that I'm genuinely sorry.",
] as const;

export const finalEndingLines = ['Take care, Tushi.', '— Aryan'] as const;
