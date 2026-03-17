import React, { useState, useEffect } from "react";
import { getLeads, updateLead, deleteLead } from "../api/leadApi";
import { getPropertyById } from "../api/propertyApi"; // If we want to show property title, but the lead might have it if we populate
import PageNavbar from "../components/PageNavbar";

function UserForms() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await getLeads();
      setLeads(response || []);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateLead(id, { status: newStatus });
      alert("Status updated successfully");
      fetchLeads(); // Refresh list
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteLead(id);
        alert("Inquiry deleted");
        fetchLeads();
      } catch (error) {
        console.error("Failed to delete lead", error);
        alert("Failed to delete inquiry");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700";
      case "contacted": return "bg-yellow-100 text-yellow-700";
      case "visit_done": return "bg-purple-100 text-purple-700";
      case "closed": return "bg-green-100 text-green-700";
      case "not_interested": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageNavbar title="Admin: User Inquiries" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-grow">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary">Property Inquiries</h2>
            <button 
              onClick={fetchLeads}
              className="text-cta hover:text-blue-800 text-sm font-semibold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Property ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-text-secondary">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-text-primary">{lead.name}</div>
                        <div className="text-sm text-text-secondary">{lead.phone}</div>
                        <div className="text-[10px] text-gray-400 mt-1">{new Date(lead.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded">
                          {lead.property_id || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-accent">₹{lead.budget?.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-secondary line-clamp-2 max-w-xs" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead._id}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-cta outline-none ${getStatusColor(lead.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="visit_done">Visit Done</option>
                          <option value="closed">Closed</option>
                          <option value="not_interested">Not Interested</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleDelete(lead._id)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForms;
