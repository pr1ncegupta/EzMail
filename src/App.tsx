import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, AtSign, Volume2, AlignJustify } from 'lucide-react';

interface EmailFormData {
  recipient: string;
  subject: string;
  message: string;
  signature: string;
  tone: string;
  length: string;
}

function App() {
  const [formData, setFormData] = useState<EmailFormData>({
    recipient: '',
    subject: '',
    message: '',
    signature: '',
    tone: 'Professional',
    length: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [apiResponse, setApiResponse] = useState('');

  const toneOptions = ['Professional', 'Friendly', 'Formal', 'Casual', 'Urgent'];
  const lengthOptions = ['Short', 'Medium', 'Long', 'Detailed'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Construct the message prompt
      const prompt = `Create a ${formData.tone.toLowerCase()} ${formData.length.toLowerCase()} email to ${formData.recipient} about ${formData.subject}. Sign it as ${formData.signature}.`;
      
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          user_id: import.meta.env.VITE_USER_ID,
          agent_id: import.meta.env.VITE_AGENT_ID,
          session_id: import.meta.env.VITE_SESSION_ID,
          message: prompt
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Make sure we're accessing the correct property from the response
        setApiResponse(data.response || data.message || "Email created successfully!");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      } else {
        // Handle non-ok responses
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', errorData);
        setApiResponse(`Error: ${errorData.error || response.statusText}`);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setApiResponse("Failed to send email. Please try again.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">EzMail</h1>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">Create professional emails with AI assistance. Simply fill in the details and let our AI craft the perfect email for you.</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-indigo-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                  <input
                    type="email"
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="recipient@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What is this email about?"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tone
                </label>
                <div className="relative">
                  <Volume2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    required
                  >
                    {toneOptions.map((tone) => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Length
                </label>
                <div className="relative">
                  <AlignJustify className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                  <select
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                    className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    required
                  >
                    {lengthOptions.map((length) => (
                      <option key={length} value={length}>{length}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message Content
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                placeholder="Provide details about what you want to say in this email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
                <input
                  type="text"
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name or title"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
                loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors duration-200 shadow-lg`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Email...
                </div>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Email
                </>
              )}
            </button>
          </form>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Send className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Drafting</h3>
            <p className="text-gray-600">Create professional emails in seconds with our AI assistant.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Volume2 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customizable Tone</h3>
            <p className="text-gray-600">Choose the perfect tone for your message, from formal to friendly.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Touch</h3>
            <p className="text-gray-600">Add your signature and personal style to every email you send.</p>
          </div>
        </div>

        {/* API Response Popup */}
        {showPopup && (
          <div className="fixed bottom-8 right-8 bg-indigo-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center max-w-md animated fadeIn">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Success!</p>
              <p className="text-sm text-indigo-100">{apiResponse}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;