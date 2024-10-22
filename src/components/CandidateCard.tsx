import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
    candidate: Candidate;
    onSave: () => void;
    onSkip: () => void;
}

const CandidateCard = ({ candidate, onSave, onSkip }: CandidateCardProps) => {
    return (
      <div className="candidate-card">
        {/* Avatar */}
        <img src={candidate.avatar} alt={`${candidate.name}'s avatar`} className="avatar" />
  
        {/* Candidate Information */}
        <h2>{candidate.name || candidate.username}</h2> {/* Use name if available, otherwise display username */}
        <p>Username: {candidate.username}</p>
        {candidate.location && <p>Location: {candidate.location}</p>}
        {candidate.company && <p>Company: {candidate.company}</p>}
        {candidate.email && <p>Email: {candidate.email}</p>}
  
        {/* Link to GitHub Profile */}
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
          View GitHub Profile
        </a>
  
        {/* Action Buttons */}
        <div className="actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onSkip}>Skip</button>
        </div>
      </div>
    );
  };
  
  export default CandidateCard;
