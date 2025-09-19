const coursesData = [
  {
    id: 1,
    title: "Clinical Pharmacy-II",
    description:
      "Advanced clinical pharmacy concepts focusing on patient care, drug therapy optimization, and clinical decision-making",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    modules: [
      {
        id: "module-1",
        title: "Patient Assessment and Care Planning",
        description: "Comprehensive patient evaluation and therapeutic planning",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Clinical Assessment Fundamentals",
            items: [
              {
                id: "item-1-1-1",
                title: "Introduction to Clinical Assessment",
                type: "video",
                duration: "18:45",
                content: {
                  videoUrl: "/clinical-assessment-intro.mp4",
                  transcript: "Welcome to Clinical Assessment Fundamentals...",
                  captions: true,
                  bookmarks: [
                    { time: "3:20", title: "Assessment Framework" },
                    { time: "8:15", title: "Patient History Taking" },
                    { time: "14:30", title: "Physical Examination" },
                  ],
                },
              },
              {
                id: "item-1-1-2",
                title: "Assessment Tools and Techniques",
                type: "pdf",
                content: {
                  pdfUrl: "/assessment-tools-guide.pdf",
                  pages: 12,
                },
              },
              {
                id: "item-1-1-3",
                title: "Patient Assessment Quiz",
                type: "quiz",
                content: {
                  questions: [
                    {
                      id: "q1",
                      question: "What are the key components of a comprehensive patient assessment?",
                      type: "multiple-select",
                      options: [
                        "Medical history",
                        "Physical examination",
                        "Laboratory results",
                        "Patient preferences",
                        "All of the above",
                      ],
                      correct: [0, 1, 2, 3],
                    },
                    {
                      id: "q2",
                      question: "Which assessment tool is most appropriate for pain evaluation?",
                      type: "multiple-choice",
                      options: [
                        "Visual Analog Scale",
                        "Glasgow Coma Scale",
                        "Mini Mental State Exam",
                        "Beck Depression Inventory",
                      ],
                      correct: 0,
                    },
                  ],
                  timeLimit: 600,
                  passingScore: 80,
                },
              },
            ],
          },
          {
            id: "lesson-1-2",
            title: "Therapeutic Drug Monitoring",
            items: [
              {
                id: "item-1-2-1",
                title: "TDM Principles and Applications",
                type: "video",
                duration: "22:30",
                content: {
                  videoUrl: "/tdm-principles.mp4",
                  transcript: "Therapeutic drug monitoring is essential...",
                  captions: true,
                  embeddedQuizzes: [
                    {
                      time: "12:00",
                      question: "What is the therapeutic window?",
                      options: [
                        "The time between doses",
                        "The range between minimum effective and toxic concentrations",
                        "The duration of drug action",
                      ],
                      correct: 1,
                    },
                  ],
                },
              },
              {
                id: "item-1-2-2",
                title: "TDM Case Study Assignment",
                type: "assignment",
                content: {
                  instructions:
                    "Analyze the provided patient case and recommend appropriate TDM strategies. Include sampling times, target levels, and monitoring parameters.",
                  dueDate: "2025-02-01",
                  maxPoints: 25,
                  submissionTypes: ["file", "text"],
                  rubric: [
                    { criteria: "Case analysis accuracy", points: 8 },
                    { criteria: "TDM strategy appropriateness", points: 8 },
                    { criteria: "Monitoring plan completeness", points: 6 },
                    { criteria: "Professional presentation", points: 3 },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "Pharmacokinetics and Pharmacodynamics",
        description: "Advanced PK/PD concepts in clinical practice",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Clinical Pharmacokinetics",
            items: [
              {
                id: "item-2-1-1",
                title: "PK Principles in Patient Care",
                type: "text",
                content: {
                  html: `
                    <h2>Clinical Pharmacokinetics</h2>
                    <p>Pharmacokinetics describes what the body does to a drug, encompassing absorption, distribution, metabolism, and elimination (ADME).</p>
                    <h3>Key Clinical Applications:</h3>
                    <ul>
                      <li>Dose optimization based on patient factors</li>
                      <li>Prediction of drug interactions</li>
                      <li>Adjustment for organ dysfunction</li>
                      <li>Therapeutic drug monitoring</li>
                    </ul>
                    <h3>Population Pharmacokinetics:</h3>
                    <p>Understanding variability in drug response across different patient populations is crucial for personalized medicine.</p>
                  `,
                },
              },
              {
                id: "item-2-1-2",
                title: "PK/PD Modeling Workshop",
                type: "video",
                duration: "35:15",
                content: {
                  videoUrl: "/pkpd-modeling.mp4",
                  transcript: "In this workshop, we'll explore PK/PD modeling...",
                  captions: true,
                  bookmarks: [
                    { time: "5:00", title: "One-compartment models" },
                    { time: "15:30", title: "Two-compartment models" },
                    { time: "25:45", title: "Non-linear kinetics" },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
    resources: [
      {
        id: "resource-1",
        title: "Clinical Pharmacy Guidelines",
        type: "link",
        url: "https://clinicalpharmacy.org/guidelines",
        description: "Professional guidelines and standards",
      },
      {
        id: "resource-2",
        title: "Drug Interaction Checker",
        type: "link",
        url: "https://druginteractions.com",
        description: "Comprehensive drug interaction database",
      },
      {
        id: "resource-3",
        title: "Course Calculations Workbook",
        type: "download",
        url: "/calculations-workbook.pdf",
        description: "Practice problems and solutions",
      },
    ],
  },
  {
    id: 2,
    title: "Pharmaceutical Chemistry Fundamentals",
    description: "Comprehensive introduction to pharmaceutical chemistry principles and drug development processes",
    instructor: "Prof. Michael Chen",
    duration: "10 weeks",
    modules: [
      {
        id: "module-1",
        title: "Chemical Structure and Drug Action",
        description: "Relationship between molecular structure and biological activity",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Structure-Activity Relationships",
            items: [
              {
                id: "item-1-1-1",
                title: "SAR Fundamentals",
                type: "video",
                duration: "28:20",
                content: {
                  videoUrl: "/sar-fundamentals.mp4",
                  transcript: "Structure-activity relationships form the foundation...",
                  captions: true,
                  bookmarks: [
                    { time: "4:15", title: "Molecular recognition" },
                    { time: "12:30", title: "Functional groups" },
                    { time: "20:45", title: "Stereochemistry effects" },
                  ],
                },
              },
              {
                id: "item-1-1-2",
                title: "Molecular Modeling Exercise",
                type: "assignment",
                content: {
                  instructions:
                    "Use ChemDraw to create 3D models of assigned drug molecules and analyze their structure-activity relationships.",
                  dueDate: "2025-02-15",
                  maxPoints: 20,
                  submissionTypes: ["file"],
                  rubric: [
                    { criteria: "Accurate molecular structures", points: 8 },
                    { criteria: "SAR analysis quality", points: 8 },
                    { criteria: "Use of modeling software", points: 4 },
                  ],
                },
              },
            ],
          },
          {
            id: "lesson-1-2",
            title: "Drug-Receptor Interactions",
            items: [
              {
                id: "item-1-2-1",
                title: "Receptor Theory and Binding",
                type: "text",
                content: {
                  html: `
                    <h2>Drug-Receptor Interactions</h2>
                    <p>Understanding how drugs interact with their molecular targets is fundamental to pharmaceutical chemistry.</p>
                    <h3>Types of Drug-Receptor Interactions:</h3>
                    <ul>
                      <li><strong>Covalent bonds:</strong> Irreversible, high affinity</li>
                      <li><strong>Ionic interactions:</strong> Strong, pH dependent</li>
                      <li><strong>Hydrogen bonds:</strong> Moderate strength, directional</li>
                      <li><strong>Van der Waals forces:</strong> Weak, distance dependent</li>
                    </ul>
                    <h3>Receptor Types:</h3>
                    <p>G-protein coupled receptors, ion channels, enzyme receptors, and nuclear receptors each have unique binding characteristics.</p>
                  `,
                },
              },
              {
                id: "item-1-2-2",
                title: "Binding Kinetics Simulation",
                type: "quiz",
                content: {
                  questions: [
                    {
                      id: "q1",
                      question: "Which type of bond is typically strongest in drug-receptor interactions?",
                      type: "multiple-choice",
                      options: ["Van der Waals forces", "Hydrogen bonds", "Covalent bonds", "Ionic interactions"],
                      correct: 2,
                    },
                    {
                      id: "q2",
                      question: "What factors affect drug-receptor binding affinity?",
                      type: "multiple-select",
                      options: ["Molecular complementarity", "Temperature", "pH", "Ionic strength", "All of the above"],
                      correct: [0, 1, 2, 3],
                    },
                  ],
                  timeLimit: 450,
                  passingScore: 75,
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "Drug Development and Synthesis",
        description: "Pharmaceutical synthesis and development processes",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Synthetic Strategies",
            items: [
              {
                id: "item-2-1-1",
                title: "Retrosynthetic Analysis",
                type: "video",
                duration: "31:45",
                content: {
                  videoUrl: "/retrosynthesis.mp4",
                  transcript: "Retrosynthetic analysis is a problem-solving technique...",
                  captions: true,
                  embeddedQuizzes: [
                    {
                      time: "18:30",
                      question: "What is the first step in retrosynthetic analysis?",
                      options: [
                        "Identify the target molecule",
                        "Choose starting materials",
                        "Plan reaction conditions",
                      ],
                      correct: 0,
                    },
                  ],
                },
              },
              {
                id: "item-2-1-2",
                title: "Laboratory Safety Protocol",
                type: "policy",
                content: {
                  title: "Chemical Laboratory Safety",
                  content: `
                    <h3>Laboratory Safety Requirements</h3>
                    <p>All students must comply with the following safety protocols:</p>
                    <ul>
                      <li>Wear appropriate personal protective equipment (PPE)</li>
                      <li>Follow proper chemical handling procedures</li>
                      <li>Report all accidents and incidents immediately</li>
                      <li>Complete safety training before lab access</li>
                    </ul>
                    <p><strong>Violation of safety protocols may result in immediate lab suspension.</strong></p>
                  `,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
    resources: [
      {
        id: "resource-1",
        title: "ChemDraw Software Guide",
        type: "pdf",
        url: "/chemdraw-guide.pdf",
        description: "Complete tutorial for molecular drawing software",
      },
      {
        id: "resource-2",
        title: "Reaction Database",
        type: "link",
        url: "https://reactiondatabase.org",
        description: "Comprehensive organic reaction database",
      },
      {
        id: "resource-3",
        title: "Synthesis Problem Sets",
        type: "download",
        url: "/synthesis-problems.zip",
        description: "Practice problems with detailed solutions",
      },
    ],
  },
  {
    id: 3,
    title: "Healthcare Ethics and Law",
    description: "Comprehensive examination of ethical principles and legal frameworks governing healthcare practice",
    instructor: "Dr. Emily Rodriguez",
    duration: "6 weeks",
    modules: [
      {
        id: "module-1",
        title: "Foundations of Healthcare Ethics",
        description: "Core ethical principles and theories in healthcare",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Ethical Principles in Healthcare",
            items: [
              {
                id: "item-1-1-1",
                title: "The Four Principles of Biomedical Ethics",
                type: "text",
                content: {
                  html: `
                    <h2>The Four Principles of Biomedical Ethics</h2>
                    <p>Beauchamp and Childress identified four fundamental principles that guide ethical decision-making in healthcare:</p>
                    <h3>1. Autonomy</h3>
                    <p>Respect for patient self-determination and the right to make informed decisions about their care.</p>
                    <h3>2. Beneficence</h3>
                    <p>The obligation to act in the patient's best interest and promote their well-being.</p>
                    <h3>3. Non-maleficence</h3>
                    <p>"First, do no harm" - the duty to avoid causing harm to patients.</p>
                    <h3>4. Justice</h3>
                    <p>Fair distribution of benefits, risks, and costs in healthcare delivery.</p>
                  `,
                },
              },
              {
                id: "item-1-1-2",
                title: "Ethical Decision-Making Framework",
                type: "video",
                duration: "24:15",
                content: {
                  videoUrl: "/ethical-framework.mp4",
                  transcript: "When faced with ethical dilemmas in healthcare...",
                  captions: true,
                  bookmarks: [
                    { time: "6:30", title: "Identifying ethical issues" },
                    { time: "12:45", title: "Stakeholder analysis" },
                    { time: "18:20", title: "Resolution strategies" },
                  ],
                },
              },
              {
                id: "item-1-1-3",
                title: "Ethics Case Analysis",
                type: "assignment",
                content: {
                  instructions:
                    "Analyze the provided ethical dilemma using the four principles framework. Present your analysis and recommended course of action.",
                  dueDate: "2025-01-25",
                  maxPoints: 30,
                  submissionTypes: ["text", "file"],
                  rubric: [
                    { criteria: "Application of ethical principles", points: 10 },
                    { criteria: "Analysis depth and clarity", points: 10 },
                    { criteria: "Practical recommendations", points: 7 },
                    { criteria: "Professional writing", points: 3 },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "module-2",
        title: "Legal Framework in Healthcare",
        description: "Understanding healthcare law and regulatory compliance",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Healthcare Regulation and Compliance",
            items: [
              {
                id: "item-2-1-1",
                title: "HIPAA and Patient Privacy",
                type: "video",
                duration: "19:30",
                content: {
                  videoUrl: "/hipaa-privacy.mp4",
                  transcript: "The Health Insurance Portability and Accountability Act...",
                  captions: true,
                  embeddedQuizzes: [
                    {
                      time: "10:15",
                      question: "What constitutes protected health information (PHI)?",
                      options: [
                        "Only medical records",
                        "Any individually identifiable health information",
                        "Only electronic health records",
                      ],
                      correct: 1,
                    },
                  ],
                },
              },
              {
                id: "item-2-1-2",
                title: "Compliance Assessment Quiz",
                type: "quiz",
                content: {
                  questions: [
                    {
                      id: "q1",
                      question: "Which of the following are covered entities under HIPAA?",
                      type: "multiple-select",
                      options: [
                        "Healthcare providers",
                        "Health plans",
                        "Healthcare clearinghouses",
                        "Business associates",
                        "All of the above",
                      ],
                      correct: [0, 1, 2],
                    },
                    {
                      id: "q2",
                      question: "What is the maximum penalty for willful HIPAA violations?",
                      type: "multiple-choice",
                      options: ["$100,000", "$250,000", "$1.5 million", "$50,000"],
                      correct: 2,
                    },
                  ],
                  timeLimit: 300,
                  passingScore: 85,
                },
              },
            ],
          },
        ],
      },
    ],
    resources: [
      {
        id: "resource-1",
        title: "Healthcare Ethics Journal",
        type: "link",
        url: "https://healthcareethics.org",
        description: "Current research and case studies in healthcare ethics",
      },
      {
        id: "resource-2",
        title: "Legal Reference Guide",
        type: "pdf",
        url: "/healthcare-law-reference.pdf",
        description: "Comprehensive guide to healthcare law and regulations",
      },
      {
        id: "resource-3",
        title: "Ethics Discussion Forum",
        type: "link",
        url: "/ethics-forum",
        description: "Interactive discussions on current ethical issues",
      },
    ],
  },
]

export default coursesData
