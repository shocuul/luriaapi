/**
 * CriteriaController
 *
 * @description :: Server-side logic for managing criteria
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req, res){
		Criteria.watch(req.socket);

		Criteria.find({}).exec(function findCriteria(err, foundCriteria){
			Criteria.subscribe(req.socket, foundCriteria);
			res.json(foundCriteria);
		});
	}

};
