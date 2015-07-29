/**
 * DisorderController
 *
 * @description :: Server-side logic for managing disorders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		Disorder.watch(req.socket);
		Disorder.find({}).exec(function findDisorder(err, foundDisorder){
			Disorder.subscribe(req.socket, foundDisorder);
			res.json(foundPosts);
		})
	}
};
