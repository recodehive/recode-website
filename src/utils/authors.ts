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
