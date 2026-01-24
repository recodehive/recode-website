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
