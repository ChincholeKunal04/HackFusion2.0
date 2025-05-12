import React, { useEffect, useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPendingApplication, fetchSpecificApplication, reviewApplication } from '../../store/admin/applications';

const AdminApplications = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    
    const dispatch = useDispatch();
    
    const {user} = useSelector((state) => state.auth)
    
    const applications = useSelector((state) => state.applications?.applicationList) || [];

    useEffect(() => {
      dispatch(fetchAllPendingApplication())
    },[dispatch]);

    const applicationDetails = useSelector((state) => state.applications.applicationDetails);
    
    useEffect(() => {
      if (applicationDetails && applicationDetails._id) {
        setSelectedApplication(applicationDetails);
      }
    }, [applicationDetails]);

    const handleViewDetails = async (id) => {
      dispatch(fetchSpecificApplication(id));
      setSelectedApplication(applicationDetails);
      setExpandedId(id);
    };

    const toggleExpand = (id) => {
      setExpandedId(expandedId === id ? null : id);
    };

    const [moderationInputs, setModerationInputs] = useState({});
    
    const handleModerationClick = (id, type) => {
        setModerationInputs((prev) => ({
            ...prev,
            [id]: { type, remark: "" },
        }));
    };
    
    const handleModerationSubmit = (id) => {
        const input = moderationInputs[id];
        if (!input || !input.remark.trim()) return;
      
        dispatch(reviewApplication({
            id,
            status: input.type === "approve" ? "Approved" : "Rejected",
            remark: input.remark,
            adminId : user?._id
        }));
      
        setModerationInputs((prev) => ({ ...prev, [id]: null }));
    };
    

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Applications</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {applications.map((application) => (
                            <React.Fragment key={application._id}>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{application.applicant.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{application.applicant.role}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{application.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${application.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                                              application.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                              'bg-yellow-100 text-yellow-800'}`}>
                                            {application.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                                        <button
                                           onClick={() => {
                                            if (expandedId === application._id) {
                                              toggleExpand(null); 
                                            } else {
                                              handleViewDetails(application._id); 
                                              toggleExpand(application._id);      
                                            }
                                          }}
                                          className="text-blue-600 hover:text-blue-900"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {application.status === 'Pending' && (
                                            <>
                                                <button
                                                  onClick={() => handleModerationClick(application._id, 'approve')}
                                                  className="text-green-600 hover:text-green-900"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                  onClick={() => handleModerationClick(application._id, 'reject')}
                                                  className="text-red-600 hover:text-red-900"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
              
                                {expandedId === application._id && selectedApplication && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                                            <div className="text-sm text-gray-700">
                                                <strong>Description:</strong>
                                                <p className="mt-1">{selectedApplication.description}</p>
                                                <div className="mt-2">
                                                    <strong>Attachments:</strong>
                                                    <div className="flex flex-wrap mt-1 gap-2">
                                                        {selectedApplication.attachments?.length > 0 ? (
                                                            selectedApplication.attachments.map((img, index) => (
                                                                <img key={index} src={img} alt={`attachment-${index}`} className="w-24 h-24 object-cover rounded" />
                                                            ))
                                                        ) : (
                                                              <p className="text-gray-500">No attachments</p>
                                                        )}
                                                    </div>
                                                </div>
                      
                                                {moderationInputs[application._id] && (
                                                    <div className="mt-4">
                                                        <textarea
                                                            value={moderationInputs[application._id].remark}
                                                            onChange={(e) =>
                                                                setModerationInputs((prev) => ({
                                                                    ...prev,
                                                                    [application._id]: {
                                                                      ...prev[application._id],
                                                                      remark: e.target.value,
                                                                    },
                                                                }))
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                                            placeholder={`Enter remarks to ${moderationInputs[application._id].type}...`}
                                                        />
                                                        <button
                                                            onClick={() => handleModerationSubmit(application._id)}
                                                            className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                )}

                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminApplications;
