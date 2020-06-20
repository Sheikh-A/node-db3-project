const db = require('../data/db-config.js');

function find() {
    return db('schemes');
}

function findAllSteps() {
    return db('steps');
}


function findById(id) {
    return db('schemes').where({ id });
}

//----------------------------------------------------------------------------//
// findByIdAlt()
//
// An alternative way to find by id ... instead of returning an array of
// results, when we are looking for only one object, we can call .first() to
// return the "first" (probably the only) item in the resulting array.
//----------------------------------------------------------------------------//
// the .first() method provides a simple way to detect empty results. .where()
// returns an array, but it could be an empty array. Using .first() returns the
// first object in the array, and if the array is empty, the first object is
// "null", which can be an easy test for "not the data I was looking for".
//
// you could also test the length of the array, and there are other methods to
// determine that the query didn't return the right stuff.

function findByIdAlt(id) {
    return db('schemes')
     .where({ id })
     .first();
}


//----------------------------------------------------------------------------//
// findPosts()
//
// method to return posts for a single user
//----------------------------------------------------------------------------//
// Good example of using joins in knex. Take some time to look at the variety of
// parameter syntax options you have for the .join() method on the knexjs.org
// website.
function findSteps(id) {
    return db('steps as s')
      .join('schemes as u', 'u.id', 's.scheme_id')
      .select('s.id', 'u.scheme_name','s.instructions')
      .where({scheme_id:id });
}

function altFindSteps(id) {
    return db
      .select(
          'steps.id', //expects scheme id
          'schemes.scheme_name', //this array should inc name not id
          'steps.step_number',
          'steps.instructions'
      )
      .from('steps')
      .join('schemes', 'steps.scheme_id', 'schemes_id')
      .where('steps.scheme_id', id)
      .orderBy('steps.step_number');
}


function add(schemeData) {
    return db('schemes').insert(schemeData);
}

function addStep(step, scheme_id) {
    step.scheme_id = scheme_id;
    return db("steps").insert(step);
}

function update(changes, id) {
    return db("schemes")
      .where({ id })
      .update(changes);
}

function remove(id) {
    return db('schemes').where({id}).del();
}

module.exports = {
    find,
    findById,
    findByIdAlt,
    findSteps,
    add,
    addStep,
    findSteps,
    update,
    remove,
    findAllSteps,
    altFindSteps
}