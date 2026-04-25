export const authorsMap: Record<string, { name: string; socials?: Record<string, string> }> = {
  "ajay-dhangar": {
    name: "Ajay Dhangar",
    socials: {
      github: "ajay-dhangar",
      linkedin: "ajay-dhangar",
      x: "CodesWithAjay",
    }
  },
  "sanjay-kv": {
    name: "Sanjay Viswanthan",
    socials: {
      github: "sanjay-kv",
      linkedin: "sanjay-k-v",
      x: "sanjay_kv_",
    }
  },
  "hitesh-gahanolia": {
    name: "Hitesh Gahanolia",
    socials: { github: "Hitesh4278" }
  },
  "sowmiya-v": {
    name: "Sowmiya Venkatesan",
    socials: {
      github: "sowmiyeh",
      linkedin: "sowmiyavenkatesan",
      x: "sowmiyeh",
    }
  },
  "abhijith-m-s": {
    name: "Abhijith M S",
    socials: { github: "AMS003010" }
  },
  "khushi-kalra": {
    name: "Khushi Kalra",
    socials: { github: "abckhush" }
  },
  nayanikamukherjee: {
    name: "Nayanika Mukherjee",
    socials: { github: "Nayanika1402" }
  },
  "pujan-sarkar": {
    name: "Pujan Sarkar",
    socials: { github: "Pujan-sarkar" }
  },
  mohitmuktikant: {
    name: "Mohit Muktikant",
    socials: { github: "mohitmuktikant" }
  },
  "santhosh-siddhardha": {
    name: "Lingamuneni Santhosh Siddhardha",
    socials: { github: "Santhosh-Siddhardha" }
  },
  "akshitha-chiluka": {
    name: "Akshitha Chiluka",
    socials: { github: "AKSHITHA-CHILUKA" }
  },
  "Aditya-Singh-Rathore": {
    name: "Aditya Singh Rathore",
    socials: {
      github: "Adez017",
      linkedin: "aditya-singh-rathore0017",
      x: "Adez017",
    }
  },
};

export const getAuthorNames = (authorIds: string[]): string => {
  const firstNames = authorIds
    .map((id) => {
      const author = authorsMap[id];
      const fullName = author ? author.name : id;
      return fullName.split(" ")[0];
    })
    .slice(0, 2);
  return firstNames.length > 1
    ? firstNames.join(" & ")
    : firstNames[0] || "recode hive";
};
