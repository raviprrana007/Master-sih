export const SKILL_CATEGORIES = [
  {
    id: 'programming',
    label: 'Programming Languages',
    skills: [
      { name: 'Python', demand: 94, yourLevel: 70, gap: 24 },
      { name: 'JavaScript', demand: 90, yourLevel: 78, gap: 12 },
      { name: 'Java', demand: 82, yourLevel: 55, gap: 27 },
      { name: 'TypeScript', demand: 85, yourLevel: 60, gap: 25 },
      { name: 'Go', demand: 72, yourLevel: 20, gap: 52 },
      { name: 'C++', demand: 65, yourLevel: 45, gap: 20 },
    ]
  },
  {
    id: 'frontend',
    label: 'Frontend Development',
    skills: [
      { name: 'React', demand: 92, yourLevel: 80, gap: 12 },
      { name: 'Next.js', demand: 80, yourLevel: 50, gap: 30 },
      { name: 'Vue.js', demand: 65, yourLevel: 20, gap: 45 },
      { name: 'Tailwind CSS', demand: 75, yourLevel: 75, gap: 0 },
      { name: 'TypeScript (Frontend)', demand: 88, yourLevel: 60, gap: 28 },
    ]
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    skills: [
      { name: 'Node.js', demand: 85, yourLevel: 72, gap: 13 },
      { name: 'FastAPI', demand: 78, yourLevel: 40, gap: 38 },
      { name: 'GraphQL', demand: 72, yourLevel: 30, gap: 42 },
      { name: 'REST API Design', demand: 90, yourLevel: 70, gap: 20 },
      { name: 'Microservices', demand: 82, yourLevel: 35, gap: 47 },
    ]
  },
  {
    id: 'database',
    label: 'Databases',
    skills: [
      { name: 'SQL', demand: 92, yourLevel: 65, gap: 27 },
      { name: 'PostgreSQL', demand: 80, yourLevel: 55, gap: 25 },
      { name: 'MongoDB', demand: 75, yourLevel: 60, gap: 15 },
      { name: 'Redis', demand: 70, yourLevel: 25, gap: 45 },
      { name: 'Elasticsearch', demand: 62, yourLevel: 10, gap: 52 },
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', demand: 90, yourLevel: 40, gap: 50 },
      { name: 'Docker', demand: 85, yourLevel: 50, gap: 35 },
      { name: 'Kubernetes', demand: 78, yourLevel: 20, gap: 58 },
      { name: 'CI/CD', demand: 82, yourLevel: 45, gap: 37 },
      { name: 'Terraform', demand: 72, yourLevel: 10, gap: 62 },
    ]
  },
  {
    id: 'ai_ml',
    label: 'AI & Machine Learning',
    skills: [
      { name: 'Machine Learning', demand: 88, yourLevel: 50, gap: 38 },
      { name: 'PyTorch', demand: 82, yourLevel: 35, gap: 47 },
      { name: 'LLMs / GenAI', demand: 91, yourLevel: 30, gap: 61 },
      { name: 'Data Analysis', demand: 85, yourLevel: 60, gap: 25 },
      { name: 'TensorFlow', demand: 75, yourLevel: 40, gap: 35 },
    ]
  },
];

export const ASSESSMENT_QUESTIONS = {
  programming: [
    { id: 1, question: 'What is the time complexity of binary search on a sorted array of n elements?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correct: 1 },
    { id: 2, question: 'Which of the following is NOT a valid Python data type?', options: ['list', 'tuple', 'array', 'dict'], correct: 2 },
    { id: 3, question: 'In Java, what does the "final" keyword do when applied to a variable?', options: ['Makes it a global variable', 'Prevents modification after assignment', 'Makes it thread-safe', 'Converts it to a constant at compile time only'], correct: 1 },
    { id: 4, question: 'What will this Python code print? x = [1,2,3]; y = x; y.append(4); print(x)', options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'Error', 'None'], correct: 1 },
    { id: 5, question: 'Which data structure is best for implementing a function call stack?', options: ['Queue', 'Stack', 'Heap', 'Deque'], correct: 1 },
    { id: 6, question: 'What is the space complexity of mergesort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct: 2 },
    { id: 7, question: 'Which of the following sorting algorithms is stable?', options: ['Quicksort', 'Heapsort', 'Mergesort', 'Selection Sort'], correct: 2 },
    { id: 8, question: 'In Python, what is a lambda function?', options: ['A function that returns None', 'An anonymous inline function', 'A recursive function', 'A built-in function'], correct: 1 },
    { id: 9, question: 'What does DRY stand for in software engineering?', options: ["Don't Repeat Yourself", 'Do Repeat Yesterday', 'Design, Review, Yield', 'Deploy, Run, Yield'], correct: 0 },
    { id: 10, question: 'Which of these is an example of dynamic programming?', options: ['Binary search', 'Fibonacci with memoization', 'Bubble sort', 'DFS traversal'], correct: 1 },
  ],
  frontend: [
    { id: 1, question: 'What hook is used to run side effects in React functional components?', options: ['useState', 'useCallback', 'useEffect', 'useMemo'], correct: 2 },
    { id: 2, question: 'What does CSS "box-model" refer to?', options: ['Flexbox layout model', 'Content, padding, border, margin', 'Grid template areas', 'CSS variables scope'], correct: 1 },
    { id: 3, question: 'In React, what triggers a re-render?', options: ['Only state changes', 'Only prop changes', 'State or prop changes', 'Only context changes'], correct: 2 },
    { id: 4, question: 'What is the Virtual DOM?', options: ['A real browser DOM copy', 'A lightweight JS representation of the DOM', 'A server-side rendering technique', 'A CSS optimization'], correct: 1 },
    { id: 5, question: 'What does the "key" prop do in React lists?', options: ['Styles the element', 'Helps React identify which items changed', 'Makes items unique in CSS', 'Prevents re-renders'], correct: 1 },
    { id: 6, question: 'Which CSS property creates a new stacking context?', options: ['display: flex', 'position: relative with z-index', 'color: red', 'margin: auto'], correct: 1 },
    { id: 7, question: 'What is code splitting in React?', options: ['Breaking CSS into modules', 'Lazy loading parts of the JS bundle', 'Splitting components into files', 'Minifying JavaScript'], correct: 1 },
    { id: 8, question: 'What is Tailwind CSS?', options: ['A component library', 'A utility-first CSS framework', 'A CSS preprocessor like Sass', 'A CSS-in-JS solution'], correct: 1 },
    { id: 9, question: 'What does "hydration" mean in SSR/SSG context?', options: ['Loading CSS styles', 'React attaching event handlers to server HTML', 'Fetching data from server', 'Compiling JSX'], correct: 1 },
    { id: 10, question: 'What is the purpose of React.memo()?', options: ['Memoize expensive computations', 'Prevent unnecessary re-renders of components', 'Cache API responses', 'Store state persistently'], correct: 1 },
  ],
  backend: [
    { id: 1, question: 'Which HTTP status code means "Not Found"?', options: ['200', '201', '401', '404'], correct: 3 },
    { id: 2, question: 'What is a REST API?', options: ['A real-time API using WebSockets', 'A stateless API using HTTP methods and resources', 'A GraphQL-based API', 'A binary protocol API'], correct: 1 },
    { id: 3, question: 'What does JWT stand for?', options: ['JavaScript Web Token', 'JSON Web Token', 'Java Web Transfer', 'JSON Web Transfer'], correct: 1 },
    { id: 4, question: 'What is middleware in Express.js?', options: ['A database layer', 'A function that runs between request and response', 'A caching layer', 'A testing framework'], correct: 1 },
    { id: 5, question: 'What is the difference between authentication and authorization?', options: ['They are the same', 'Auth=who you are, Authz=what you can do', 'Auth=what you can do, Authz=who you are', 'Both verify passwords'], correct: 1 },
    { id: 6, question: 'What is a microservice?', options: ['A small frontend component', 'An independently deployable service doing one thing', 'A mini database', 'A CSS micro-animation'], correct: 1 },
    { id: 7, question: 'What does CORS stand for?', options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Security', 'Content Origin Resource System', 'Client-Origin Resource Sharing'], correct: 0 },
    { id: 8, question: 'Which is NOT a benefit of GraphQL over REST?', options: ['Flexible queries', 'Strongly typed schema', 'Simpler caching', 'Request exactly the data you need'], correct: 2 },
    { id: 9, question: 'What is rate limiting?', options: ['Limiting API response size', 'Restricting number of requests per time window', 'Limiting database connections', 'Throttling file uploads'], correct: 1 },
    { id: 10, question: 'What is idempotency in HTTP?', options: ['Calling an endpoint returns different results', 'Calling an endpoint multiple times has same effect', 'An endpoint can only be called once', 'An endpoint that never fails'], correct: 1 },
  ],
  database: [
    { id: 1, question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Logic', 'Sequential Query Language'], correct: 0 },
    { id: 2, question: 'What is a PRIMARY KEY in a database?', options: ['A foreign key reference', 'A unique identifier for each row', 'The first column in a table', 'An indexed column'], correct: 1 },
    { id: 3, question: 'What is the difference between INNER JOIN and LEFT JOIN?', options: ['No difference', 'INNER=matching rows only, LEFT=all from left table + matches', 'LEFT=matching rows only, INNER=all rows', 'They use different syntax only'], correct: 1 },
    { id: 4, question: 'What is database normalization?', options: ['Making all data uppercase', 'Organizing data to reduce redundancy', 'Adding indexes to tables', 'Compressing database files'], correct: 1 },
    { id: 5, question: 'What is an index in a database?', options: ['A list of all tables', 'A data structure that speeds up queries', 'A backup of the database', 'A primary key constraint'], correct: 1 },
    { id: 6, question: 'What is ACID in database transactions?', options: ['Atomicity, Consistency, Isolation, Durability', 'A NoSQL concept', 'Asynchronous, Consistent, Integrated, Dynamic', 'Atomic, Complete, Isolated, Durable'], correct: 0 },
    { id: 7, question: 'When would you choose MongoDB over PostgreSQL?', options: ['When you need ACID transactions', 'When data is highly relational', 'When you have flexible/unstructured document data', 'Always — MongoDB is always better'], correct: 2 },
    { id: 8, question: 'What does GROUP BY do in SQL?', options: ['Sorts results', 'Groups rows sharing a value for aggregate functions', 'Filters rows', 'Joins tables'], correct: 1 },
    { id: 9, question: 'What is a deadlock in databases?', options: ['A database crash', 'Two transactions waiting for each other\'s locks', 'A slow query', 'An index corruption'], correct: 1 },
    { id: 10, question: 'What is Redis commonly used for?', options: ['Primary relational database', 'In-memory caching and session storage', 'File storage', 'Data warehousing'], correct: 1 },
  ],
  cloud: [
    { id: 1, question: 'What does IaaS stand for?', options: ['Infrastructure as a Service', 'Internet as a Service', 'Integration as a Service', 'Intelligent as a Service'], correct: 0 },
    { id: 2, question: 'What is a Docker container?', options: ['A virtual machine', 'A lightweight, isolated application runtime', 'A cloud storage bucket', 'A CI/CD tool'], correct: 1 },
    { id: 3, question: 'What does Kubernetes do?', options: ['Builds Docker images', 'Orchestrates and manages containers at scale', 'Monitors cloud costs', 'Encrypts network traffic'], correct: 1 },
    { id: 4, question: 'What is an AWS S3 bucket?', options: ['A database service', 'Object storage for files and data', 'A compute instance', 'A networking service'], correct: 1 },
    { id: 5, question: 'What is a CDN?', options: ['Centralized Data Network', 'Content Delivery Network that serves content from edge nodes', 'Cloud Data Node', 'Continuous Deployment Network'], correct: 1 },
    { id: 6, question: 'What is serverless computing?', options: ['Computing without servers', 'Running code without managing server infrastructure', 'Offline computing', 'Edge computing only'], correct: 1 },
    { id: 7, question: 'What does CI/CD stand for?', options: ['Continuous Integration/Continuous Deployment', 'Code Integration/Code Deployment', 'Cloud Infrastructure/Cloud Deployment', 'Compiled Integration/Compiled Deployment'], correct: 0 },
    { id: 8, question: 'What is Infrastructure as Code (IaC)?', options: ['Writing code to build software', 'Managing infrastructure through code (e.g., Terraform)', 'Cloud billing code', 'Container configuration'], correct: 1 },
    { id: 9, question: 'What is auto-scaling?', options: ['Automatic code deployment', 'Automatically adjusting compute resources based on demand', 'Scaling down costs', 'Automatic load testing'], correct: 1 },
    { id: 10, question: 'What is a VPC in AWS?', options: ['Virtual Private Cloud — isolated network environment', 'Virtual Public Container', 'Very Private Connection', 'Virtual Processing Core'], correct: 0 },
  ],
};

export const RADAR_SKILLS = [
  { subject: 'Frontend', A: 80, fullMark: 100 },
  { subject: 'Backend', A: 72, fullMark: 100 },
  { subject: 'Databases', A: 65, fullMark: 100 },
  { subject: 'Cloud', A: 40, fullMark: 100 },
  { subject: 'AI/ML', A: 50, fullMark: 100 },
  { subject: 'DSA', A: 68, fullMark: 100 },
];
