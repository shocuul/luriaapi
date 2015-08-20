/**
* Criteria.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    text:{
      type:'string',
      unique:true,
      required:true
    },
    disorders:{
      collection:'disorder',
      via:'criterion'
    }
  }
};
