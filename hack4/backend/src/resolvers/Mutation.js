import uuidv4 from 'uuid/v4';

const Mutation = {
  insertPeople(parent, { data }, { db }, info) {
    if(!data || !data.length) return false;
    data.forEach( (person) => {
      const found = db.people.findIndex((p => p.ssn === person.ssn));
      if (!found) db.people.push(person);
      else {
        console.log(db.people[found].severity)
        db.people[found] = Object.assign({}, person);
        console.log(db.people[found].severity)
      }
    });
    return true;
  },
};

export { Mutation as default };
