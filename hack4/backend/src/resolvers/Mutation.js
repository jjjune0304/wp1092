import uuidv4 from 'uuid/v4';

const Mutation = {
  async insertPeople(parent, { data }, { db }, info) {
    console.log('Data', data)
    if(!data || !data.length) return false;
    data.forEach( (person) => {
      const found = db.people.findIndex((p => p.ssn === person.ssn));
      if (found && found === -1) db.people.push(person);
      else {
        console.log(db.people[found].severity)
        db.people[found] = Object.assign({}, person);
        console.log(db.people[found].severity)
      }
    });
    console.log(db.people)
    return true;
  },
};

export { Mutation as default };
