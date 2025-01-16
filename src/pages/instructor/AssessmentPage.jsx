import { Trash2 } from 'lucide-react';
import Sidebar from '../../components/dashboard/instructor/Sidebar';
import AssessmentForm from '../../components/dashboard/instructor/assessment/AssessmentForm';
import AssessmentList from '../../components/dashboard/instructor/assessment/AssessmentList';
import { useAssessments } from '../../hooks/useAssessments';

export default function AssessmentPage() {
  const { assessments, addAssessment, toggleAssessment, removeCompleted } = useAssessments();

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Assessments</h1>
          </div>
          
          <div className="max-w-2xl bg-background-secondary p-6 rounded-lg">
            <AssessmentForm onSubmit={addAssessment} />
            <AssessmentList 
              assessments={assessments}
              onToggle={toggleAssessment}
            />

            {assessments.some(assessment => assessment.completed) && (
              <button
                onClick={removeCompleted}
                className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove completed
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}