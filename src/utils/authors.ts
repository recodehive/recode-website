export const authorsMap = {
  "ajay-dhangar": "Ajay Dhangar",
  "sanjay-kv": "Sanjay Viswanthan",
  "hitesh-gahanolia": "Hitesh Gahanolia",
  "sowmiya-v": "Sowmiya Venkatesan",
  "abhijith-m-s": "Abhijith M S",
  "khushi-kalra": "Khushi Kalra",
  nayanikamukherjee: "Nayanika Mukherjee",
  "pujan-sarkar": "Pujan Sarkar",
  mohitmuktikant: "Mohit Muktikant",
  "santhosh-siddhardha": "Lingamuneni Santhosh Siddhardha",
  "akshitha-chiluka": "Akshitha Chiluka",
  "Aditya-Singh-Rathore": "Aditya Singh Rathore",
};

export interface AuthorProfile {
  id: string;
  name: string;
  title?: string;
  description?: string;
  githubUrl: string;
  imageUrl?: string;
}

const authorProfiles: Record<string, AuthorProfile> = {
  "sanjay-kv": {
    id: "sanjay-kv",
    name: "Sanjay Viswanthan",
    title: "Founder at recode hive",
    description:
      "Software Engineer turned Data Engineer and Program Manager. Google ML Facilitator and former GitHub CE.",
    githubUrl: "https://github.com/sanjay-kv",
    imageUrl: "https://avatars.githubusercontent.com/u/30715153?v=4",
  },
  "sowmiya-v": {
    id: "sowmiya-v",
    name: "Sowmiya Venkatesan",
    title: "Business Strategy & Operations Manager",
    githubUrl: "https://github.com/sowmiyeh",
    imageUrl: "https://avatars.githubusercontent.com/u/74345706?v=4",
  },
  "Aditya-Singh-Rathore": {
    id: "Aditya-Singh-Rathore",
    name: "Aditya Singh Rathore",
    title: "Product Manager at recodehive",
    description:
      "Self learned Fabric certified Data Engineer and an open source contributor.",
    githubUrl: "https://github.com/Adez017",
    imageUrl: "https://avatars.githubusercontent.com/u/142787780?v=4",
  },
  "ajay-dhangar": {
    id: "ajay-dhangar",
    name: "Ajay Dhangar",
    title: "Core Contributor",
    description: "Open source enthusiast and developer advocate.",
    githubUrl: "https://github.com/ajay-dhangar",
    imageUrl: "https://avatars.githubusercontent.com/u/66020296?v=4",
  },
  "hitesh-gahanolia": {
    id: "hitesh-gahanolia",
    name: "Hitesh Gahanolia",
    title: "Community Contributor",
    githubUrl: "https://github.com/hitesh-gahanolia",
    imageUrl: "https://avatars.githubusercontent.com/u/105391016?v=4",
  },
  "abhijith-m-s": {
    id: "abhijith-m-s",
    name: "Abhijith M S",
    title: "Community Contributor",
    githubUrl: "https://github.com/abhijith-m-s",
    imageUrl: "https://avatars.githubusercontent.com/u/70267461?v=4",
  },
  "khushi-kalra": {
    id: "khushi-kalra",
    name: "Khushi Kalra",
    title: "Community Contributor",
    githubUrl: "https://github.com/khushi-kalra",
    imageUrl: "https://avatars.githubusercontent.com/u/120155389?v=4",
  },
  nayanikamukherjee: {
    id: "nayanikamukherjee",
    name: "Nayanika Mukherjee",
    title: "Community Contributor",
    githubUrl: "https://github.com/nayanikamukherjee",
    imageUrl: "https://avatars.githubusercontent.com/u/115003424?v=4",
  },
  "pujan-sarkar": {
    id: "pujan-sarkar",
    name: "Pujan Sarkar",
    title: "Community Contributor",
    githubUrl: "https://github.com/pujan-sarkar",
    imageUrl: "https://avatars.githubusercontent.com/u/89948211?v=4",
  },
  mohitmuktikant: {
    id: "mohitmuktikant",
    name: "Mohit Muktikant",
    title: "Community Contributor",
    githubUrl: "https://github.com/mohitmuktikant",
    imageUrl: "https://avatars.githubusercontent.com/u/134524181?v=4",
  },
  "santhosh-siddhardha": {
    id: "santhosh-siddhardha",
    name: "Lingamuneni Santhosh Siddhardha",
    title: "Community Contributor",
    githubUrl: "https://github.com/santhosh-siddhardha",
    imageUrl: "https://avatars.githubusercontent.com/u/78627236?v=4",
  },
  "akshitha-chiluka": {
    id: "akshitha-chiluka",
    name: "Akshitha Chiluka",
    title: "Community Contributor",
    githubUrl: "https://github.com/akshitha-chiluka",
    imageUrl: "https://avatars.githubusercontent.com/u/124577866?v=4",
  },
};

export const getAuthorProfile = (authorId: string): AuthorProfile => {
  return (
    authorProfiles[authorId] || {
      id: authorId,
      name: authorsMap[authorId] || authorId,
      githubUrl: `https://github.com/${authorId}`,
    }
  );
};

export const getAuthorProfiles = (authorIds: string[]): AuthorProfile[] => {
  return authorIds.map(getAuthorProfile);
};

export const getAuthorTooltip = (authorId: string): string => {
  const profile = getAuthorProfile(authorId);
  const details = [profile.name, profile.title || profile.description, profile.githubUrl]
    .filter(Boolean)
    .join("\n");

  return details;
};

export const getAuthorNames = (authorIds: string[]): string => {
  const firstNames = authorIds
    .map((id) => {
      const fullName = authorsMap[id] || id;
      return fullName.split(" ")[0];
    })
    .slice(0, 2);
  return firstNames.length > 1
    ? firstNames.join(" & ")
    : firstNames[0] || "recode hive";
};
