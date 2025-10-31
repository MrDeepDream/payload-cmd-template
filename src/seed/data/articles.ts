// Mock articles with rich text content
export const articles = [
  {
    title: 'AI Revolution: How Machine Learning is Transforming Healthcare',
    slug: 'ai-revolution-healthcare',
    subtitle: 'New algorithms are detecting diseases earlier than ever before',
    status: 'published',
    authorSlug: 'michael-chen',
    categorySlug: 'technology',
    tagSlugs: ['ai', 'healthcare', 'innovation', 'research'],
    excerpt: 'Artificial intelligence is revolutionizing medical diagnostics, with new machine learning algorithms achieving unprecedented accuracy in early disease detection.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'The healthcare industry is experiencing a profound transformation as artificial intelligence and machine learning technologies demonstrate remarkable capabilities in medical diagnostics and patient care.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Early Detection Breakthroughs' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Recent studies published in leading medical journals show that AI algorithms can now detect certain cancers up to two years earlier than traditional screening methods. This breakthrough could save thousands of lives annually.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Dr. Sarah Mitchell, Chief of Oncology at Stanford Medical Center, explains: "These AI systems analyze medical imaging with a level of precision that complements and often surpasses human expertise. They can identify patterns invisible to the human eye."',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Implementation Challenges' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Despite the promising results, healthcare institutions face significant challenges in implementing AI systems, including data privacy concerns, integration with existing systems, and the need for extensive validation.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The future of healthcare will likely involve a collaborative approach where AI augments human medical expertise rather than replacing it entirely.',
          },
        ],
      },
    ],
    featured: true,
    breaking: false,
    readingTime: 5,
    publishedDate: new Date('2024-01-15'),
  },
  {
    title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
    slug: 'climate-summit-carbon-agreement',
    subtitle: '190 nations commit to ambitious new targets',
    status: 'published',
    authorSlug: 'emma-rodriguez',
    categorySlug: 'environment',
    tagSlugs: ['climate-change', 'policy', 'breaking-news'],
    excerpt: 'World leaders have agreed to the most comprehensive climate action plan in history, with binding commitments to reduce global carbon emissions by 50% by 2035.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'In a landmark decision that environmental advocates are calling "historic," representatives from 190 nations have signed the Global Climate Action Framework, committing to unprecedented reductions in carbon emissions.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Key Commitments' }],
      },
      {
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [
              { text: '50% reduction in global emissions by 2035' },
            ],
          },
          {
            type: 'li',
            children: [
              { text: '$500 billion annual fund for developing nations' },
            ],
          },
          {
            type: 'li',
            children: [
              { text: 'Phase out of coal power by 2040' },
            ],
          },
          {
            type: 'li',
            children: [
              { text: 'Protection of 30% of global forests' },
            ],
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Environmental groups cautiously welcomed the agreement while emphasizing the need for immediate action. "Words on paper are meaningless without swift implementation," stated Maria Santos, director of Global Climate Watch.',
          },
        ],
      },
    ],
    featured: true,
    breaking: true,
    readingTime: 4,
    publishedDate: new Date('2024-01-14'),
  },
  {
    title: 'Tech Giants Face New Antitrust Regulations in Europe',
    slug: 'tech-antitrust-europe',
    subtitle: 'EU introduces sweeping reforms to curb monopolistic practices',
    status: 'published',
    authorSlug: 'sarah-johnson',
    categorySlug: 'business',
    tagSlugs: ['policy', 'breaking-news', 'economy'],
    excerpt: 'The European Union has unveiled comprehensive antitrust legislation targeting major technology companies, marking the most significant regulatory overhaul in decades.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'The European Union today announced sweeping antitrust regulations that will fundamentally reshape how major technology companies operate within its borders.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Digital Markets Act and Digital Services Act, which take effect next quarter, impose strict requirements on companies designated as "gatekeepers" of the digital economy.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Impact on Tech Companies' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Companies exceeding certain thresholds in market capitalization and user base will face restrictions on data collection, requirements for interoperability, and prohibitions on preferential treatment of their own services.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Industry analysts predict these regulations could reduce profit margins for affected companies by 10-15% while potentially spurring innovation among smaller competitors.',
          },
        ],
      },
    ],
    featured: false,
    breaking: true,
    readingTime: 6,
    publishedDate: new Date('2024-01-13'),
  },
  {
    title: 'Breakthrough in Fusion Energy Brings Clean Power Closer',
    slug: 'fusion-energy-breakthrough',
    subtitle: 'Scientists achieve net energy gain for the third consecutive time',
    status: 'published',
    authorSlug: 'lisa-thompson',
    categorySlug: 'science',
    tagSlugs: ['energy', 'innovation', 'research'],
    excerpt: 'Researchers at the National Ignition Facility have replicated their historic fusion energy breakthrough, demonstrating the reliability of this revolutionary clean energy technology.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'For the third time in six months, scientists have achieved nuclear fusion with a net energy gain, bringing humanity closer to unlimited clean energy.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The latest experiment at the National Ignition Facility produced 3.15 megajoules of energy from 2.05 megajoules of input, representing a 54% energy gain.',
          },
        ],
      },
      {
        type: 'blockquote',
        children: [
          {
            text: '"This is no longer a question of if, but when. We are witnessing the birth of a new era in energy production." - Dr. Jennifer Park, Lead Researcher',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Path to Commercialization' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'While the scientific achievement is monumental, experts caution that commercial fusion power plants are still 10-15 years away. Significant engineering challenges remain in scaling the technology and developing sustainable tritium fuel sources.',
          },
        ],
      },
    ],
    featured: false,
    breaking: false,
    readingTime: 5,
    publishedDate: new Date('2024-01-12'),
  },
  {
    title: 'Global Markets Rally on Inflation Data',
    slug: 'markets-rally-inflation',
    subtitle: 'Stocks surge as inflation shows signs of cooling',
    status: 'published',
    authorSlug: 'david-kim',
    categorySlug: 'business',
    tagSlugs: ['economy', 'analysis'],
    excerpt: 'Major stock indices posted their best single-day gains in months after inflation data came in below expectations, raising hopes for interest rate cuts.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Global financial markets experienced a powerful rally today as new economic data revealed inflation is moderating faster than economists predicted.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The S&P 500 surged 2.3%, the Dow Jones Industrial Average gained 450 points, and the Nasdaq Composite jumped 3.1% as investors bet on potential interest rate cuts later this year.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Key Economic Indicators' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Consumer Price Index rose just 0.2% in December, bringing annual inflation to 3.4%, down from 4.1% the previous month. Core inflation, which excludes food and energy, also showed encouraging signs at 3.9%.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Federal Reserve officials have indicated they will carefully monitor incoming data before making decisions on monetary policy, but market participants are increasingly optimistic about rate cuts beginning in the second quarter.',
          },
        ],
      },
    ],
    featured: false,
    breaking: false,
    readingTime: 4,
    publishedDate: new Date('2024-01-11'),
  },
  {
    title: 'New Study Links Urban Green Spaces to Mental Health Benefits',
    slug: 'green-spaces-mental-health',
    subtitle: 'Access to parks reduces depression and anxiety by 25%, researchers find',
    status: 'published',
    authorSlug: 'lisa-thompson',
    categorySlug: 'health',
    tagSlugs: ['research', 'healthcare'],
    excerpt: 'A comprehensive 10-year study reveals that proximity to urban green spaces significantly improves mental health outcomes in city residents.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'A groundbreaking longitudinal study published in The Lancet has found compelling evidence that access to urban green spaces substantially improves mental health outcomes.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Researchers tracked 50,000 participants across 15 major cities over a decade, finding that residents living within a 10-minute walk of a park or green space showed 25% lower rates of depression and anxiety.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Mechanisms of Benefit' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The study identified several factors contributing to improved mental health: reduced air pollution, increased physical activity, enhanced social connections, and exposure to natural environments that promote stress reduction.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Urban planners are now incorporating these findings into city development strategies, with several municipalities committing to the "15-minute green space" initiative.',
          },
        ],
      },
    ],
    featured: false,
    breaking: false,
    readingTime: 6,
    publishedDate: new Date('2024-01-10'),
  },
  {
    title: 'Quantum Computing Achieves Major Milestone',
    slug: 'quantum-computing-milestone',
    subtitle: 'Error correction breakthrough paves way for practical applications',
    status: 'published',
    authorSlug: 'michael-chen',
    categorySlug: 'technology',
    tagSlugs: ['innovation', 'research'],
    excerpt: 'Scientists have demonstrated a quantum error correction system that maintains qubit stability for over an hour, a crucial step toward practical quantum computers.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'Quantum computing has taken a giant leap forward with the demonstration of an error correction system that maintains quantum information for unprecedented durations.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The breakthrough, achieved by a team at MIT, keeps quantum bits (qubits) stable for over one hour—a thousand-fold improvement over previous records.',
          },
        ],
      },
      {
        type: 'h2',
        children: [{ text: 'Implications for Computing' }],
      },
      {
        type: 'p',
        children: [
          {
            text: 'This advancement removes one of the primary barriers to practical quantum computing. Previously, qubits would lose their quantum state within milliseconds, making complex calculations impossible.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Applications could include drug discovery, climate modeling, cryptography, and optimization problems that are currently intractable for classical computers.',
          },
        ],
      },
    ],
    featured: false,
    breaking: false,
    readingTime: 5,
    publishedDate: new Date('2024-01-09'),
  },
  {
    title: 'International Space Station Extended to 2035',
    slug: 'iss-extended-2035',
    subtitle: 'NASA and partners commit to continued orbital research',
    status: 'published',
    authorSlug: 'michael-chen',
    categorySlug: 'science',
    tagSlugs: ['policy', 'research'],
    excerpt: 'Space agencies from the U.S., Europe, Japan, and Canada have agreed to extend ISS operations through 2035, ensuring continued microgravity research.',
    content: [
      {
        type: 'p',
        children: [
          {
            text: 'The International Space Station will continue operations for another 11 years following a historic agreement between participating space agencies.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'NASA Administrator Bill Nelson announced the extension, emphasizing the station\'s critical role in scientific research, technology development, and international cooperation.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The decision comes as private space stations are being developed, but officials believe the ISS remains vital for research that cannot yet be conducted elsewhere.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Over $4 billion will be invested in upgrades and maintenance to ensure the aging station can safely operate through the extended period.',
          },
        ],
      },
    ],
    featured: false,
    breaking: false,
    readingTime: 4,
    publishedDate: new Date('2024-01-08'),
  },
];
