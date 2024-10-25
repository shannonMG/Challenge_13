import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API'; // Fetches the GitHub users
import CandidateCard from '../components/CandidateCard'
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Holds the list of candidates
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current candidate
  const [candidate, setCandidate] = useState<Candidate>();
 
  useEffect(() => {
    const fetchData = async () => {
      
      const data = await searchGithub(); // Fetch GitHub users
      setCandidates(data); // Store the fetched data in the state
      const githubUser = await searchGithubUser(data[currentIndex].login);
      console.log(githubUser)
      setCandidate({name:githubUser.name, username:githubUser.login, location: githubUser.location, avatar_url: githubUser.avatar_url, email: githubUser.email, bio: githubUser.bio, company: githubUser.company })
    };
    fetchData(); // Fetch data when the component mounts
  }, [currentIndex]); // Run only once when the component mounts

  const handleSave = async () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate); // Add current candidate to the saved list
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates)); // Save to localStorage

      // Move to the next candidate
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (nextIndex < candidates.length) {
        const githubUser = await searchGithubUser(candidates[nextIndex].username);
        setCandidate({
          name: githubUser.name,
          username: githubUser.login,
          location: githubUser.location,
          avatar_url: githubUser.avatar_url,
          email: githubUser.email,
          bio: githubUser.bio,
          company: githubUser.company,
        });
      } else {
        setCandidate(undefined); // No more candidates available
      }
    }
  };

  const handleSkip = () => {
    setCurrentIndex(currentIndex + 1); // Move to the next candidate without saving
  };

  if (candidates.length === 0) {
    return <p>Loading candidates...</p>; // Loading message while data is being fetched
  }

  return (
    <div>
      {candidate ? (
        <CandidateCard
          candidate={candidate} // Pass the current candidate to CandidateCard
          onSave={handleSave} // Handle saving the candidate
          onSkip={handleSkip} // Handle skipping the candidate
        />
      ) : (
        <p>No more candidates available.</p> // Message when no more candidates are available
      )}
    </div>
  );
};

export default CandidateSearch;
