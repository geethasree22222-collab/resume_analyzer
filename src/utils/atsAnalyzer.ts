import { PreFlightScore } from '../types';

const STRONG_ACTION_VERBS = [
  'architected', 'spearheaded', 'orchestrated', 'engineered', 'streamlined',
  'optimized', 'accelerated', 'implemented', 'designed', 'delivered',
  'automated', 'built', 'scaled', 'mentored', 'analyzed', 'pioneered',
  'championed', 'transformed', 'executed', 'formulated', 'directed'
];

const COMMON_TECH_KEYWORDS = [
  'n8n', 'typescript', 'javascript', 'python', 'react', 'node.js',
  'postgresql', 'sql', 'docker', 'kubernetes', 'aws', 'ci/cd',
  'cloud', 'api', 'graphql', 'rest', 'git', 'microservices',
  'workflow', 'automation', 'agile', 'etl', 'tailwind', 'express'
];

export function analyzeResumeText(rawText: string): PreFlightScore {
  const text = rawText || '';
  const words: string[] = text.toLowerCase().match(/\b[a-z0-9_-]+\b/g) || [];
  const wordCount = words.length;

  // 1. Section detection
  const lower = text.toLowerCase();
  const detectedSections = [
    { name: 'Contact & Links', found: /(email|linkedin|github|phone|location|\.com)/i.test(text) },
    { name: 'Summary / Profile', found: /(summary|profile|about|objective)/i.test(lower) },
    { name: 'Experience / History', found: /(experience|employment|work history|career)/i.test(lower) },
    { name: 'Technical / Core Skills', found: /(skills|technologies|expertise|proficiencies)/i.test(lower) },
    { name: 'Education / Credentials', found: /(education|degree|university|college|certifications)/i.test(lower) },
  ];

  const sectionsFoundCount = detectedSections.filter(s => s.found).length;
  const structureScore = Math.min(100, Math.round((sectionsFoundCount / detectedSections.length) * 100));

  // 2. Action verbs detection
  const foundVerbs = STRONG_ACTION_VERBS.filter(verb => words.includes(verb));
  const actionVerbStrength = Math.min(100, Math.round((foundVerbs.length / 8) * 100));

  // 3. Quantified metrics detection (numbers with %, $, or magnitude)
  const metricMatches = text.match(/(\d+[\d,.]*\s*(%|\$|k|m|hours|days|seconds|x|\+|users|events))/gi) || [];
  const quantifiedImpact = Math.min(100, Math.round((metricMatches.length / 5) * 100));

  // 4. ATS format & length
  let atsCompatibility = 70;
  if (wordCount >= 250 && wordCount <= 1200) atsCompatibility += 15;
  if (sectionsFoundCount >= 4) atsCompatibility += 15;
  atsCompatibility = Math.min(100, atsCompatibility);

  // Overall Score Calculation (weighted)
  const overallScore = Math.min(
    99,
    Math.round(
      structureScore * 0.3 +
      actionVerbStrength * 0.25 +
      quantifiedImpact * 0.25 +
      atsCompatibility * 0.2
    )
  );

  // Found keywords
  const detectedKeywords = COMMON_TECH_KEYWORDS.filter(k => lower.includes(k));

  // Strengths
  const keyStrengths: string[] = [];
  if (metricMatches.length >= 3) {
    keyStrengths.push(`${metricMatches.length} quantified impact indicators detected (% / $ metrics)`);
  }
  if (foundVerbs.length >= 4) {
    keyStrengths.push(`Strong active leadership verbs found (${foundVerbs.slice(0, 4).join(', ')})`);
  }
  if (sectionsFoundCount >= 4) {
    keyStrengths.push('Complete standard section structure aligned with top ATS parsers');
  }
  if (wordCount >= 300) {
    keyStrengths.push(`Balanced content density (${wordCount} words) providing sufficient signal`);
  }

  // Recommendations
  const recommendations: string[] = [];
  if (metricMatches.length < 3) {
    recommendations.push('Add more measurable business outcomes (e.g. "reduced latency by 35%", "scaled to 100k users")');
  }
  if (foundVerbs.length < 3) {
    recommendations.push('Replace passive phrasing with punchy executive verbs (e.g., "orchestrated", "engineered")');
  }
  if (sectionsFoundCount < 5) {
    const missing = detectedSections.filter(s => !s.found).map(s => s.name);
    recommendations.push(`Explicitly format missing sections: ${missing.join(', ')}`);
  }
  if (wordCount < 200) {
    recommendations.push('Document length is brief. Expand bullet points under recent experience.');
  }

  return {
    overallScore: Math.max(35, overallScore),
    atsCompatibility,
    actionVerbStrength,
    quantifiedImpact,
    structureScore,
    detectedSections,
    keyStrengths: keyStrengths.length > 0 ? keyStrengths : ['Clean document typography', 'Readable layout'],
    recommendations: recommendations.length > 0 ? recommendations : ['No critical structural issues detected. Ready for automated n8n processing.'],
    detectedKeywords: detectedKeywords.slice(0, 10),
    wordCount,
  };
}
