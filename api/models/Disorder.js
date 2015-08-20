/**
* Disorder.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    name:{
      type:'string',
      unique:true,
      required:true
    },
    description:{
      type:'string',
      unique:true
    },
    criterion:{
      collection:'criteria',
      via:'disorders'
    }
  }
};
