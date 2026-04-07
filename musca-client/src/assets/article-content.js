import articlePhoto2 from './image/article-photo2.png';
import articlePhoto3 from './image/article-photo3.png';
import articlePhoto4 from './image/article-photo4.png';
import articlePhoto5 from './image/article-photo5.png';
import articlePhoto6 from './image/article-photo6.png';

const articles = [
  {
    name: 'collaborative-component-planning',
    slug: 'collaborative-component-planning',
    title: 'Collaborative Component Planning for React Teams',
    image: articlePhoto2,
    category: 'Planning',
    excerpt:
      'The first illustration shows a team designing one shared UI system together. This article covers how to align props, naming, and styling decisions before writing code.',
    readTime: '5 min read',
    content: [
      'Before coding, teams should agree on a small set of reusable building blocks: buttons, cards, forms, and layout sections. This keeps development focused and avoids duplicate components.',
      'Use props as contracts. Define what each component accepts, what defaults it has, and what is required. Clear contracts reduce regressions when multiple developers work in parallel.',
      'Decide styling boundaries early: what lives in component classes, what comes from variants, and what should stay token-based. A shared styling approach creates visual consistency across pages.',
      'A practical team ritual is to review one component together at the end of each sprint. That review catches API drift and keeps the design language coherent over time.',
    ],
  },
  {
    name: 'functional-components-in-practice',
    slug: 'functional-components-in-practice',
    title: 'Functional Components in Real-World React',
    image: articlePhoto3,
    category: 'Components',
    excerpt:
      'The second illustration highlights focused solo implementation. This article explains how to keep functional components small, readable, and easy to test.',
    readTime: '4 min read',
    content: [
      'Functional components work best when each one has a single responsibility: either display data, orchestrate behavior, or connect state to UI.',
      'Keep rendering logic obvious. If a component has too many conditions, split sections into helper components and compose them in one clean parent layout.',
      'Hooks should follow predictable order and purpose: state hooks first, derived values next, side effects last. This pattern makes files easier for teammates to scan.',
      'When a component gets difficult to read, treat that as architecture feedback. Break it into reusable parts instead of adding more inline complexity.',
    ],
  },
  {
    name: 'lifecycle-thinking-with-hooks',
    slug: 'lifecycle-thinking-with-hooks',
    title: 'Lifecycle Thinking with Hooks',
    image: articlePhoto4,
    category: 'Lifecycle',
    excerpt:
      'The third illustration visualizes update loops. Learn how mount, update, and cleanup behavior maps into modern React hooks.',
    readTime: '6 min read',
    content: [
      'In hook-based React, lifecycle behavior is expressed through effects and dependencies rather than separate class methods.',
      'Think in three phases: setup, synchronize, and cleanup. Every effect should clearly state what it watches and what it tears down.',
      'Avoid overloading one effect with unrelated concerns. Split data fetching, event listeners, and subscriptions into separate effects for better control.',
      'Lifecycle clarity improves performance too. Precise dependency arrays prevent unnecessary work and make render behavior more predictable.',
    ],
  },
  {
    name: 'route-mapping-for-content-pages',
    slug: 'route-mapping-for-content-pages',
    title: 'Route Mapping for Content Pages',
    image: articlePhoto5,
    category: 'Routing',
    excerpt:
      'The fourth illustration mirrors navigation flow design. Build route structures that are understandable for users and maintainable for developers.',
    readTime: '5 min read',
    content: [
      'Design your route tree around user tasks, not internal folder names. Paths should read naturally and communicate where users are in the product.',
      'Use list routes for discovery and detail routes for focus. This gives users a smooth flow from overview to specific content.',
      'Set clear fallback behavior for unknown routes. A thoughtful not-found experience keeps navigation recoverable and reduces confusion.',
      'Keep route segments stable once published. Consistent URLs help sharing, indexing, and long-term product trust.',
    ],
  },
  {
    name: 'state-flow-and-ui-feedback',
    slug: 'state-flow-and-ui-feedback',
    title: 'State Flow and UI Feedback',
    image: articlePhoto6,
    category: 'State',
    excerpt:
      'The last illustration represents dashboard-like state transitions. This guide focuses on structuring state so UI updates remain clear and reliable.',
    readTime: '4 min read',
    content: [
      'Treat state as a data pipeline: source, transform, render. Keeping that chain explicit helps teams debug behavior quickly.',
      'Store only what must be stored. Derived values should be computed instead of duplicated, which reduces stale data bugs.',
      'Use loading, empty, and error states deliberately. Users need visible feedback for every async transition, not just success states.',
      'As pages grow, split state by responsibility. Local UI state, server state, and form state should not compete inside one object.',
    ],
  },
];

export default articles;