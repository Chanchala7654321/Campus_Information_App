import { useState } from "react";
import { FaChevronDown, FaSearch, FaQuestionCircle, FaLightbulb, FaShieldAlt, FaRocket } from "react-icons/fa";
import "../styles/FAQ.css";

const faqData = [
  {
    category: "General",
    icon: <FaQuestionCircle />,
    questions: [
      {
        q: "What is the Campus Information System?",
        a: "It's a centralized platform designed to provide comprehensive data about all our campuses, schools, and student achievements in one place."
      },
      {
        q: "Do I need an account to browse campuses?",
        a: "No, anyone can browse campuses, schools, and the gallery. However, an account is required to access the personal dashboard and admin features."
      }
    ]
  },
  {
    category: "Admissions",
    icon: <FaRocket />,
    questions: [
      {
        q: "How do I apply for a course?",
        a: "Visit the 'Schools' page, select your desired school, and click on the 'Admission Info' or contact the school directly through the provided details."
      },
      {
        q: "What documents are required for registration?",
        a: "Typically, you'll need your academic transcripts, ID proof, and a statement of purpose. Specific requirements vary by school."
      }
    ]
  },
  {
    category: "Placements",
    icon: <FaLightbulb />,
    questions: [
      {
        q: "How can I see placement statistics?",
        a: "Go to the 'Students' page and use the 'Placed' filter. This shows real-time data of students who have secured jobs through our campus drives."
      },
      {
        q: "Which companies visit the campus?",
        a: "We partner with leading tech firms, consulting groups, and creative agencies. Detailed company lists are available within each school's placement report."
      }
    ]
  },
  {
    category: "Account & Privacy",
    icon: <FaShieldAlt />,
    questions: [
      {
        q: "How do I reset my password?",
        a: "If you've forgotten your password, you can use the 'Forgot Password' link on the login page or contact the system administrator."
      },
      {
        q: "Is my data secure?",
        a: "Absolutely. we use industry-standard encryption and secure authentication protocols to ensure your personal information remains private."
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const filteredFaqs = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <h1>How can we help you?</h1>
        <div className="faq-search-bar">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search for questions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="faq-container">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((cat, catIdx) => (
            <div key={catIdx} className="faq-category-block">
              <div className="category-title">
                {cat.icon}
                <h2>{cat.category}</h2>
              </div>
              <div className="questions-list">
                {cat.questions.map((item, qIdx) => {
                  const uniqueId = `${catIdx}-${qIdx}`;
                  const isOpen = activeQuestion === uniqueId;
                  return (
                    <div 
                      key={qIdx} 
                      className={`faq-card ${isOpen ? 'open' : ''}`}
                      onClick={() => setActiveQuestion(isOpen ? null : uniqueId)}
                    >
                      <div className="faq-card-question">
                        <h3>{item.q}</h3>
                        <FaChevronDown className="chevron" />
                      </div>
                      <div className="faq-card-answer">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="faq-no-results">
            <FaQuestionCircle />
            <p>No matches found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
