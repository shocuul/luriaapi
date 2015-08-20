/**
* Criteria.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    uuid: {
    type: 'string',
    primaryKey: true,
    required: true
  },
    text:{
      type:'text',
      unique:true,
      required:true
    },
    disorders:{
      collection:'disorder',
      via:'criterion'
    }
  }
};
