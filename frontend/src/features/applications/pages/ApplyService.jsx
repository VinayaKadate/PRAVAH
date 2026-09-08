import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { SectionHead } from '../../../components/common/SectionHead';
import { InlineDocumentUpload } from '../components/InlineDocumentUpload';
import { Btn } from '../../../components/common/Btn';
import { C, inputCls, inputStyle } from '../../../constants/theme';

export function ApplyService() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const [appName, setAppName] = useState('');

  if (!currentUser) {
    return (
      <div className="px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="mb-6">You must be logged in to apply for a service.</p>
        <Btn onClick={() => navigate('/login')}>Login Now</Btn>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidated) {
      alert("Application Submitted Successfully!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="px-4 py-12" style={{ background: C.bg, minHeight: '80vh' }}>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <SectionHead
          eyebrow="New Application"
          title="Apply for Factory Licence"
          sub="Complete the form below and upload your verified documents."
        />
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Applicant Name</label>
            <input 
              type="text" 
              className={inputCls} 
              style={inputStyle} 
              value={appName}
              onChange={e => setAppName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Incorporation Certificate (Required)</label>
            <InlineDocumentUpload onValidationComplete={(isValid) => setIsValidated(isValid)} />
          </div>

          <div className="pt-6 border-t">
            <Btn className="w-full" disabled={!isValidated}>
              {isValidated ? "Submit Application" : "Upload Document to Unlock Submit"}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
