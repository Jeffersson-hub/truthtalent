'use client';

import React, { useState, useEffect } from 'react';
import HomePage from '@/app/components/HomePage';
import Dashboard from '@/app/components/Dashboard';
import Header from '@/app/components/Header';
import CVUpload from '@/app/components/CVUploader';
import FilterPanel from '@/app/components/FilterPanel';
import CandidateCard from '@/app/components/CandidateCard';
import ActionPanel from '@/app/components/ActionPanel';
import { Candidate, FilterCriteria } from '@/types';
import { generateMockCandidates } from '@/utils/mockData';
import { filterCandidates, calculateMatchScore } from '@/utils/filtering';
import { FileText, Users, TrendingUp } from 'lucide-react';

type CurrentPage = 'home' | 'upload' | 'profiles' | 'dashboard';

export default function Page() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentFilters, setCurrentFilters] = useState<FilterCriteria>({
    position: '',
    skills: [],
    minExperience: 0,
    maxExperience: 20,
    location: '',
    education: ''
  });

  useEffect(() => {
    const filtered = filterCandidates(candidates, currentFilters);
    const filteredWithScores = filtered.map(candidate => ({
      ...candidate,
      score: calculateMatchScore(candidate, currentFilters)
    }));
    filteredWithScores.sort((a, b) => (b.score || 0) - (a.score || 0));
    setFilteredCandidates(filteredWithScores);
  }, [candidates, currentFilters]);

  const handleFilesUploaded = (files: File[]) => {
    const newCandidates = generateMockCandidates(files);
    setCandidates(prev => [...prev, ...newCandidates]);
  };

  const handleFilterChange = (filters: FilterCriteria) => {
    setCurrentFilters(filters);
  };

  const handleStatusChange = (candidateId: string, status: 'selected' | 'rejected') => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === candidateId ? { ...candidate, status } : candidate
      )
    );
  };

  const handleSendNotifications = () => {
    const rejectedCandidates = candidates.filter(c => c.status === 'rejected');
    rejectedCandidates.forEach(candidate => {
      console.log(`Email de refus envoyé à ${candidate.email}`);
    });
    alert(`${rejectedCandidates.length} notification(s) de refus envoyée(s) avec succès !`);
  };

  const selectedCount = candidates.filter(c => c.status === 'selected').length;
  const rejectedCount = candidates.filter(c => c.status === 'rejected').length;
  const pendingCount = candidates.filter(c => c.status === 'pending').length;
  const totalProcessed = selectedCount + rejectedCount;

  const handleNavigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  if (currentPage === 'home') {
    return (
      <HomePage 
        onNavigate={handleNavigate}
        candidateCount={candidates.length}
      />
    );
  }

  if (currentPage === 'dashboard') {
    return (
      <Dashboard 
        candidates={candidates}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={() => setCurrentPage('home')} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {candidates.length === 0 || currentPage === 'upload' ? (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue sur Truthtalent
              </h1>
              <p className="text-lg text-gray-600">
                Téléversez des CV pour commencer le processus de recrutement
              </p>
            </div>
            <CVUpload onFilesUploaded={handleFilesUploaded} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  candidateCount={filteredCandidates.length}
                  candidates={candidates}
                />
                <ActionPanel
                  selectedCount={selectedCount}
                  rejectedCount={rejectedCount}
                  totalProcessed={totalProcessed}
                  onSendNotifications={handleSendNotifications}
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Total</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {candidates.length}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">En attente</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 mt-1">
                    {pendingCount}
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Filtrés</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-600 mt-1">
                    {filteredCandidates.length}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <CVUpload onFilesUploaded={handleFilesUploaded} />
              </div>

              {filteredCandidates.length > 0 ? (
                <div className="space-y-4">
                  {filteredCandidates.map(candidate => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun candidat trouvé
                  </h3>
                  <p className="text-gray-500">
                    Ajustez vos filtres pour voir plus de candidats
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
