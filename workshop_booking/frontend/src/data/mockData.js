// Mock data matching the Django models exactly

export const WORKSHOP_TYPES = [
  {
    id: 1,
    name: "Python for Scientific Computing",
    description:
      "An intensive workshop covering NumPy, SciPy, Matplotlib, and Pandas for scientific data analysis. Participants will work on real-world datasets and learn to build reproducible research pipelines.",
    duration: 2,
    terms_and_conditions:
      "Participants must bring their own laptops. Python 3.8+ must be installed beforehand. Attendance on both days is mandatory for certification.",
  },
  {
    id: 2,
    name: "SCILAB Fundamentals",
    description:
      "Introduction to SCILAB — a free alternative to MATLAB. Covers matrix operations, control flow, plotting, and basic simulations for engineering students.",
    duration: 1,
    terms_and_conditions:
      "Participants must have SCILAB installed before the workshop. A minimum of 30 and maximum of 60 participants allowed.",
  },
  {
    id: 3,
    name: "OpenFOAM for CFD",
    description:
      "Hands-on workshop on Computational Fluid Dynamics using OpenFOAM. Topics include mesh generation, boundary conditions, solvers, and post-processing with ParaView.",
    duration: 3,
    terms_and_conditions:
      "Participants need a basic understanding of fluid mechanics. Linux environment required. Virtual machines provided on request.",
  },
  {
    id: 4,
    name: "R for Statistics",
    description:
      "Workshop focused on statistical computing with R. Covers data frames, ggplot2, hypothesis testing, regression models, and machine learning basics.",
    duration: 2,
    terms_and_conditions:
      "R and RStudio must be installed. Basic statistics knowledge recommended.",
  },
  {
    id: 5,
    name: "eSim for Circuit Simulation",
    description:
      "Learn to design and simulate electronic circuits using eSim — an open-source EDA tool. Covers schematic design, SPICE simulation, and PCB layout basics.",
    duration: 1,
    terms_and_conditions:
      "eSim software must be installed prior to workshop. Laptop with 4GB RAM minimum.",
  },
  {
    id: 6,
    name: "DWSIM for Chemical Process Simulation",
    description:
      "Introduction to DWSIM, an open-source chemical process simulator. Covers steady-state simulation, thermodynamic packages, and process units for chemical engineering students.",
    duration: 2,
    terms_and_conditions:
      "Basic chemical engineering knowledge required. DWSIM must be installed.",
  },
];

export const WORKSHOPS = [
  {
    id: 1,
    uid: "abc-123",
    workshop_type: WORKSHOP_TYPES[0],
    date: "2026-05-15",
    status: 1,
    coordinator: { id: 2, name: "Priya Sharma", email: "priya@college.edu" },
    instructor: { id: 3, name: "Dr. Arun Kumar", email: "arun@fossee.in" },
    tnc_accepted: true,
  },
  {
    id: 2,
    uid: "def-456",
    workshop_type: WORKSHOP_TYPES[1],
    date: "2026-06-10",
    status: 0,
    coordinator: { id: 2, name: "Priya Sharma", email: "priya@college.edu" },
    instructor: null,
    tnc_accepted: true,
  },
  {
    id: 3,
    uid: "ghi-789",
    workshop_type: WORKSHOP_TYPES[2],
    date: "2026-07-05",
    status: 0,
    coordinator: { id: 4, name: "Rahul Gupta", email: "rahul@iit.ac.in" },
    instructor: null,
    tnc_accepted: true,
  },
  {
    id: 4,
    uid: "jkl-012",
    workshop_type: WORKSHOP_TYPES[3],
    date: "2026-04-28",
    status: 1,
    coordinator: { id: 5, name: "Sneha Patel", email: "sneha@vnit.ac.in" },
    instructor: { id: 3, name: "Dr. Arun Kumar", email: "arun@fossee.in" },
    tnc_accepted: true,
  },
  {
    id: 5,
    uid: "mno-345",
    workshop_type: WORKSHOP_TYPES[4],
    date: "2026-05-22",
    status: 2,
    coordinator: { id: 2, name: "Priya Sharma", email: "priya@college.edu" },
    instructor: null,
    tnc_accepted: true,
  },
];

export const COMMENTS = [
  {
    id: 1,
    author: "Dr. Arun Kumar",
    comment:
      "Please ensure participants complete the pre-workshop survey before arriving.",
    public: true,
    created_date: "2026-04-10T09:30:00Z",
    workshop_id: 1,
  },
  {
    id: 2,
    author: "Priya Sharma",
    comment: "We have 42 participants confirmed. Projector and LAN available.",
    public: true,
    created_date: "2026-04-11T11:00:00Z",
    workshop_id: 1,
  },
];

export const CURRENT_USER = {
  id: 2,
  username: "priya.sharma",
  first_name: "Priya",
  last_name: "Sharma",
  email: "priya@college.edu",
  is_instructor: false,
  profile: {
    title: "Prof.",
    institute: "Veermata Jijabai Technological Institute",
    department: "computer engineering",
    phone_number: "9876543210",
    position: "coordinator",
    how_did_you_hear_about_us: "FOSSEE website",
    location: "Mumbai",
    state: "IN-MH",
    is_email_verified: true,
  },
};

export const INSTRUCTOR_USER = {
  id: 3,
  username: "arun.kumar",
  first_name: "Arun",
  last_name: "Kumar",
  email: "arun@fossee.in",
  is_instructor: true,
  profile: {
    title: "Dr.",
    institute: "IIT Bombay",
    department: "computer engineering",
    phone_number: "9123456780",
    position: "instructor",
    how_did_you_hear_about_us: "FOSSEE website",
    location: "Mumbai",
    state: "IN-MH",
    is_email_verified: true,
  },
};

export const DEPARTMENT_LABELS = {
  "computer engineering": "Computer Science",
  "information technology": "Information Technology",
  "civil engineering": "Civil Engineering",
  "electrical engineering": "Electrical Engineering",
  "mechanical engineering": "Mechanical Engineering",
  "chemical engineering": "Chemical Engineering",
  "aerospace engineering": "Aerospace Engineering",
  "biosciences and bioengineering": "Biosciences and BioEngineering",
  electronics: "Electronics",
  "energy science and engineering": "Energy Science and Engineering",
};

export const STATES = [
  { code: "IN-AP", name: "Andhra Pradesh" },
  { code: "IN-MH", name: "Maharashtra" },
  { code: "IN-KA", name: "Karnataka" },
  { code: "IN-TN", name: "Tamil Nadu" },
  { code: "IN-GJ", name: "Gujarat" },
  { code: "IN-RJ", name: "Rajasthan" },
  { code: "IN-DL", name: "Delhi" },
  { code: "IN-UP", name: "Uttar Pradesh" },
  { code: "IN-WB", name: "West Bengal" },
  { code: "IN-TG", name: "Telangana" },
  { code: "IN-KL", name: "Kerala" },
  { code: "IN-MP", name: "Madhya Pradesh" },
  { code: "IN-PB", name: "Punjab" },
  { code: "IN-HR", name: "Haryana" },
  { code: "IN-BR", name: "Bihar" },
];
