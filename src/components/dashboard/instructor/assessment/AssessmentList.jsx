import AssessmentItem from './AssessmentItem';

export default function AssessmentList({ assessments, onToggle }) {
  return (
    <div className="space-y-2">
      {assessments.map(assessment => (
        <AssessmentItem
          key={assessment.id}
          assessment={assessment}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}