const count = (db, severity, locationKeyword) => { 
  const u1 = db.people.filter((person) => {
    return ( person.location.description.toLowerCase().includes(locationKeyword) &&
      person.severity >= severity);
  });
  if(u1) return u1.length;
  return 0;
};

const Query = {
  statsCount(parent, { severity, locationKeywords }, { db }, info) {
    if (!locationKeywords) return null;
    if(!severity) { 
      const serverity = 0;
    }
    const stats = locationKeywords.map((keyword) => {
      return count(db, severity, keyword.toLowerCase());
    });
    return stats;
  },
};

export { Query as default };
