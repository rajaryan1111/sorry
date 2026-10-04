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
    'Same class. Same food breaks. Same gym sessions. Random conversations. Stupid jokes. Complaining about college. Somehow, ordinary days became good days.',
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
  eyebrow: '03 / The Little Things',
  title: 'No photos. No big story. Just ordinary things.',
  prompt:
    'Tap a few brighter stars if you want. Each one is just a small part of the friendship — nothing invented, nothing exaggerated.',
  actionAriaLabel: 'Activate little things in the constellation',
  revealThreshold: 4,
} as const;

export const littleThingsStars = [
  { id: 'college', label: 'College.' },
  { id: 'food', label: 'Food.' },
  { id: 'gym', label: 'Gym.' },
  { id: 'talks', label: 'Random talks.' },
  { id: 'teasing', label: 'Teasing each other.' },
  { id: 'complaining', label: 'Complaining about college.' },
  { id: 'nothing', label: 'Doing absolutely nothing.' },
  { id: 'laughing', label: 'Laughing at stupid things.' },
] as const;

export type LittleThingId = (typeof littleThingsStars)[number]['id'];

export const littleThingsReveal = [
  'Nothing extraordinary.',
  'Just a lot of ordinary days that became good memories.',
  "That's why I didn't want things to become awkward between us.",
] as const;

export const apologyScene = {
  eyebrow: '04 / Where I went wrong',
  title: 'Where I went wrong',
} as const;

export const apologyLines = [
  'People started saying things about us.',
  'I told you about it.',
  "Looking back, I realise that bringing other people's assumptions into our friendship probably made things uncomfortable for you.",
  'I should have handled it better.',
  "I'm sorry, Tushi.",
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
  {
    text: "I don't want other people's opinions to change the way I see our friendship.",
    emphasis: false,
  },
  { text: "You're my friend.", emphasis: false },
  {
    text: 'Someone I spend a huge part of my everyday life with — class, food, gym, random conversations, stupid jokes and everything in between.',
    emphasis: false,
  },
  { text: 'I never wanted any of that to become uncomfortable for you.', emphasis: false },
  {
    text: "I realise I could have handled the situation much better, and I'm genuinely sorry for that.",
    emphasis: true,
  },
  { text: "I don't expect you to reply.", emphasis: false },
  { text: "I don't expect you to forgive me immediately.", emphasis: false },
  { text: 'I just wanted to say sorry properly.', emphasis: false },
  { text: 'Please pardon me.', emphasis: true },
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
  "I just wanted you to know that I'm sorry.",
] as const;

export const finalEndingLines = ['Take care, Tushi.', '— Aryan'] as const;
