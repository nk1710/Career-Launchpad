'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import withUserAuth from '../../components/withUserAuth';

function SubmitQuery() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Define the Query interface
  interface Query {
    id: string;
    query: string;
    reply: string | null;
    createdAt: string;
  }
  
  const [queries, setQueries] = useState<Query[]>([]);
  const [fetchingReplies, setFetchingReplies] = useState(true);
  const [showFaq, setShowFaq] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const fetchReplies = useCallback(async () => {
    if (!token) return;

    setFetchingReplies(true);
    try {
      const res = await fetch('/api/users/queris-reply', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setQueries(data.data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Error fetching replies:', err);
    } finally {
      setFetchingReplies(false);
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);

    if (!token) {
      alert('User not logged in');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/users/submit-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (res.ok) {
        // Add optimistic update for better UX
        const newQuery = {
          id: Date.now().toString(),
          query,
          reply: null,
          createdAt: new Date().toISOString(),
        };
        setQueries([newQuery, ...queries]);
        setQuery('');
        // Close sidebar on mobile after sending a message
        setSidebarVisible(false);
        // Refresh to get actual data from server
        setTimeout(fetchReplies, 500);
      } else {
        alert(data.message || 'Failed to submit');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // FAQ Data
  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer: "Our support team typically responds within 24 hours on business days. For urgent matters, please indicate this in your message."
    },
    {
      question: "Can I attach files to my queries?",
      answer: "Currently, file attachments are not supported. If you need to share visual information, please describe it in detail or contact our technical team."
    },
    {
      question: "How do I track my previous queries?",
      answer: "All your previous queries and their responses are automatically displayed in the chat history above, with the most recent at the bottom."
    },
    {
      question: "Is my conversation secure?",
      answer: "Yes, all communications are encrypted and protected according to our privacy policy. Your data is never shared with third parties."
    }
  ];

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white py-3 sm:py-5 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            Support Chat
          </h1>
          <div className="flex items-center">
            <div className="flex items-center bg-blue-800 py-1 px-3 rounded-full">
              <div className="h-2 sm:h-3 w-2 sm:w-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium">Online</span>
            </div>
            {/* Mobile Sidebar Toggle Button */}
            <button 
              className="ml-3 p-1 rounded-md lg:hidden text-white hover:bg-blue-800 focus:outline-none"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content with Responsive Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-row p-3 sm:p-6 gap-3 sm:gap-6 relative">
        {/* Left Column - Chat */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 sm:mb-6 px-2 rounded-lg bg-white shadow-sm border border-gray-200">
            {fetchingReplies ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-pulse flex space-x-3">
                  <div className="h-3 sm:h-4 w-3 sm:w-4 bg-blue-600 rounded-full"></div>
                  <div className="h-3 sm:h-4 w-3 sm:w-4 bg-blue-600 rounded-full"></div>
                  <div className="h-3 sm:h-4 w-3 sm:w-4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            ) : queries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8 sm:py-12">
                <svg className="w-16 sm:w-20 h-16 sm:h-20 mb-4 sm:mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <p className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">No conversations yet</p>
                <p className="text-sm sm:text-base">Send a message to get started</p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-6 pb-3 sm:pb-4 px-2">
                {queries.map((q) => {
                  const date = new Date(q.createdAt);
                  const today = new Date();
                  const isToday = date.toDateString() === today.toDateString();
                  const dateLabel = isToday ? 'Today' : formatDate(q.createdAt);
                  
                  return (
                    <div key={q.id} className="space-y-3 sm:space-y-4">
                      {/* Date separator */}
                      <div className="flex justify-center">
                        <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-medium">
                          {dateLabel}
                        </span>
                      </div>
                      
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 sm:px-5 py-2 sm:py-3 max-w-md shadow-md">
                          <p className="text-sm sm:text-base leading-relaxed">{q.query}</p>
                          <div className="text-right mt-1 sm:mt-2">
                            <span className="text-xs text-blue-200 font-medium">{formatTime(q.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Admin reply */}
                      {q.reply ? (
                        <div className="flex">
                          <div className="bg-white rounded-2xl rounded-bl-sm px-4 sm:px-5 py-2 sm:py-3 max-w-md shadow-md border-2 border-gray-100">
                            <p className="text-sm sm:text-base leading-relaxed text-gray-800">{q.reply}</p>
                            <div className="text-right mt-1 sm:mt-2">
                              <span className="text-xs text-gray-500 font-medium">{formatTime(q.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 sm:px-5 py-2 sm:py-3 max-w-md shadow-sm border border-gray-200">
                            <div className="flex items-center text-gray-600">
                              <div className="animate-pulse flex space-x-1 mr-2 sm:mr-3">
                                <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 bg-gray-500 rounded-full"></div>
                                <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 bg-gray-500 rounded-full"></div>
                                <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 bg-gray-500 rounded-full"></div>
                              </div>
                              <p className="italic text-xs sm:text-sm font-medium">Awaiting response...</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 sm:p-5">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-end space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <label htmlFor="message-input" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Your message</label>
                <textarea
                  id="message-input"
                  placeholder="Type your question here..."
                  className="w-full border-2 border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                  rows={3}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className={`bg-blue-600 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 hover:bg-blue-700 transition flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base h-10 sm:h-12`}
              >
                {loading ? (
                  <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="flex items-center">
                    <svg className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    Send
                  </span>
                )}
              </button>
            </form>
            
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 text-center">
              Our support team typically responds within 24 hours
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className={`w-full lg:w-80 flex flex-col space-y-4 sm:space-y-6 fixed lg:relative inset-0 bg-gray-100 lg:bg-transparent p-4 sm:p-0 z-10 transition-transform transform lg:transform-none ${sidebarVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden absolute top-2 right-2 p-2 rounded-full bg-blue-600 text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Support Agent Info */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-5">
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                <svg className="w-8 sm:w-10 h-8 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-800">Support Team</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Available Mon-Fri, 9AM-5PM</p>
              <div className="w-full bg-green-100 text-green-800 rounded-lg p-2 text-center text-xs sm:text-sm font-medium">
                Average response time: 2.5 hours
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-5 flex-1">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="font-bold text-base sm:text-lg text-gray-800">Frequently Asked Questions</h3>
              <button 
                onClick={() => setShowFaq(!showFaq)}
                className="text-blue-600 hover:text-blue-800"
              >
                {showFaq ? (
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                )}
              </button>
            </div>
            
            {showFaq && (
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-3 sm:pb-4 last:border-b-0 last:pb-0">
                    <button 
                      className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-600 text-xs sm:text-sm"
                      onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      <svg className={`w-4 sm:w-5 h-4 sm:h-5 transform ${activeFaq === index ? 'rotate-180' : ''} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {activeFaq === index && (
                      <div className="mt-2 text-justify text-xs sm:text-sm text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-5">
            <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center transition">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span className="text-2xs sm:text-xs font-medium">New Ticket</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center transition">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-2xs sm:text-xs font-medium">Schedule</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center transition">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-2xs sm:text-xs font-medium">Email Us</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center transition">
                <svg className="w-5 sm:w-6 h-5 sm:h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                <span className="text-2xs sm:text-xs font-medium">Help Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button (Fixed) */}
      {!sidebarVisible && (
        <button
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg lg:hidden z-10"
          onClick={toggleSidebar}
          aria-label="Show help"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default withUserAuth(SubmitQuery);