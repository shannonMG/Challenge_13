import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
    candidate: Candidate;
    onSave: () => void;
    onSkip: () => void;
}

