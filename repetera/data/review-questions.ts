export type ReviewPrompt = {
  id: number;
  source: string;
  topic: string;
  question: string;
  answer: string;
  note?: string;
  intervalDays: number;
  dueLabel: string;
};

export const reviewQuestions: ReviewPrompt[] = [
  {
    id: 1,
    source: 'Computer Networks',
    topic: 'Transport Layer',
    question: 'Why does TCP use congestion control in addition to flow control?',
    answer:
      'Flow control protects the receiver, while congestion control protects the network. TCP needs both so it does not overwhelm either endpoint buffers or shared links.',
    note: 'Receiver capacity and network capacity are separate constraints.',
    intervalDays: 1,
    dueLabel: 'Due now',
  },
  {
    id: 2,
    source: 'Operating Systems',
    topic: 'Processes',
    question: 'What problem does a process control block solve for an operating system?',
    answer:
      'It stores the execution context and bookkeeping data the kernel needs to pause, resume, and manage a process safely.',
    note: 'Think state, registers, scheduling, and memory references.',
    intervalDays: 3,
    dueLabel: 'In 3 days',
  },
  {
    id: 3,
    source: 'Database Systems',
    topic: 'Indexing',
    question: 'Why can a B-tree index reduce query time compared with a full table scan?',
    answer:
      'It keeps keys ordered in a balanced structure, so the database can navigate to matching rows with logarithmic-style lookup instead of scanning every record.',
    note: 'The tradeoff is extra storage and write maintenance.',
    intervalDays: 6,
    dueLabel: 'In 6 days',
  },
];
