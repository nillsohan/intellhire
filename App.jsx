import React, { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, BookOpen, Bot, BriefcaseBusiness,
  CheckCircle2, ChevronDown, Circle, Clock3, FileText, GraduationCap,
  LayoutDashboard, MapPin, Menu, Plus, Search, Settings, SlidersHorizontal,
  Sparkles, Target, TrendingUp, Upload, UserRound, X, Zap, Brain
} from "lucide-react";
import "./styles.css";

const NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "AI Career Twin", icon: Brain },
  { label: "AI Interviewer", icon: Bot },
  { label: "Resume Analyzer", icon: FileText },
  { label: "Job Matches", icon: BriefcaseBusiness },
  { label: "Skill Gap", icon: Target },
  { label: "Mock Interview", icon: BookOpen }
];

const JOBS = [
  { role: "Frontend Developer Intern", company: "PixelCraft", place: "Kolkata, India", type: "Internship", match: 94, skills: ["React", "JavaScript", "CSS"] },
  { role: "Junior React Developer", company: "WebNest", place: "Remote", type: "Full-time", match: 89, skills: ["React", "REST API", "Git"] },
  { role: "Graduate Software Trainee", company: "TechNova", place: "Kolkata, India", type: "Full-time", match: 86, skills: ["Python", "SQL", "Problem solving"] },
  { role: "UI Developer Intern", company: "BrightLabs", place: "Hybrid", type: "Internship", match: 82, skills: ["HTML", "CSS", "JavaScript"] }
];

const SKILLS = [
  { name: "HTML & CSS", level: 88, status: "Strong" },
  { name: "JavaScript", level: 76, status: "Developing" },
  { name: "React", level: 70, status: "Developing" },
  { name: "Python", level: 66, status: "Developing" },
  { name: "SQL & DBMS", level: 72, status: "Developing" },
  { name: "Data Structures", level: 48, status: "Needs practice" }
];

const INTERVIEW_QUESTIONS = [
  { q: "Tell me about yourself and the kind of role you are looking for.", tip: "Give a concise introduction, mention your education, strongest relevant skills, one project, and the role you want." },
  { q: "Explain a project you have built. What problem did it solve?", tip: "Cover the problem, your role, technology choices, one challenge, and the result. Be specific about what you personally implemented." },
  { q: "What is the difference between let, const, and var in JavaScript?", tip: "Explain scope, reassignment, redeclaration, and why let/const are generally preferred in modern JavaScript." },
  { q: "How would you debug a page that is not rendering correctly?", tip: "Describe reproducing the issue, reading console errors, inspecting the DOM and network requests, isolating the component, and testing the fix." },
  { q: "Why should we select you for this position?", tip: "Connect your relevant skills, learning ability, project experience, communication, and motivation to the requirements of the role." }
];

function StatCard({ label, value, note, icon: Icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon"><Icon size={18} /></div>
      <span>{label}</span>
      <b>{value}</b>
      <small>{note}</small>
    </article>
  );
}

function ProgressBar({ value }) {
  return <div className="progress"><i style={{ width: `${value}%` }} /></div>;
}

const ROLE_SKILLS = {
  frontend: ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive Design", "REST API"],
  backend: ["JavaScript", "Node.js", "Express", "REST API", "SQL", "MongoDB", "Git"],
  "full stack": ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Git"],
  "data analyst": ["Excel", "SQL", "Python", "Statistics", "Power BI", "Data Visualization"],
  python: ["Python", "OOP", "SQL", "Git", "REST API", "Data Structures"],
  devops: ["Linux", "Git", "Networking", "Docker", "CI/CD", "Cloud", "Shell Scripting"]
};

function buildCareerPlan({ role, education, graduationYear, goal, skills, weeklyHours }) {
  const roleText = role.toLowerCase();
  const matchedRole = Object.keys(ROLE_SKILLS).find((key) => roleText.includes(key));
  const requiredSkills = ROLE_SKILLS[matchedRole || "frontend"];
  const normalizedSkills = skills
    .split(",")
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);

  const matchedSkills = requiredSkills.filter((skill) =>
    normalizedSkills.some((userSkill) =>
      userSkill === skill.toLowerCase() ||
      userSkill.includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill)
    )
  );

  const missingSkills = requiredSkills.filter((skill) => !matchedSkills.includes(skill));

  const readiness = Math.min(
    95,
    Math.max(
      20,
      Math.round(
        (matchedSkills.length / requiredSkills.length) * 75 +
        Math.min(normalizedSkills.length, 6) * 3
      )
    )
  );

  const hours = Math.max(1, Number(weeklyHours) || 1);

  let projects = [
    { title: "Build a role-focused portfolio", detail: "Create a responsive portfolio with an about section, projects, skills and contact form." },
    { title: "Build a practical CRUD application", detail: "Create an app that solves a small real-world problem and document its features on GitHub." }
  ];

  if (roleText.includes("frontend") || roleText.includes("react")) {
    projects = [
      { title: "Job application tracker", detail: "Build a React app to save job roles, track application status and filter opportunities." },
      { title: "Responsive product dashboard", detail: "Create a polished dashboard with reusable components, charts, search and mobile-friendly layouts." }
    ];
  } else if (roleText.includes("backend") || roleText.includes("full stack")) {
    projects = [
      { title: "Student placement portal", detail: "Build authentication, student profiles, job listings and application APIs." },
      { title: "Task management REST API", detail: "Create CRUD endpoints with validation, authentication and database integration." }
    ];
  } else if (roleText.includes("data")) {
    projects = [
      { title: "Placement trends analysis", detail: "Clean a dataset, explore hiring trends with Python/SQL and present useful charts." },
      { title: "Student performance dashboard", detail: "Use sample academic data to create an interactive dashboard and explain key findings." }
    ];
  } else if (roleText.includes("devops")) {
    projects = [
      { title: "Deploy a containerized web app", detail: "Containerize a small app with Docker and document the deployment workflow." },
      { title: "CI/CD pipeline demo", detail: "Create a Git-based workflow that runs checks and builds your application automatically." }
    ];
  }

  const firstMissing = missingSkills.slice(0, 3);

  const roadmap = [
    {
      period: "Weeks 1–2",
      title: "Close the most important skill gaps",
      detail: firstMissing.length
        ? `Start with ${firstMissing.join(", ")}. Learn the fundamentals and complete one small exercise for each.`
        : "Revise your strongest skills and practice core concepts with short coding exercises."
    },
    {
      period: "Weeks 3–4",
      title: "Build proof of your skills",
      detail: `Start this project: ${projects[0].title}. Push clean, well-documented code to GitHub.`
    },
    {
      period: "Weeks 5–6",
      title: "Prepare for recruitment",
      detail: "Practice role-specific interview questions, revise CS fundamentals and prepare a clear explanation of your projects."
    },
    {
      period: "Weeks 7–8",
      title: "Apply and improve",
      detail: "Tailor your resume for each role, apply consistently, track applications and improve based on interview feedback."
    }
  ];

  return {
    readiness,
    requiredSkills,
    matchedSkills,
    missingSkills,
    projects,
    roadmap,
    weeklyHours: hours,
    education,
    graduationYear,
    goal: goal.trim() || `Prepare for an entry-level ${role} opportunity`
  };
}

function App() {
  const [active, setActive] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [careerRole, setCareerRole] = useState("Frontend Developer");
  const [careerEducation, setCareerEducation] = useState("BCA");
  const [careerGradYear, setCareerGradYear] = useState("2027");
  const [careerGoal, setCareerGoal] = useState("Get placement in an entry-level role");
  const [careerSkills, setCareerSkills] = useState("HTML, CSS, JavaScript, React, Python, SQL");
  const [weeklyHours, setWeeklyHours] = useState("8");
  const [twinPlan, setTwinPlan] = useState(null);

  const [aiQuestionIndex, setAiQuestionIndex] = useState(0);
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const [resumeName, setResumeName] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return JOBS;

    return JOBS.filter((job) =>
      [job.role, job.company, job.place, job.type, ...job.skills]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  const chooseFile = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setResumeName(file.name);
      setAnalyzed(false);
    }
  };

  const reviewAiAnswer = () => {
    const words = aiAnswer.trim().split(/\s+/).filter(Boolean).length;

    if (words < 20) {
      setAiFeedback("Your answer is a good starting point. Add more detail: explain the context, what you did, and the outcome.");
    } else {
      setAiFeedback("Good practice response. Make it even stronger by adding one specific example, explaining your individual contribution, and ending with a clear result.");
    }
  };

  const renderContent = () => {
    if (active === "AI Career Twin") {
      const generateTwin = () => {
        setTwinPlan(buildCareerPlan({
          role: careerRole,
          education: careerEducation,
          graduationYear: careerGradYear,
          goal: careerGoal,
          skills: careerSkills,
          weeklyHours
        }));
      };

      return (
        <section className="career-twin-grid">
          <div className="panel twin-form">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR PERSONAL CAREER COPILOT</p>
                <h2>Build your Career Twin</h2>
                <p className="muted">Tell IntelliHire where you are today and what role you want next.</p>
              </div>
              <span className="icon-bubble"><Brain size={20} /></span>
            </div>

            <label className="field-label" htmlFor="career-education">Current education</label>
            <input
              id="career-education"
              className="form-input"
              value={careerEducation}
              onChange={(e) => setCareerEducation(e.target.value)}
              placeholder="e.g. BCA, B.Tech, B.Sc"
            />

            <label className="field-label" htmlFor="career-year">Graduation year</label>
            <input
              id="career-year"
              className="form-input"
              value={careerGradYear}
              onChange={(e) => setCareerGradYear(e.target.value)}
              placeholder="e.g. 2027"
            />

            <label className="field-label" htmlFor="career-role">Target role</label>
            <input
              id="career-role"
              className="form-input"
              value={careerRole}
              onChange={(e) => {
                setCareerRole(e.target.value);
                setTwinPlan(null);
              }}
              placeholder="e.g. Frontend Developer"
            />

            <label className="field-label" htmlFor="career-goal">Career goal</label>
            <textarea
              id="career-goal"
              className="form-input"
              rows={2}
              value={careerGoal}
              onChange={(e) => {
                setCareerGoal(e.target.value);
                setTwinPlan(null);
              }}
              placeholder="e.g. Get placed in a product company"
            />

            <label className="field-label" htmlFor="career-skills">Current skills</label>
            <textarea
              id="career-skills"
              className="form-input"
              rows={3}
              value={careerSkills}
              onChange={(e) => {
                setCareerSkills(e.target.value);
                setTwinPlan(null);
              }}
              placeholder="Separate skills with commas: HTML, CSS, JavaScript"
            />

            <label className="field-label" htmlFor="career-hours">Hours you can study per week</label>
            <select
              id="career-hours"
              className="form-input"
              value={weeklyHours}
              onChange={(e) => {
                setWeeklyHours(e.target.value);
                setTwinPlan(null);
              }}
            >
              <option value="3">3 hours</option>
              <option value="5">5 hours</option>
              <option value="8">8 hours</option>
              <option value="10">10 hours</option>
              <option value="15">15 hours</option>
              <option value="20">20 hours</option>
            </select>

            <button
              className="button button-primary full"
              onClick={generateTwin}
              disabled={!careerRole.trim() || !careerSkills.trim()}
            >
              <Sparkles size={16} /> Generate my career plan
            </button>

            <p className="tiny muted">
              This first version uses a local recommendation engine. We will connect a real AI model after the backend is ready.
            </p>
          </div>

          <div className="panel twin-result">
            {!twinPlan ? (
              <>
                <p className="eyebrow">CAREER TWIN WORKSPACE</p>
                <h2>Your next chapter starts here</h2>

                <div className="twin-empty">
                  <div className="twin-orb"><Brain size={30} /></div>
                  <p className="muted">
                    Complete your profile and generate a career plan. Your readiness, skill gaps, project ideas and placement roadmap will appear here.
                  </p>
                </div>

                <div className="twin-step">
                  <b>What you will get</b>
                  <p>A role-based skill assessment, focused projects and an actionable 8-week preparation plan.</p>
                </div>
              </>
            ) : (
              <>
                <p className="eyebrow">YOUR PERSONALIZED CAREER SNAPSHOT</p>
                <h2>{careerRole}</h2>
                <p className="muted">
                  {twinPlan.education} · Graduation {twinPlan.graduationYear} · {twinPlan.weeklyHours} study hours/week
                </p>

                <div className="twin-highlight">
                  <span>CAREER READINESS ESTIMATE</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "8px" }}>
                    <b style={{ fontSize: "2.2rem" }}>{twinPlan.readiness}%</b>
                    <span className="muted">prototype estimate</span>
                  </div>
                  <ProgressBar value={twinPlan.readiness} />
                  <p>{twinPlan.goal}</p>
                </div>

                <h3 className="subheading">Your skill match</h3>
                <p className="muted">
                  Skills matched: {twinPlan.matchedSkills.length} of {twinPlan.requiredSkills.length} role-relevant skills.
                </p>

                <div className="tags twin-tags">
                  {twinPlan.matchedSkills.length > 0
                    ? twinPlan.matchedSkills.map((skill) => <span key={skill}>{skill}</span>)
                    : <span>Keep building your core skills</span>}
                </div>

                <h3 className="subheading">Priority skill gaps</h3>
                <div className="tags twin-tags">
                  {twinPlan.missingSkills.length > 0
                    ? twinPlan.missingSkills.map((skill) => <span className="gap-tag" key={skill}>{skill}</span>)
                    : <span className="success-tag">No priority gaps in this starter skill map</span>}
                </div>

                <h3 className="subheading">Project recommendations</h3>
                {twinPlan.projects.map((project, index) => (
                  <div className="twin-step" key={project.title}>
                    <b>0{index + 1} · {project.title}</b>
                    <p>{project.detail}</p>
                  </div>
                ))}

                <h3 className="subheading">Your 8-week placement roadmap</h3>
                {twinPlan.roadmap.map((step) => (
                  <div className="twin-step roadmap-step" key={step.period}>
                    <span className="eyebrow">{step.period}</span>
                    <b>{step.title}</b>
                    <p>{step.detail}</p>
                  </div>
                ))}

                <div className="notice">
                  <Target size={18} />
                  <div>
                    <b>Placement strategy</b>
                    <p>
                      Keep one resume version tailored to {careerRole}, maintain a project portfolio, practice aptitude and technical questions, and track every application. Treat this snapshot as guidance, not a hiring prediction.
                    </p>
                  </div>
                </div>

                <p className="tiny muted">
                  Prototype output generated from your inputs and a starter role-skill map. It is not yet powered by a live AI model.
                </p>
              </>
            )}
          </div>
        </section>
      );
    }

    if (active === "AI Interviewer") {
      const currentQuestion = INTERVIEW_QUESTIONS[aiQuestionIndex];

      return (
        <section className="panel ai-interviewer">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI-POWERED PRACTICE EXPERIENCE</p>
              <h2>Meet your AI Interviewer</h2>
              <p className="muted">Answer one question at a time and receive structured practice guidance.</p>
            </div>
            <span className="icon-bubble"><Bot size={20} /></span>
          </div>

          <div className="interviewer-banner">
            <div className="bot-avatar"><Bot size={25} /></div>
            <div>
              <b>IntelliHire Interview Coach</b>
              <p>Frontend / Full-stack · Entry-level · Practice round</p>
            </div>
            <span className="live-dot">DEMO</span>
          </div>

          <div className="question-count">
            QUESTION {aiQuestionIndex + 1} OF {INTERVIEW_QUESTIONS.length}
          </div>

          <h3 className="question">{currentQuestion.q}</h3>

          <textarea
            className="ai-answer"
            value={aiAnswer}
            onChange={(e) => {
              setAiAnswer(e.target.value);
              setAiFeedback("");
            }}
            placeholder="Write your answer in your own words..."
            rows={7}
          />

          <div className="interview-actions">
            <button
              className="button button-light"
              onClick={() => {
                setAiQuestionIndex((aiQuestionIndex + INTERVIEW_QUESTIONS.length - 1) % INTERVIEW_QUESTIONS.length);
                setAiAnswer("");
                setAiFeedback("");
              }}
            >
              Previous
            </button>

            <button
              className="button button-primary"
              disabled={!aiAnswer.trim()}
              onClick={reviewAiAnswer}
            >
              <Sparkles size={15} /> Review my answer
            </button>

            <button
              className="button button-dark"
              onClick={() => {
                setAiQuestionIndex((aiQuestionIndex + 1) % INTERVIEW_QUESTIONS.length);
                setAiAnswer("");
                setAiFeedback("");
              }}
            >
              Next question <ArrowUpRight size={15} />
            </button>
          </div>

          {aiFeedback && (
            <div className="notice ai-feedback">
              <Sparkles size={18} />
              <div><b>Practice feedback</b><p>{aiFeedback}</p></div>
            </div>
          )}

          <p className="tiny muted ai-disclaimer">
            Prototype mode: this demo gives basic structure guidance, not genuine AI semantic evaluation.
          </p>
        </section>
      );
    }
        if (active === "Resume Analyzer") {
      return (
        <section className="page-grid">
          <div className="panel upload-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">PROFILE REVIEW</p>
                <h2>Resume Analyzer</h2>
                <p className="muted">Upload your resume to see a sample analysis.</p>
              </div>
              <span className="icon-bubble"><FileText size={20} /></span>
            </div>

            <label className="dropzone">
              <input type="file" accept=".pdf,.doc,.docx" onChange={chooseFile} />
              <span className="upload-icon"><Upload size={24} /></span>
              <strong>{resumeName || "Drop your resume here"}</strong>
              <span className="muted">PDF or DOCX · Choose a file to get started</span>
              <span className="button button-dark">Choose file</span>
            </label>

            <button
              className="button button-primary full"
              disabled={!resumeName}
              onClick={() => setAnalyzed(true)}
            >
              <Sparkles size={16} /> Analyze resume
            </button>

            {analyzed && (
              <div className="notice success">
                <CheckCircle2 size={18} />
                <div>
                  <b>Demo analysis complete</b>
                  <p>This is sample UI data. Connect a backend and AI service to analyze the uploaded document for real.</p>
                </div>
              </div>
            )}
          </div>

          <div className="panel">
            <p className="eyebrow">SAMPLE RESULT</p>
            <h2>Resume health</h2>
            <div className="score-ring">
              <div><b>{analyzed ? "78" : "—"}</b><span>/ 100</span></div>
            </div>
            <div className="result-row"><span>Skills detected</span><b>{analyzed ? "8" : "Awaiting upload"}</b></div>
            <div className="result-row"><span>Experience signals</span><b>{analyzed ? "Good" : "—"}</b></div>
            <div className="result-row"><span>ATS readability</span><b>{analyzed ? "Good" : "—"}</b></div>
            <p className="tiny muted">Demo values are illustrative and are not generated from your file.</p>
          </div>
        </section>
      );
    }

    if (active === "Job Matches") {
      return (
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OPPORTUNITIES</p>
              <h2>Recommended jobs</h2>
              <p className="muted">Roles ranked using a sample skill-match score.</p>
            </div>
            <button className="button button-light" onClick={() => setSearch("")}>
              <SlidersHorizontal size={16} /> Clear search
            </button>
          </div>

          <div className="searchbox">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, companies or skills"
            />
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job.role}>
                <div className="company-mark">{job.company[0]}</div>
                <div className="job-main">
                  <h3>{job.role}</h3>
                  <p>{job.company}</p>
                  <div className="job-meta">
                    <span><MapPin size={13} />{job.place}</span>
                    <span><BriefcaseBusiness size={13} />{job.type}</span>
                  </div>
                  <div className="tags">
                    {job.skills.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </div>
                <div className="match"><b>{job.match}%</b><span>match</span></div>
                <button
                  className="icon-button"
                  aria-label={`View ${job.role}`}
                  onClick={() => window.alert(`${job.role} at ${job.company} is sample demonstration data.`)}
                >
                  <ArrowUpRight size={18} />
                </button>
              </article>
            ))}

            {filteredJobs.length === 0 && (
              <p className="muted empty">No matching sample jobs. Try another search.</p>
            )}
          </div>

          <p className="tiny muted">These are sample opportunities, not live vacancies.</p>
        </section>
      );
    }

    if (active === "Skill Gap") {
      return (
        <section className="page-grid">
          <div className="panel">
            <p className="eyebrow">YOUR PROFILE</p>
            <h2>Skill strengths</h2>
            <p className="muted">Illustrative profile based on sample data.</p>

            {SKILLS.map((skill) => (
              <div className="skill-line" key={skill.name}>
                <div className="skill-top">
                  <b>{skill.name}</b>
                  <span>{skill.status} · {skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} />
              </div>
            ))}
          </div>

          <div className="panel">
            <p className="eyebrow">NEXT BEST ACTIONS</p>
            <h2>Close your skill gaps</h2>

            <div className="todo">
              <Circle size={18} />
              <div>
                <b>Build a REST API with Node.js</b>
                <p>Practice CRUD, validation and error handling.</p>
                <span className="tiny muted">Estimated: 4–6 hours</span>
              </div>
            </div>

            <div className="todo">
              <Circle size={18} />
              <div>
                <b>Revise SQL joins and subqueries</b>
                <p>Write queries using sample business data.</p>
                <span className="tiny muted">Estimated: 3 hours</span>
              </div>
            </div>

            <div className="todo">
              <Circle size={18} />
              <div>
                <b>Deploy a React application</b>
                <p>Publish a project and document the process.</p>
                <span className="tiny muted">Estimated: 2 hours</span>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (active === "Mock Interview") {
      const currentQuestion = INTERVIEW_QUESTIONS[questionIndex];

      return (
        <section className="panel interview-panel">
          <p className="eyebrow">PRACTICE ROOM</p>
          <h2>Mock interview</h2>
          <p className="muted">Practice one question at a time. This starter version does not grade answers with AI yet.</p>

          <div className="question-count">
            QUESTION {questionIndex + 1} OF {INTERVIEW_QUESTIONS.length}
          </div>

          <h3 className="question">{currentQuestion.q}</h3>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            rows={6}
          />

          <div className="interview-actions">
            <button
              className="button button-light"
              onClick={() => {
                setQuestionIndex((questionIndex + INTERVIEW_QUESTIONS.length - 1) % INTERVIEW_QUESTIONS.length);
                setAnswer("");
                setShowAnswer(false);
              }}
            >
              Previous
            </button>

            <button className="button button-primary" onClick={() => setShowAnswer(true)}>
              Show guidance
            </button>

            <button
              className="button button-dark"
              onClick={() => {
                setQuestionIndex((questionIndex + 1) % INTERVIEW_QUESTIONS.length);
                setAnswer("");
                setShowAnswer(false);
              }}
            >
              Next question <ArrowUpRight size={15} />
            </button>
          </div>

          {showAnswer && (
            <div className="notice">
              <Sparkles size={18} />
              <div>
                <b>What a strong answer should cover</b>
                <p>{currentQuestion.tip}</p>
              </div>
            </div>
          )}
        </section>
      );
    }
        return (
      <div className="dashboard">
        <section className="welcome-card">
          <div>
            <span className="welcome-pill"><Sparkles size={13} /> YOUR CAREER, IN FOCUS</span>
            <h2>Build your next<br /><em>career move.</em></h2>
            <p>Understand your strengths, discover relevant roles, and prepare with purpose.</p>
            <button className="button button-white" onClick={() => setActive("Resume Analyzer")}>
              Analyze my resume <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="welcome-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-card">
              <div className="art-card-top"><span /><span /><span /></div>
              <div className="art-avatar">S</div>
              <div className="art-lines"><i /><i /><i /></div>
              <div className="art-score">
                <TrendingUp size={16} />
                <b>+24%</b>
                <small>profile growth</small>
              </div>
            </div>
            <div className="sparkle s1">✦</div>
            <div className="sparkle s2">✧</div>
          </div>
        </section>

        <section className="stats-grid">
          <StatCard label="Profile score" value="78/100" note="+8 this month" icon={Target} />
          <StatCard label="Job matches" value="24" note="5 new this week" icon={BriefcaseBusiness} />
          <StatCard label="Skills tracked" value="12" note="4 in progress" icon={Zap} />
          <StatCard label="Practice time" value="6.5 hrs" note="This month" icon={Clock3} />
        </section>

        <section className="main-grid">
          <div className="panel chart-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR PROGRESS</p>
                <h3>Career readiness</h3>
              </div>
              <span className="period">Last 7 weeks <ChevronDown size={14} /></span>
            </div>

            <div className="chart-wrap">
              <svg
                viewBox="0 0 600 220"
                role="img"
                aria-label="Sample career readiness progress chart"
                preserveAspectRatio="none"
              >
                {[35, 75, 115, 155, 195].map((y) => (
                  <line key={y} x1="35" y1={y} x2="590" y2={y} stroke="#edf0f5" strokeDasharray="4 5" />
                ))}

                <path
                  d="M35 175 L125 155 L215 145 L305 115 L395 125 L485 75 L585 48 L585 195 L35 195 Z"
                  fill="rgba(105,121,237,0.12)"
                />

                <polyline
                  points="35,175 125,155 215,145 305,115 395,125 485,75 585,48"
                  fill="none"
                  stroke="#6979ed"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {[[35,175],[125,155],[215,145],[305,115],[395,125],[485,75],[585,48]].map(([x,y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#6979ed" />
                ))}

                {["W1","W2","W3","W4","W5","W6","W7"].map((week,i) => (
                  <text key={week} x={35+i*91.5} y="215" fontSize="11" fill="#98a1b2" textAnchor="middle">
                    {week}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div className="panel skills-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">DEVELOPMENT</p>
                <h3>Top skills</h3>
              </div>
              <button className="text-button" onClick={() => setActive("Skill Gap")}>
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            {SKILLS.slice(0, 3).map((skill) => (
              <div className="skill-line" key={skill.name}>
                <div className="skill-top">
                  <b>{skill.name}</b>
                  <span>{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel recommended">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HAND-PICKED FOR YOU</p>
              <h3>Recommended opportunities</h3>
            </div>
            <button className="text-button" onClick={() => setActive("Job Matches")}>
              Explore jobs <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="mini-jobs">
            {JOBS.slice(0, 2).map((job) => (
              <div className="mini-job" key={job.role}>
                <div className="company-mark">{job.company[0]}</div>
                <div>
                  <b>{job.role}</b>
                  <p>{job.company} · {job.place}</p>
                </div>
                <strong>{job.match}%</strong>
              </div>
            ))}
          </div>
        </section>

        <p className="demo-disclaimer">
          Demo dashboard · Metrics and opportunities are sample data, not live recruitment information.
        </p>
      </div>
    );
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Sparkles size={19} /></div>
          <span>intelli<span>hire</span><small>CAREER INTELLIGENCE</small></span>
          <button className="close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`nav-item ${active === item.label ? "active" : ""}`}
                onClick={() => {
                  setActive(item.label);
                  setMobileOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === "Job Matches" && <i className="nav-count">5</i>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><GraduationCap size={18} /></div>
            <b>Ready for your next step?</b>
            <p>Keep building skills that move your career forward.</p>
            <button onClick={() => setActive("Skill Gap")}>
              View learning plan <ArrowUpRight size={14} />
            </button>
          </div>

          <button
            className="nav-item"
            onClick={() => window.alert("Settings will be available in a future version.")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="user-card">
            <div className="avatar">SB</div>
            <div><b>Sohan Bera</b><small>Student account</small></div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="backdrop" onClick={() => setMobileOpen(false)} />}

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu />
          </button>

          <div className="breadcrumb">
            Workspace <span>/</span> <b>{active}</b>
          </div>

          <div className="top-actions">
            <div className="top-search">
              <Search size={16} />
              <input
                placeholder="Search anything..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="notification"
              aria-label="Notifications"
              onClick={() => window.alert("You are all caught up.")}
            >
              <Bell size={18} /><i />
            </button>

            <div className="top-avatar">SB</div>
          </div>
        </header>

        <div className="page-content">
          <div className="page-title">
            <div>
              <p className="eyebrow">YOUR WORKSPACE</p>
              <h1>{active === "Overview" ? "Good evening, Sohan" : active}</h1>
              <p className="muted">
                {active === "Overview"
                  ? "Here's your career development snapshot."
                  : "Your career development workspace."}
              </p>
            </div>

            {active === "Overview" && (
              <button className="button button-light" onClick={() => setActive("Resume Analyzer")}>
                <Plus size={16} /> Add resume
              </button>
            )}
          </div>

          {renderContent()}
        </div>

        <footer>
          © 2026 IntelliHire <span>Built to make career growth clearer.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;