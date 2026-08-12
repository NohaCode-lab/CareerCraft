import { describe, it, expect } from 'vitest';
import { analyzeResume, calculateCosineSimilarity } from '../atsService';

describe('atsService', () => {
  const sampleCv = {
    summary:
      'Experienced Senior Full Stack Developer with over 8 years of expertise building scalable web applications using React, Node.js, and Cloud services.',
    skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    experience: [
      {
        title: 'Senior Frontend Engineer',
        company: 'Tech Corp',
        description: 'Led a team of 5 engineers to deliver high performance React applications.',
      },
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'State University',
      },
    ],
  };

  it('calculates ATS score correctly for complete resume', () => {
    const result = analyzeResume(sampleCv);
    expect(result.score).toBeGreaterThan(80);
    expect(result.completedSections).toContain('summary');
    expect(result.completedSections).toContain('skills');
    expect(result.completedSections).toContain('experience');
    expect(result.completedSections).toContain('education');
  });

  it('identifies missing sections and provides improvement suggestions', () => {
    const incompleteCv = { summary: 'Short bio' };
    const result = analyzeResume(incompleteCv);
    expect(result.score).toBeLessThan(50);
    expect(result.missingSections).toContain('experience');
    expect(result.missingSections).toContain('education');
    expect(result.missingSections).toContain('skills');
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  it('calculates TF-IDF Cosine Similarity between CV and job description', () => {
    const jobDescription =
      'Looking for a Senior React Developer proficient in JavaScript, Node.js, and modern CSS frameworks.';
    const similarity = calculateCosineSimilarity(
      sampleCv.summary + ' ' + sampleCv.skills.join(' '),
      jobDescription
    );
    expect(similarity).toBeGreaterThan(0.3);
  });
});
